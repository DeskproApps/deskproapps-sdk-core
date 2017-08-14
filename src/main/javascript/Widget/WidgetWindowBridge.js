import getSize from 'get-size';
import elementResizeDetectorMaker from 'element-resize-detector';
import { on as postRobotOn } from '../../../post-robot';

import { WidgetFactories } from './WidgetFactories'
import { EVENT_WINDOW_MOUSEEVENT } from './Events'


const addWindowEventListener = (eventName, listener, windowObject) =>
{
  const addListener = windowObject.addEventListener ? windowObject.addEventListener : windowObject.attachEvent;
  const event = windowObject.addEventListener ? eventName : 'on' + eventName;

  addListener(event, listener);
};

const mouseEventHandler = (windowBridge, e) =>
{
  const scalarKeys = (original) => {
    const obj = {};
    for(const key in original) {
      obj[key] = typeof original[key] === 'object' ? {} : original[key];
    }
    return obj;
  };

  const payload = JSON.parse(JSON.stringify(scalarKeys(e)));
  windowBridge.emit(EVENT_WINDOW_MOUSEEVENT, payload);
};

const mouseEvents = ['mousedown', 'mouseup'];

/**
 * @class
 */
class WidgetWindowBridge {

  /**
   * @param {Window} windowObject
   * @param {InitProps} initProps
   * @param {function} xcomponentFactory
   */
  constructor(windowObject, initProps, xcomponentFactory) {
    this.props = { windowObject, initProps, xcomponentFactory };

    const onLoadExecutor = (resolve, reject) => {
      if (windowObject.document.readyState === 'complete') {
        resolve();
      }
      addWindowEventListener('load', resolve, windowObject);
    };
    this.onLoadPromise = new Promise(onLoadExecutor);
  }

  get widgetId () {
    const { windowObject } = this.props;
    if (windowObject.xchild && windowObject.xchild.props) {
      return windowObject.xchild.props.widgetId;
    }

    return null;
  }

  /**
   * @param createApp
   * @return {Promise.<App>}
   */
  connect(createApp)
  {
    const { windowObject, initProps, xcomponentFactory } = this.props;

    return this.onLoadPromise
      .then(() => {
        const xcomponent = xcomponentFactory(initProps);
        if (xcomponent && xcomponent.isChild()) {
          return xcomponent.child().init();
        }
        // TODO the scenario where the app can run without xcomponent needs rethinking
        return Promise.reject('failed to initialize xcomponent in child mode');
      })
      .then(xchild => createApp(xchild.props))
      .then(app => {

        const handler = mouseEventHandler.bind(null, this);
        mouseEvents.forEach(event => addWindowEventListener(event, handler, windowObject));

        // register the window resize strategy
        this.erd = elementResizeDetectorMaker({ strategy: "scroll" });
        this.erd.listenTo(windowObject.document.body, () => app.ui.resetSize());

        return app;
      })
    ;
  }

  /**
   * @param {String} eventName
   * @param {function} handler
   */
  on(eventName, handler)
  {
    postRobotOn(eventName, handler);
  }

  /**
   * @param {string} eventName
   * @param {{}} data
   * @return {Promise.<{request: Object, emit: (function(this:WidgetWindowBridge))}>}
   */
  async event(eventName, data)
  {
    const { windowObject } = this.props;
    const { widgetId } = this;

    const request = WidgetFactories.nextRequest(widgetId, data);
    const { onDpMessage } = windowObject.xchild.props;

    /**
     * @param {WidgetRequest} request
     */
    const emit = request => onDpMessage(eventName, request.toJS());
    return Promise.resolve({ request, emit });
  }

  emit(eventName, data)
  {
    const { windowObject } = this.props;
    const { widgetId } = this;

    const { onDpMessage } = windowObject.xchild.props;
    onDpMessage(eventName, WidgetFactories.nextRequest(widgetId, data).toJS());
  }

  /**
   * @public
   * @constant
   * @type {WidgetWindowBridge~GetSize}
   */
  get bodySize() {
    const { windowObject } = this.props;
    return getSize(windowObject.document.body);
  }

  /**
   * @constant
   * @type {InitProps|null}
   */
  get initParams() { return this.state.initProps; }
}

export { WidgetWindowBridge };

/**
 * GetSize Type.
 *
 * @typedef {Object} WindowProxy~GetSize
 * @property {number} width - Size in pixels.
 * @property {number} height - Size in pixels.
 * @property {number} innerWidth - Size in pixels.
 * @property {number} innerHeight - Size in pixels.
 * @property {number} outerWidth - Size in pixels.
 * @property {number} outerHeight - Size in pixels.
 */