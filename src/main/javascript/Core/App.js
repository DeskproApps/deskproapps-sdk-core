import * as AppEvents from './AppEvents';

import { createContext } from '../Context';
import { create as createUI } from '../UI';
import { createStorageAPIClient } from '../Storage';
import { createDeskproApiClient } from '../WebAPI';
import { createDeskproWindowFacade } from '../DeskproWindow';
import { createOauthAPIClient } from '../Security';

import * as Event from './Event'

/**
 * Implementation of a Deskpro Application, a thin client exposing all the underlying services need by an application
 *
 *
 * @class
 */
class App
{
  /**
   * @param {function} registerEventHandlers
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {AppEventEmitter} incomingDispatcher
   * @param {AppEventEmitter} internalDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   */
  constructor({ registerEventHandlers, outgoingDispatcher, incomingDispatcher, internalDispatcher, instanceProps, contextProps })
  {
    const context = createContext(outgoingDispatcher,incomingDispatcher, instanceProps, contextProps);
    this.props = {
      registerEventHandlers,
      outgoingDispatcher,
      incomingDispatcher,
      internalDispatcher,
      instanceProps,
      contextProps,
      restApi: createDeskproApiClient(outgoingDispatcher),
      storageApi: createStorageAPIClient(outgoingDispatcher, internalDispatcher, instanceProps, contextProps),
      deskproWindow: createDeskproWindowFacade(outgoingDispatcher),
      context,
      ui: createUI(internalDispatcher),
      oauth: createOauthAPIClient(outgoingDispatcher, internalDispatcher, instanceProps, contextProps)
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
   * @return {AppEventEmitter}
   */
  get eventDispatcher() { return this.props.internalDispatcher; }

  /**
   * @param {string} eventName
   * @param {function}  handler
   */
  subscribe(eventName, handler)
  {
    const { outgoingDispatcher, registerEventHandlers } = this.props;

    outgoingDispatcher.emitAsync('app.subscribe_to_event', { events: [eventName] })
      .then(events => {
        for (const event of events) {
          const eventProps = {channelType: Event.CHANNEL_INCOMING, invocationType: event.invocationType};
          registerEventHandlers(this, event.name, eventProps);
          this.props.incomingDispatcher.on(event.name, handler)
        }
      })
    ;
  }

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
    // TODO need to check if eventName is an internal one, for now just assume everything is
    this.eventDispatcher.removeListener(eventName, listener);
  };

  /**
   * @public
   * @method
   * @param {String} eventName
   * @param {function} listener
   */
  once = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everything is
    this.eventDispatcher.once(eventName, listener);
  };

  /**
   * @public
   * @method
   * @param {string|{}} event
   * @param args
   * @return {Promise.<*>}
   */
  async emit (event, ...args)
  {
    // invocation
    if (Event.isInvocation(event) && args.length > 0) {
      const { outgoingDispatcher } = this.props;
      return outgoingDispatcher.emitInvokeAsync({ ...event, data: args[0] });
    }

    // internal event
    const { internalDispatcher } = this.props;
    const dispatcherArgs = [event].concat(args);
    internalDispatcher.emit.apply(internalDispatcher, dispatcherArgs);
    return Promise.resolve((args));
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

  resetAppTitle = () => { this.appTitle = this.props.instanceProps.appTitle; };

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
   * @deprecated
   * 
   * @public
   * @return {StorageApiFacade}
   */
  get state() { return this.props.storageApi; };

  /**
   * @public
   * @return {StorageApiFacade}
   */
  get storage() { return this.props.storageApi; };

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
