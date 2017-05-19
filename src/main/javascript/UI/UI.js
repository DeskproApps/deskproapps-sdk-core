import * as Events from './Events';

class UI
{
  /**
   * @param {EventEmitter} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.props = {
      eventDispatcher,
      state: 'ready', // loading, ready, empty, error, ? partial
      menu: 'visible' //visible, hidden
    };
  }

  get state() { return this.props.state; }

  get menu() { return this.props.menu; }

  showLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state !== 'loading') {
      this.props.state = 'loading';
      eventDispatcher.emit(Events.EVENT_STATE_TRANSITION, 'loading', state);
    }
  };

  hideLoading = () => {
    const { eventDispatcher, state } = this.props;

    if (state === 'loading') {
      this.props.state = 'ready';
      eventDispatcher.emit(Events.EVENT_STATE_TRANSITION, 'ready', state);
    }
  };

  showMenu = () => {
    const { eventDispatcher, menu } = this.props;

    if (menu !== 'visible') {
      this.props.menu = 'visible';
      eventDispatcher.emit(Events.EVENT_MENU_STATE_TRANSITION, 'visible', menu);
    }
  };

  hideMenu = () => {
    const { eventDispatcher, menu } = this.props;

    if (menu !== 'hidden') {
      this.props.menu = 'hidden';
      eventDispatcher.emit(Events.EVENT_MENU_STATE_TRANSITION, 'hidden', menu);
    }
  };

  showSettings = () => {
    const { eventDispatcher } = this.props;
    eventDispatcher.emit(Events.EVENT_SHOW_SETTINGS);
  };

}

export default UI;
