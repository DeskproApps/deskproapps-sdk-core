import * as Events from './Events';
import * as Constants from './Constants';

export class UIFacade
{
  /**
   * @param {EventEmitter} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.props = {
      eventDispatcher,
      state: Constants.STATE_READY, // loading, ready, empty, error, ? partial
      menu: Constants.VISIBILITY_VISIBLE, //visible, hidden
      badge: Constants.VISIBILITY_HIDDEN, //visible, hidden
      badgeCount: 0,
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

  showSettings = () => {
    const { eventDispatcher } = this.props;
    eventDispatcher.emit(Events.EVENT_SHOW_SETTINGS);
  };

}
