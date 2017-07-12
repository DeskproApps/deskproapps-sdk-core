import * as AppEvents from './AppEvents';

import { createContext } from '../Context';
import { create as createUI } from '../UI';
import { createAppStateClient, createContextStateClient, StateApiFacade } from '../State';
import { createDeskproApiClient } from '../WebAPI';
import { createDeskproWindowFacade } from '../DeskproWindow';

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
      appState: createAppStateClient(outgoingDispatcher),
      tabState: createContextStateClient(outgoingDispatcher, context),
      deskproWindow: createDeskproWindowFacade(outgoingDispatcher),
      context,
      ui: createUI(internalDispatcher, outgoingDispatcher, windowProxy)
    };

    this.state = {
      isResizing: false,
      appTitle: instanceProps.appTitle,
      badgeCount: 0
    };
  }

  // EVENT EMITTER API

  /**
   * @return {EventDispatcher}
   */
  get eventDispatcher() { return this.props.internalDispatcher; }

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  on = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.on(eventName, listener);
  };

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  off = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.removeListener(eventName, listener);
  };

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  once = (eventName, listener) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    this.eventDispatcher.once(eventName, listener);
  };

  emit = (eventName, ...args) => {
    // TODO need to check if eventName is an internal one, for now just assume everyything is
    const { internalDispatcher: eventDispatcher } = this.props;
    const dispatcherArgs = [eventName].concat(args);
    eventDispatcher.emit.apply(eventDispatcher, dispatcherArgs);
  };

  // Properties API

  /**
   * @param propertyName
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
   * @return {Object}
   */
  get properties() {
    const { instanceProps, contextProps } = this.props;

    const instanceProperties = instanceProps.toJS();
    const contextProperties = contextProps.toJS();

    return { ...instanceProperties, ...contextProperties };
  }

  /**
   * @return {String}
   */
  get appId() { return this.props.instanceProps.appId; }

  /**
   * @return {String}
   */
  get appTitle() { return this.state.appTitle; }

  /**
   * @param {String} newTitle
   */
  set appTitle(newTitle) {
    const oldTitle = this.state.appTitle;

    if (newTitle !== oldTitle) {
      this.state.appTitle = newTitle;

      const { eventDispatcher } = this.props;
      eventDispatcher.emit(AppEvents.EVENT_TITLE_CHANGED, newTitle, oldTitle);
    }
  }

  resetAppTitle = () => { this.state.appTitle = this.props.instanceProps.appTitle; };

  /**
   * @return {String}
   */
  get packageName() { return this.props.instanceProps.appPackageName; }

  /**
   * @return {String}
   */
  get instanceId() { return this.props.instanceProps.instanceId; }

  // Settings API

  /**
   * @return {Array}
   */
  get settings() { return []; }

  refresh = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_REFRESH);
  };

  unload = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_UNLOAD);
  };

  // CLIENTS

  /**
   * @return {UIFacade}
   */
  get ui() { return this.props.ui; }

  /**
   * @return {DeskproWindowFacade}
   */
  get deskproWindow() {
    return this.props.deskproWindow;
  };

  /**
   * @return {DeskproAPIClient}
   */
  get restApi() { return this.props.restApi; };

  /**
   * @return {StateApiFacade}
   */
  get appState() { return this.props.appState; };

  /**
   * @return {StateApiFacade}
   */
  get tabState() { return this.props.tabState; };

  /**
   * @return {Context}
   */
  get context() { return this.props.context; };

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default App;
