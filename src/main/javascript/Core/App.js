import * as AppEvents from './AppEvents';
import {SecurityEvents} from '../Security';

import { createContext } from '../Context';
import { create as createUI } from '../UI';
import { createStateAPIClient } from '../State';
import { createDeskproApiClient } from '../WebAPI';
import { createDeskproWindowFacade } from '../DeskproWindow';
import { createOauthAPIClient } from '../Security';

/**
 * @class
 */
class App
{
  /**
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} incomingDispatcher
   * @param {EventDispatcher} internalDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   * @param {WindowProxy} windowProxy
   */
  constructor({ outgoingDispatcher, incomingDispatcher, internalDispatcher, instanceProps, contextProps, windowProxy })
  {
    const context = createContext(outgoingDispatcher,incomingDispatcher, contextProps);
    this.props = {
      outgoingDispatcher,
      incomingDispatcher,
      internalDispatcher,
      instanceProps,
      contextProps,
      restApi: createDeskproApiClient(outgoingDispatcher),
      stateApi: createStateAPIClient(outgoingDispatcher, instanceProps, contextProps),
      deskproWindow: createDeskproWindowFacade(outgoingDispatcher),
      context,
      ui: createUI(internalDispatcher, outgoingDispatcher, windowProxy),
      oauth: createOauthAPIClient(outgoingDispatcher, instanceProps, contextProps)
    };

    this._state = {
      isResizing: false,
      appTitle: instanceProps.appTitle,
      badgeCount: 0
    };
  }

  // EVENT EMITTER API

  /**
   * @public
   * @return {EventDispatcher}
   */
  get eventDispatcher() { return this.props.internalDispatcher; }

  /**
   * @public
   * @param {String} eventName
   * @param {function} listener
   */
  on = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.on(eventName, listener);
  };

  /**
   * @public
   * @method
   * @param {String} eventName
   * @param {function} listener
   */
  off = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.removeListener(eventName, listener);
  };

  /**
   * @public
   * @method
   * @param {String} eventName
   * @param {function} listener
   */
  once = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.once(eventName, listener);
  };

  /**
   * @public
   * @method
   * @param eventName
   * @param args
   */
  emit = (eventName, ...args) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    const { internalDispatcher: eventDispatcher } = this.props;
    const dispatcherArgs = [eventName].concat(args);
    eventDispatcher.emit.apply(eventDispatcher, dispatcherArgs);
  };

  // Properties API

  /**
   * @public
   * @method
   * @param {String} propertyName
   * @return {String|null|undefined}
   */
  getProperty = (propertyName) => {
    const { instanceProps, contextProps } = this.props;
    let value = instanceProps.getProperty(propertyName);

    if (value === undefined) {
      value = contextProps.getProperty(propertyName);
    }

    return value;
  };

  /**
   * @public
   * @return {Object}
   */
  get properties() {
    const { instanceProps, contextProps } = this.props;

    const instanceProperties = instanceProps.toJS();
    const contextProperties = contextProps.toJS();

    return { ...instanceProperties, ...contextProperties };
  }

  /**
   * @public
   * @return {'production'|'development'}
   */
  get environment () {
    const defaultEnvironment = 'production';

    const { contextProps } = this.props;
    const env = contextProps.getProperty('appsEnvironment');
    return env || defaultEnvironment;
  }

  /**
   * @public
   * @return {String}
   */
  get appId() { return this.props.instanceProps.appId; }

  /**
   * @public
   * @return {String}
   */
  get appTitle() { return this._state.appTitle; }

  /**
   * @public
   * @param {String} newTitle
   */
  set appTitle(newTitle) {
    const oldTitle = this._state.appTitle;

    if (newTitle !== oldTitle) {
      this._state.appTitle = newTitle;

      const { eventDispatcher } = this.props;
      eventDispatcher.emit(AppEvents.EVENT_TITLE_CHANGED, newTitle, oldTitle);
    }
  }

  resetAppTitle = () => { this._state.appTitle = this.props.instanceProps.appTitle; };

  /**
   * public
   * @return {String}
   */
  get packageName() { return this.props.instanceProps.appPackageName; }

  /**
   * public
   * @return {String}
   */
  get instanceId() { return this.props.instanceProps.instanceId; }

  // OAUTH API

  /**
   * @public
   * @return {OauthFacade}
   */
  get oauth() { return this.props.oauth; }

  // Settings API

  /**
   * @public
   * @return {Array}
   */
  get settings() { return []; }

  // Misc API

  /**
   * @public
   * @method
   */
  refresh = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_REFRESH);
  };

  /**
   * @public
   * @method
   */
  unload = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_UNLOAD);
  };

  // CLIENTS

  /**
   * @public
   * @return {UIFacade}
   */
  get ui() { return this.props.ui; }

  /**
   * @public
   * @return {DeskproWindowFacade}
   */
  get deskproWindow() {
    return this.props.deskproWindow;
  };

  /**
   * @public
   * @return {DeskproAPIClient}
   */
  get restApi() { return this.props.restApi; };

  /**
   * @public
   * @return {StateApiFacade}
   */
  get state() { return this.props.stateApi; };

  /**
   * @public
   * @return {Context}
   */
  get context() { return this.props.context; };

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default App;
