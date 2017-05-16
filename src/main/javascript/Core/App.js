import * as PostMessageAPI from '../PostMessageAPI';
import * as AppEvents from './AppEvents';
import Event from './Event';
import UI from './UI';


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
   * @param {EventEmitter} eventDispatcher
   * @param {String} appId
   * @param {String} appTitle
   * @param {String} appPackageName
   * @param {String} instanceId
   */
  constructor({ eventDispatcher, appId, appTitle, appPackageName, instanceId }) {
    this.props = {
      eventDispatcher,
      appId,
      appTitle,
      instanceId,
      packageName: appPackageName,
      state: new PostMessageAPI.StateAPIClient(eventDispatcher),
      context: new PostMessageAPI.ContextAPIClient(eventDispatcher),
      ui: new UI(eventDispatcher),
      visibility: 'expanded', // hidden, collapsed, expanded
    };

    this.stateProps = {
      appTitle: appTitle,
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

  get appId() { return this.props.appId; }

  get appTitle() { return this.props.appTitle; }

  set appTitle(newTitle) {
    const oldTitle = this.stateProps.appTitle;

    if (newTitle !== oldTitle) {
      this.stateProps.appTitle = newTitle;

      const { eventDispatcher } = this.props;
      eventDispatcher.emit(AppEvents.EVENT_TITLE_CHANGED, newTitle, oldTitle);
    }
  }

  resetTitle = () => {
    this.appTitle = this.props.appTitle;
  };

  get packageName() { return this.props.appPackageName; }

  get instanceId() { return this.props.instanceId; }

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
   * @return {PostMessageAPI.StateAPIClient}
   */
  get state() { return this.props.state; };

  /**
   * @return {PostMessageAPI.ContextAPIClient}
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
