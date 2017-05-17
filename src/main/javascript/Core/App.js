import * as PostMessageAPI from '../PostMessageAPI';
import * as AppEvents from './AppEvents';
import Event from './Event';

import { createContext } from '../Context';
import { createUI } from '../UI';
import { createAppStateFacade, createContextStateFacade } from '../State/StateApiFacade';

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
   * @param {EventDispatcher} eventDispatcher
   * @param {InstanceProps} instanceProps
   * @param {ContextProps} contextProps
   */
  constructor({ eventDispatcher, instanceProps, contextProps }) {

    const context = createContext(eventDispatcher, contextProps);

    this.props = {
      eventDispatcher,
      instanceProps,
      contextProps,
      appState: createAppStateFacade(eventDispatcher),
      tabState: createContextStateFacade(eventDispatcher, context),
      context,
      ui: createUI(eventDispatcher),
      visibility: 'expanded', // hidden, collapsed, expanded
    };

    this.stateProps = {
      appTitle: instanceProps.appTitle,
      badgeCount: 0
    };

  }

  /**
   * @return {UI}
   */
  get ui() { return this.props.ui; }

  /**
   * @return {EventEmitter}
   */
  get eventDispatcher() { return this.props.eventDispatcher; }

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

  get packageName() { return this.props.instanceProps.appPackageName; }

  get instanceId() { return this.props.instanceProps.instanceId; }

  get badgeCount() { return this.stateProps.badgeCount; }

  set badgeCount(newCount) {
    const oldCount = this.stateProps.badgeCount;
    this.stateProps.badgeCount = newCount;

    const { eventDispatcher } = this.props;
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

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  on = (eventName, listener) => {
    this.eventDispatcher.on(eventName, listener);
  };

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  off = (eventName, listener) => {
    this.eventDispatcher.removeListener(eventName, listener);
  };

  /**
   * @param {String} eventName
   * @param {function} listener
   */
  once = (eventName, listener) => {
    this.eventDispatcher.once(eventName, listener);
  };

  emit = (eventName, ...args) => {
    const { eventDispatcher } = this.props;
    const dispatcherArgs = [eventName].concat(args);
    eventDispatcher.emit.apply(eventDispatcher, dispatcherArgs);
  };

  show = () => {
    const { eventDispatcher, visibility } = this.props;

    if (visibility === 'hidden') {
      const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_SHOW, AppEvents.EVENT_BEFORE_SHOW);
      if (emitResult) {
        this.props.visibility = 'expanded'
      }
    }
  };

  hide = () => {
    const { eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_HIDE, AppEvents.EVENT_BEFORE_HIDE);
    if (emitResult) {
      this.props.visibility = 'hidden';
    }
  };

  collapse = () => {
    const { eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_COLLAPSE, AppEvents.EVENT_BEFORE_COLLAPSE);
    if (emitResult) {
      this.props.visibility = 'collapsed';
    }
  };

  expand = () => {
    const { eventDispatcher } = this.props;
    const emitResult = emitIfNotCanceled(eventDispatcher, AppEvents.EVENT_EXPAND, AppEvents.EVENT_BEFORE_EXPAND);
    if (emitResult) {
      this.props.visibility = 'expanded';
    }
  };

  refresh = () => {
    const { eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_REFRESH);
  };

  unload = () => {
    const { eventDispatcher } = this.props;
    eventDispatcher.emit(AppEvents.EVENT_UNLOAD);
  };

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

  /**
   * @return {UserAPIClient}
   */
  user = () => {
    const { eventDispatcher } = this;
    return new PostMessageAPI.UserAPIClient(eventDispatcher);
  };

  log = (...args) => {
    console.log.apply(console, args);
  };
}

export default App;
