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
   * @async
   * @param {String} name
   * @param {Object} defaultIfUnset
   * @return {Promise}
   */
  asyncGetShared = (name, defaultIfUnset) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, scope: StateBuilder.buildSharedScope(this.props) };
    return this.props.eventDispatcher
      .emitAsync(StateEvents.EVENT_STATE_GET, state, defaultIfUnset)
      .then(state => state ? state : defaultIfUnset)
    ;
  };

  /**
   * @async
   * @param {String} name
   * @param {Object} defaultIfUnset
   * @return {Promise}
   */
  asyncGetPrivate = (name, defaultIfUnset) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, scope: StateBuilder.buildPrivateScope(this.props) };
    return this.props.eventDispatcher
      .emitAsync(StateEvents.EVENT_STATE_GET, state, defaultIfUnset)
      .then(state => state ? state : defaultIfUnset)
    ;
  };

  /**
   * @async
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSetShared = (name, value) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, value: JSON.stringify(value), scope: StateBuilder.buildSharedScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_SET, state);
  };

  /**
   * @async
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSetPrivate = (name, value) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, value: JSON.stringify(value), scope: StateBuilder.buildPrivateScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_SET, state);
  };

  /**
   * @async
   * @param {String} name
   * @return {Promise}
   */
  asyncDeleteShared = (name) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, scope: StateBuilder.buildSharedScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_DELETE, state);
  };

  /**
   * @async
   * @param {String} name
   * @return {Promise}
   */
  asyncDeletePrivate = (name) => {
    if (!name) { throw new Error('name argument is required'); }

    const state = { name, scope: StateBuilder.buildPrivateScope(this.props) };
    return this.props.eventDispatcher.emitAsync(StateEvents.EVENT_STATE_DELETE, state);
  };

  /**
   * @async
   * @param {String} name
   * @return {Promise}
   */
  asyncHasShared = (name) => {
    if (!name) { throw new Error('name argument is required'); }

    const defaultIfUnset = {};
    return this.props.asyncGetShared(name, defaultIfUnset).then(foundState => foundState !== defaultIfUnset);
  };

  /**
   * @async
   * @param {String} name
   * @return {Promise}
   */
  asyncHasPrivate = (name) => {
    if (!name) { throw new Error('name argument is required'); }

    const defaultIfUnset = {};
    return this.props.asyncGetPrivate(name, defaultIfUnset).then(foundState => foundState !== defaultIfUnset);
  };

}