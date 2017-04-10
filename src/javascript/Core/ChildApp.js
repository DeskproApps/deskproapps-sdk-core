const props = {
  refreshHandler: false,
  settingsHandler: false,
  collapseHandler: false
};


class ChildApp {

  setOnRefreshHandler = (mixed) => {
    if (typeof mixed === 'boolean' && !mixed) {
      props.refreshHandler = false;
    } else if (typeof mixed === 'function') {
      props.refreshHandler = mixed;
    }
  };

  onRefresh = () => {
    const notify = typeof props.refreshHandler === 'function';
    if (notify) {
      props.refreshHandler();
    }

    return notify;
  };

  setOnSettingsHandler = (mixed) => {
    if (typeof mixed === 'boolean' && !mixed) {
      props.settingsHandler = false;
    } else if (typeof mixed === 'function') {
      props.settingsHandler = mixed;
    }
  };

  onSettings = () => {
    const notify = typeof props.settingsHandler === 'function';
    if (notify) {
      props.settingsHandler();
    }

    return notify;
  };

  setOnCollapseHandler = (mixed) => {
    if (typeof mixed === 'boolean' && !mixed) {
      props.collapseHandler = false;
    } else if (typeof mixed === 'function') {
      props.collapseHandler = mixed;
    }
  };

  onCollapse = () => {
    const notify = typeof props.collapseHandler === 'function';
    if (notify) {
      props.collapseHandler();
    }

    return notify;
  };

}

export default ChildApp;
