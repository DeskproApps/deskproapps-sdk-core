import * as AppEvents from '../Core/AppEvents';

import * as Events from './Events';
import * as Constants from './Constants';

export class UIFacade
{
  /**
   * @param {EventDispatcher} UIEventsDispatcher
   * @param {function} resizer
   */
  constructor(UIEventsDispatcher, resizer) {
    this.props = {
      eventDispatcher: UIEventsDispatcher,
      resizer,
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

  showMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_VISIBLE;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  hideMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_HIDDEN;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  // BADGE API

  get badge() { return this.props.badge; }

  showBadgeCount = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { eventDispatcher, badge: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.badge = newVisibility;
      eventDispatcher.emit(Events.EVENT_BADGE_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  hideBadgeCount = () => {
    const newVisibility = Constants.VISIBILITY_HIDDEN;
    const { eventDispatcher, badge: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.badge = newVisibility;
      eventDispatcher.emit(Events.EVENT_BADGE_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  get badgeCount() { return this.props.badgeCount; }

  set badgeCount(newCount) {
    const { eventDispatcher, badgeCount: oldCount } = this.props;
    this.props.badgeCount = newCount;

    if (oldCount !== newCount) {
      eventDispatcher.emit(Events.EVENT_BADGE_COUNTCHANGED, newCount, oldCount);
    }
  }

  // APP VISIBILITY API

  /**
   * @return {string}
   */
  get visibility() { return this.props.visibility };

  /**
   * @return {boolean}
   */
  isVisible = () => { return this.props.visibility === Constants.VISIBILITY_VISIBLE; };

  /**
   * @return {boolean}
   */
  isHidden = () => { return this.props.visibility === Constants.VISIBILITY_HIDDEN; };

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
   * @return {string}
   */
  get display() { return this.props.display };

  /**
   * @return {boolean}
   */
  isExpanded = () => { return this.props.display ===  Constants.DISPLAY_EXPANDED; };

  /**
   * @return {boolean}
   */
  isCollapsed = () => { return this.props.display ===  Constants.DISPLAY_COLLAPSED; };

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

  get state() { return this.props.state; }

  isLoading = () => { return this.props.state ===  Constants.STATE_LOADING; };

  isReady = () => { return this.props.state ===  Constants.STATE_READY; };

  showLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state !== Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_LOADING;
      eventDispatcher.emit(Events.EVENT_UI_STATECHANGED, Constants.STATE_LOADING, state);
    }
  };

  hideLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state === Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_READY;
      eventDispatcher.emit(Events.EVENT_UI_STATECHANGED, Constants.STATE_READY, state);
    }
  };

  // SETTINGS API

  showSettings = () => {
    const newVisibility = Constants.VISIBILITY_VISIBLE;
    const { eventDispatcher, settings: oldVisibility } = this.props;

    if (oldVisibility !== newVisibility) {
      this.props.settings = newVisibility;
      eventDispatcher.emit(Events.EVENT_SETTINGS_VISIBILITYCHANGED, newVisibility, oldVisibility);
    }
  };

  // MISC API

  resetSize = () => {
    if (this.props.isResizing) { // wait until previous resize finishes to prevent a resize loop
      return false;
    }

    this.props.isResizing = true;
    const onResize = ({ height }) => { this.props.isResizing = false; };
    const { resizer } = this.props;
    resizer(onResize);
  };
}
