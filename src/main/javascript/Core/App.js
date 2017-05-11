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
   */
  constructor(eventDispatcher) {
    this.props = {
      eventDispatcher,
      state: new PostMessageAPI.StateAPIClient(eventDispatcher),
      ui: new UI(eventDispatcher),
      visibility: 'expanded', // hidden, collapsed, expanded
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
   * @return {StateAPIClient}
   */
  state = () => this.props.state;

  /**
   * @return {ContextAPIClient}
   */
  context = () => {
    const { eventDispatcher } = this;
    return new PostMessageAPI.ContextAPIClient(eventDispatcher);
  };

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
