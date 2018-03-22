import * as Events from './events';
import * as AppEvents from '../Core/AppEvents';
import * as Constants from './constants';

/**
 * A facade which allows application code to interact with the UI Container
 *
 * @class
 */
class UIFacade
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {AppEventEmitter} UIEventsDispatcher
   */
  constructor(outgoingDispatcher, UIEventsDispatcher) {
    this.props = {
      outgoingDispatcher: outgoingDispatcher,
      eventDispatcher: UIEventsDispatcher,
      display: Constants.DISPLAY_EXPANDED, // expanded, collapsed
      visibility: Constants.VISIBILITY_VISIBLE, // visible, hidden
      state: Constants.STATE_READY, // loading, ready, empty, error, ? partial
      menu: Constants.VISIBILITY_VISIBLE, // visible, hidden
      badge: Constants.VISIBILITY_HIDDEN, // visible, hidden
      settings: Constants.VISIBILITY_HIDDEN, // visible, hidden
      badgeCount: 0,
      isResizing: false
    };
  }

  // MENU API

  get menu() { return this.props.menu; }

  /**
   * Shows the UI container's application menu
   *
   * @method
   */
  showMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_VISIBLE;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  /**
   * Hides the UI container's application menu
   *
   * @method
   */
  hideMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_HIDDEN;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  // BADGE API

  /**
   * The visibility of the application badge
   *
   * @readonly
   * @type {string}
   */
  get badge() { return this.props.badge; }

  /**
   * Shows a number in the application badge
   *
   * @method
   */
  showBadgeCount = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { eventDispatcher, outgoingDispatcher, badge: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.badge = newVisibility;
      eventDispatcher.emit(Events.EVENT_BADGE_VISIBILITYCHANGED, newVisibility, oldVisibility);
      outgoingDispatcher.emitAsync(AppEvents.EVENT_BADGE, { visibility: newVisibility, count: this.badgeCount });
    }
  };

  /**
   * Hides a number in the application badge
   *
   * @method
   */
  hideBadgeCount = () => {
    const newVisibility = Constants.VISIBILITY_HIDDEN;
    const { eventDispatcher, outgoingDispatcher, badge: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.badge = newVisibility;
      eventDispatcher.emit(Events.EVENT_BADGE_VISIBILITYCHANGED, newVisibility, oldVisibility);
      outgoingDispatcher.emitAsync(AppEvents.EVENT_BADGE, { visibility: newVisibility, count: this.badgeCount });
    }
  };

  /**
   * The number to display in in the application badge
   *
   * @type {number}
   */
  get badgeCount() { return this.props.badgeCount; }

  /**
   * @ignore
   * @param {number} newCount
   */
  set badgeCount(newCount) {
    const { eventDispatcher, outgoingDispatcher, badge: visibility, badgeCount: oldCount } = this.props;
    this.props.badgeCount = newCount;

    if (oldCount !== newCount) {
      eventDispatcher.emit(Events.EVENT_BADGE_COUNTCHANGED, newCount, oldCount);
      outgoingDispatcher.emitAsync(AppEvents.EVENT_BADGE, { visibility, count: newCount });
    }
  }

  // APP VISIBILITY API

  /**
   * The application visibility property
   *
   * @readonly
   * @type {string}
   */
  get visibility() { return this.props.visibility };

  /**
   * Checks if the application is visible
   *
   * @method
   *
   * @return {boolean}
   */
  isVisible = () => { return this.props.visibility === Constants.VISIBILITY_VISIBLE; };

  /**
   * Checks if the application is hidden
   *
   * @method
   *
   * @return {boolean}
   */
  isHidden = () => { return this.props.visibility === Constants.VISIBILITY_HIDDEN; };

  /**
   * Shows the application
   *
   * @method
   */
  show = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { eventDispatcher, visibility: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      const emit = eventDispatcher.emitCancelable(
        Events.EVENT_UI_BEFOREVISIBILITYCHANGED,
        () => { this.props.visibility = newVisibility; }
      );

      emit(Events.EVENT_UI_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  /**
   * Hides the application
   *
   * @method
   */
  hide = () => {
    const newVisibility = Constants.VISIBILITY_HIDDEN;
    const { eventDispatcher, visibility: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      const emit = eventDispatcher.emitCancelable(
        Events.EVENT_UI_BEFOREVISIBILITYCHANGED,
        () => { this.props.visibility = newVisibility; }
      );

      emit(Events.EVENT_UI_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  // APP DISPLAY / APP LAYOUT API

  /**
   * The application display property
   *
   * @readonly
   * @type {string}
   */
  get display() { return this.props.display };

  /**
   * Checks if the application is expanded
   *
   * @method
   *
   * @return {boolean}
   */
  isExpanded = () => { return this.props.display ===  Constants.DISPLAY_EXPANDED; };

  /**
   * Checks if the application is collapsed
   *
   * @method
   *
   * @return {boolean}
   */
  isCollapsed = () => { return this.props.display ===  Constants.DISPLAY_COLLAPSED; };

  /**
   * Collapses the application
   *
   * @method
   */
  collapse = () => {
    const newDisplay = Constants.DISPLAY_COLLAPSED;
    const { eventDispatcher, display: oldDisplay } = this.props;

    if (oldDisplay !== newDisplay) {
      const emit = eventDispatcher.emitCancelable(
        Events.EVENT_UI_BEFOREDISPLAYCHANGED,
        () => { this.props.display = newDisplay; }
      );

      emit(Events.EVENT_UI_DISPLAYCHANGED, newDisplay, oldDisplay);
    }
  };

  /**
   * Expands the application
   *
   * @method
   */
  expand = () => {
    const newDisplay = Constants.DISPLAY_EXPANDED;
    const { eventDispatcher, display: oldDisplay } = this.props;

    if (oldDisplay !== newDisplay) {
      const emit = eventDispatcher.emitCancelable(
        Events.EVENT_UI_BEFOREDISPLAYCHANGED,
        () => { this.props.display = newDisplay; }
      );

      emit(Events.EVENT_UI_DISPLAYCHANGED, newDisplay, oldDisplay);
    }
  };

  // UI STATE API

  /**
   * The UI container state property
   *
   * @readonly
   * @type {string}
   */
  get state() { return this.props.state; }

  /**
   * Checks if the UI is in a loading state
   *
   * @method
   *
   * @return {boolean}
   */
  isLoading = () => { return this.props.state ===  Constants.STATE_LOADING; };

  /**
   * Checks if the UI is in the ready state
   *
   * @method
   *
   * @return {boolean}
   */
  isReady = () => { return this.props.state ===  Constants.STATE_READY; };

  /**
   * Shows a loading indicator
   *
   * @method
   */
  showLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state !== Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_LOADING;
      eventDispatcher.emit(Events.EVENT_UI_STATECHANGED, Constants.STATE_LOADING, state);
    }
  };

  /**
   * Hides the active loading indicator
   *
   * @method
   */
  hideLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state === Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_READY;
      eventDispatcher.emit(Events.EVENT_UI_STATECHANGED, Constants.STATE_READY, state);
    }
  };

  // SETTINGS API

  /**
   * Shows the settings API
   *
   * @method
   */
  showSettings = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { eventDispatcher, settings: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.settings = newVisibility;
      eventDispatcher.emit(Events.EVENT_SETTINGS_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };
}

export default UIFacade
