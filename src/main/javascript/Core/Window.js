import getSize from 'get-size';
import elementResizeDetectorMaker from 'element-resize-detector';

const parseDpParamsFromLocation = location => {

  const dpParams = {};

  const paramPrefix = 'dp.';
  const queryParams = location.search.substring(1).split('&').map(nameAndValue => nameAndValue.split('='));
  for (const param of queryParams) {
    const [name, value] = param;
    if (name.substr(0, paramPrefix.length) === paramPrefix) {
      dpParams[name] = value;
    }
  }

  return dpParams;
};

class WindowProxy {

  /**
   * @param {Window} windowObject
   */
  constructor(windowObject) {

    this.props = { windowObject };

    const windowListeners = { load: [], bodyResize: [] };

    this.state = {
      dpParams: parseDpParamsFromLocation(windowObject.location),
      windowListeners,
    };

    this.addEventListener('load', () => {
      this.erd = elementResizeDetectorMaker({
        strategy: "scroll"
      });
      this.erd.listenTo(windowObject.document.body, () => windowListeners.bodyResize.forEach(cb => cb()))
    });

    windowObject.onload = () => {
      windowListeners.load.forEach(cb => cb());
      windowListeners.load = [];
    };
  }

  get bodySize() { return getSize(this.props.windowObject.document.body); }

  /**
   * @param {String} eventName
   * @param {Function} cb
   */
  addEventListener = (eventName, cb) =>
  {
    const { windowObject } = this.props;

    // fire the callback immediately
    if (eventName === 'load' && windowObject.document.readyState === 'complete') {
      cb();
      return;
    }

    if (['load', 'bodyResize'].indexOf(eventName) === -1) {
      throw new Error(`unknown event name: ${eventName}`);
    }
    this.state.windowListeners[eventName].push(cb);
  };

  get xchild() {
    const { windowObject } = this.props;
    return windowObject.xchild;
  }

  get dpParams() { return this.state.dpParams; }
}

export const windowProxy = new WindowProxy(window);
export default WindowProxy;

