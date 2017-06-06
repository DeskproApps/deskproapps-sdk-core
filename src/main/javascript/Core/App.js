import * as AppEvents from './AppEvents';
import Event from './Event';

import { createContext } from '../Context';
import { create as createUI } from '../UI';
import { createAppStateClient, createContextStateClient, StateApiFacade } from '../State';
import { createDeskproApiClient } from '../WebAPI';

const emitIfNotCanceled = (eventDispatcher, eventName, beforeEventName) =>
{
  const event = new Event({ name: eventName });
  eventDispatcher.emit(beforeEventName, event);

  if (event.enabled) {
    eventDispatcher.emit(eventName);
  }

  return event.enabled;
};

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
      context,
      ui: createUI(internalDispatcher),
      windowProxy,
      visibility: 'expanded', // hidden, collapsed, expanded
    };

    this.stateProps = {
      isResizing: false,
      appTitle: instanceProps.appTitle,
      badgeCount: 0
    };
  }

  // UI API

  /**
   * @return {UI}
   */
  get ui() { return this.props.ui; }

  // EVENT EMITTER API

  /**
   * @return {EventEmitter}
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

  // APPLICATION API

  get appId() { return this.props.instanceProps.appId; }

  get appTitle() { return this.props.instanceProps.appTitle; }

  set appTitle(newTitle) {
    const oldTitle = this.stateProps.appTitle;

    if (newTitle !== oldTitle) {
      this.stateProps.appTitle = newTitle;

      const { eventDispatcher } = this.props;
      eventDispatcher.emit(AppEvents.EVENT_TITLE_CHANGED, newTitle, oldTitle);
    }
  }

  resetTitle = () => {
    this.appTitle = this.props.instanceProps.appTitle;
  };

  get settings() { return []; }

  get packageName() { return this.props.instanceProps.appPackageName; }

  get instanceId() { return this.props.instanceProps.instanceId; }

  get badgeCount() { return this.stateProps.badgeCount; }

  set badgeCount(newCount) {
    const oldCount = this.stateProps.badgeCount;
    this.stateProps.badgeCount = newCount;

    const { internalDispatcher:eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_BADGECOUNT_CHANGED, newCount, oldCount);
  }

  /**
   * @return {string}
   */
  get visibility() { return this.props.visibility };

  /**
   * @return {boolean}
   */
  get isVisible() {
    return this.props.visibility !== 'hidden';
  }

  /**
   * @return {boolean}
   */
  get isHidden() {
    return this.props.visibility === 'hidden';
  }

  /**
   * @return {boolean}
   */
  get isExpanded() {
    return this.props.visibility ===  'expanded';
  }

  /**
   * @return {boolean}
   */
  get isCollapsed() {
    return this.props.visibility ===  'collapsed';
  }

  show = () => {
    const { internalDispatcher: eventDispatcher, visibility } = this.props;

    if (visibility === 'hidden') {
      const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_SHOW, AppEvents.EVENT_BEFORE_SHOW);
      if (emitResult) {
        this.props.visibility = 'expanded'
      }
    }
  };

  hide = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_HIDE, AppEvents.EVENT_BEFORE_HIDE);
    if (emitResult) {
      this.props.visibility = 'hidden';
    }
  };

  collapse = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_COLLAPSE, AppEvents.EVENT_BEFORE_COLLAPSE);
    if (emitResult) {
      this.props.visibility = 'collapsed';
    }
  };

  expand = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_EXPAND, AppEvents.EVENT_BEFORE_EXPAND);
    if (emitResult) {
      this.props.visibility = 'expanded';
    }
  };

  refresh = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_REFRESH);
  };

  resetSize = () => {
    console.log('resizing');
    if (this.stateProps.isResizing) { // wait until previous resize finishes to prevent a resize loop
      return false;
    }

    this.stateProps.isResizing = true;
    const { outgoingDispatcher: eventDispatcher, windowProxy } = this.props;

    eventDispatcher
      .emitAsync(AppEvents.EVENT_RESET_SIZE, { size: windowProxy.bodySize })
      .then(({ height }) => {
        this.stateProps.isResizing = false;

        console.log('handled resetSize event');
      });
  };

  unload = () => {
    const { internalDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_UNLOAD);
  };

  showNotification = (notification) => {
    const { outgoingDispatcher: eventDispatcher } = this.props;
    eventDispatcher.emitAsync(AppEvents.EVENT_SHOW_NOTIFICATION, notification);
  };

  // CLIENTS

  /**
   * @return {StateApiFacade}
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
