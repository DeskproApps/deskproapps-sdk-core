import * as AppEvents from '../Core/AppEvents';

import * as Events from './Events';
import * as Constants from './Constants';

export class UIFacade
{
  /**
   * @param {EventDispatcher} UIEventsDispatcher
   * @param {function} resize
   */
  constructor(UIEventsDispatcher, resize) {
    this.props = {
      eventDispatcher: UIEventsDispatcher,
      resize,
      display: Constants.DISPLAY_EXPANDED, // expanded, collapsed
      visibility: Constants.VISIBILITY_VISIBLE, // visible, hidden
      state: Constants.STATE_READY, // loading, ready, empty, error, ? partial
      menu: Constants.VISIBILITY_VISIBLE, // visible, hidden
      badge: Constants.VISIBILITY_HIDDEN, // visible, hidden
      badgeCount: 0,
      isResizing: false
    };
  }

  get state() { return this.props.state; }

  get menu() { return this.props.menu; }

  get badge() { return this.props.badge; }

  get badgeCount() { return this.props.badgeCount; }

  set badgeCount(newCount) {
    const { eventDispatcher, badgeCount: oldCount } = this.props;
    this.props.badgeCount = newCount;

    if (oldCount !== newCount) {
      eventDispatcher.emit(Events.EVENT_BADGE_COUNTCHANGED, newCount, oldCount);
    }
  }

  /**
   * @return {string}
   */
  get visibility() { return this.props.visibility };

  /**
   * @return {boolean}
   */
  get isVisible() { return this.props.visibility === Constants.VISIBILITY_VISIBLE; }

  /**
   * @return {boolean}
   */
  get isHidden() { return this.props.visibility === Constants.VISIBILITY_HIDDEN; }

  /**
   * @return {boolean}
   */
  get isExpanded() { return this.props.display ===  Constants.DISPLAY_EXPANDED; }

  /**
   * @return {boolean}
   */
  get isCollapsed() { return this.props.visibility ===  Constants.DISPLAY_COLLAPSED; }

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

  showLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state !== Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_LOADING;
      eventDispatcher.emit(Events.EVENT_STATE_TRANSITION, Constants.STATE_LOADING, state);
    }
  };

  hideLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state === Constants.STATE_LOADING) {
      this.props.state = Constants.STATE_READY;
      eventDispatcher.emit(Events.EVENT_STATE_TRANSITION, Constants.STATE_READY, state);
    }
  };

  showMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_VISIBLE;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_STATE_TRANSITION, newVisibility, oldVisibility);
    }
  };

  hideMenu = () => {
    const { eventDispatcher, menu:oldVisibility } = this.props;
    const newVisibility = Constants.VISIBILITY_HIDDEN;

    if (oldVisibility !== newVisibility) {
      this.props.menu = newVisibility;
      eventDispatcher.emit(Events.EVENT_MENU_STATE_TRANSITION, newVisibility, oldVisibility);
    }
  };

  show = () => {
    const { eventDispatcher, visibility } = this.props;

    if (visibility === Constants.VISIBILITY_VISIBLE) {
      const onEmitChangeVisibility = (emit) => {
        emit();
        this.props.visibility = Constants.VISIBILITY_VISIBLE;
      };

      eventDispatcher.emitIfNotCanceled(AppEvents.EVENT_BEFORE_SHOW, AppEvents.EVENT_SHOW, onEmitChangeVisibility);
    }
  };

  hide = () => {
    const { eventDispatcher, visibility } = this.props;

    if (visibility !== Constants.VISIBILITY_HIDDEN) {
      const onEmitChangeVisibility = (emit) => {
        emit();
        this.props.visibility = Constants.VISIBILITY_HIDDEN;
      };
      eventDispatcher.emitIfNotCanceled(AppEvents.EVENT_BEFORE_HIDE, AppEvents.EVENT_HIDE, onEmitChangeVisibility);
    }
  };

  collapse = () => {
    const { eventDispatcher, display } = this.props;

    if (display !== Constants.DISPLAY_COLLAPSED) {
      const onEmitChangeDisplay = (emit) => {
        emit();
        this.props.display = Constants.DISPLAY_COLLAPSED;
      };

      eventDispatcher.emitIfNotCanceled(AppEvents.EVENT_BEFORE_COLLAPSE, AppEvents.EVENT_COLLAPSE, onEmitChangeDisplay);
    }
  };

  expand = () => {
    const { eventDispatcher, display } = this.props;

    if (display !== Constants.DISPLAY_EXPANDED) {
      const onEmitChangeDisplay = (emit) => {
        emit();
        this.props.display = Constants.DISPLAY_EXPANDED;
      };

      eventDispatcher.emitIfNotCanceled(AppEvents.EVENT_BEFORE_EXPAND, AppEvents.EVENT_EXPAND, onEmitChangeDisplay);
    }
  };

  resetSize = () => {
    if (this.props.isResizing) { // wait until previous resize finishes to prevent a resize loop
      return false;
    }

    this.props.isResizing = true;
    const onResize = ({ height }) => { this.props.isResizing = false; };
    this.props.resize(onResize);
  };

  showSettings = () => {
    const { eventDispatcher } = this.props;
    eventDispatcher.emit(Events.EVENT_SHOW_SETTINGS);
  };

}
