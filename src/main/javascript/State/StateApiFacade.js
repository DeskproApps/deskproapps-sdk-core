import * as StateEvents from './StateEvents';
import * as StateBuilder from './StateBuilder';

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {StateApiFacade}
 */
export const createAppStateFacade = (eventDispatcher) => new StateApiFacade(eventDispatcher, 'app');

/**
 * @param {EventDispatcher} eventDispatcher
 * @param {Context} context
 * @return {StateApiFacade}
 */
export const createContextStateFacade = (eventDispatcher, context) => {
  const scopeTarget = StateBuilder.buildScopeTargetForContext(context);
  return new StateApiFacade(eventDispatcher, scopeTarget);
};

export class StateApiFacade
{
  constructor(eventDispatcher, scopeTarget) {
    this.props = { eventDispatcher, scopeTarget };
  }

  /**
   * @param {String} name
   * @param {Object} defaultIfUnset
   * @return {Promise}
   */
  asyncGetShared = (name, defaultIfUnset) => {
    const state = { name, scope: StateBuilder.buildSharedScope(this.props) };

    return this.props.eventDispatcher
      .emitAsync(StateEvents.EVENT_STATE_GET, state, defaultIfUnset)
      .then(state => state ? state : defaultIfUnset)
    ;
  };

  /**
   * @param {String} name
   * @param {Object} defaultIfUnset
   * @return {Promise}
   */
  asyncGetPrivate = (name, defaultIfUnset) => {
    const state = { name, scope: StateBuilder.buildPrivateScope(this.props) };
    return this.props.eventDispatcher
      .emitAsync(StateEvents.EVENT_STATE_GET, state, defaultIfUnset)
      .then(state => state ? state : defaultIfUnset)
    ;
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSetShared = (name, value) => {
    const state = { name, value: JSON.stringify(value), scope: StateBuilder.buildSharedScope(this.props) };

    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_SET, state);
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSetPrivate = (name, value) => {
    const { scopeTarget } = this.props;
    const state = { name, value: JSON.stringify(value), scope: StateBuilder.buildPrivateScope(this.props) };

    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_SET, state);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncDeleteShared = (name) => {
    const state = { name, scope: StateBuilder.buildSharedScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_DELETE, state);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncDeletePrivate = (name) => {
    const { scopeTarget } = this.props;
    const state = { name, scope: StateBuilder.buildPrivateScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_DELETE, state);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncHasShared = (name) => {
    const defaultIfUnset = {};
    return this.props.asyncGetShared(name, defaultIfUnset).then(foundState => foundState !== defaultIfUnset);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncHasPrivate = (name) => {
    const defaultIfUnset = {};
    return this.props.asyncGetPrivate(name, defaultIfUnset).then(foundState => foundState !== defaultIfUnset);
  };

}