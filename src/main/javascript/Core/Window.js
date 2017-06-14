import getSize from 'get-size';
import elementResizeDetectorMaker from 'element-resize-detector';
import { parseQueryString, validate as validateInitParams } from './InitProps';

/**
 * @param {{search: String, hash: String}}location
 * @return {InitProps|null}
 */
const parseInitParamsFromLocation = location => {
  let params = null;

  // build a list of potential sources for init params, ordered by priority
  const paramsQueryStrings = [
    location.hash.length ? location.hash.substring(1) : null,
    location.search.length ? location.search.substring(1) : null
  ].filter(string => !!string);

  console.log(paramsQueryStrings);

  if (paramsQueryStrings.length === 0) { return params; }

  for (const queryString of paramsQueryStrings) {
    const initParams = parseQueryString(queryString);

    if (validateInitParams(initParams)) {
      params = initParams;
      break;
    }
  }

  return params;
};

class WindowProxy {

  /**
   * @param {Window} windowObject
   */
  constructor(windowObject) {

    this.props = { windowObject };

    const windowListeners = { load: [], bodyResize: [] };

    this.state = {
      initParams: parseInitParamsFromLocation(windowObject.location),
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

  /**
   * @return {InitProps|null}
   */
  get initParams() { return this.state.initParams; }
}

export const windowProxy = new WindowProxy(window);
export default WindowProxy;

