import getSize from "get-size";
import elementResizeDetectorMaker from "element-resize-detector";
import * as postRobot from "post-robot";
import {WidgetFactories} from "./WidgetFactories";
import {EVENT_WINDOW_MOUSEEVENT, EVENT_WINDOW_RESIZE} from "./Events";

/**
 * @ignore
 *
 * @param eventName
 * @param listener
 * @param windowObject
 */
const addWindowEventListener = (eventName, listener, windowObject) =>
{
  const addListener = windowObject.addEventListener ? windowObject.addEventListener : windowObject.attachEvent;
  const event = windowObject.addEventListener ? eventName : 'on' + eventName;

  addListener(event, listener);
};

/**
 * @ignore
 *
 * @param windowBridge
 * @param e
 */
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
  windowBridge.emitRequest(EVENT_WINDOW_MOUSEEVENT, payload)
    .then(({ emit }) => emit())
    ;
};

let isResizing = false;
/**
 * @ignore
 *
 * @param {WidgetWindowBridge} windowBridge
 * @return {null}
 */
const windowSizeChangeHandler = (windowBridge) => {
  if (isResizing) { return null; }

  isResizing = true;
  windowBridge.emitRequest(EVENT_WINDOW_RESIZE, { size: windowBridge.bodySize })
    .then(({ emit }) => emit())
    .then(() => { isResizing = false; })
  ;
};

const mouseEvents = ['mousedown', 'mouseup'];

/**
 * @class
 */
class WidgetWindowBridge {

  /**
   * @param {Window} windowObject
   * @param {InitProps} initProps
   */
  constructor(windowObject, initProps) {
    this.props = { windowObject, initProps };

    const onLoadExecutor = (resolve, reject) => {
      if (windowObject.document.readyState === 'complete') {
        resolve();
      }
      addWindowEventListener('load', resolve, windowObject);
    };
    this.onLoadPromise = new Promise(onLoadExecutor);
  }

  /**
   * @type {String}
   */
  get widgetId () {
    const { initProps } = this.props;
    return initProps.dpWidgetId;
  }

  /**
   * @param {function} createApp
   * @return {Promise.<App>}
   */
  connect(createApp)
  {
    const { windowObject } = this.props;
    const { widgetId } = this;

    return this.onLoadPromise
      .then(() => postRobot.send(postRobot.parent, `urn:deskpro:apps.widget.onready?widgetId=${widgetId}`, {}).then(event => event.data))
      .then(o => createApp({ ...o, widgetWindow: this}))
      .then(app => {
        // reduce verbosity of post-robot logging
        if (app.environment === 'production') {
          postRobot.CONFIG.LOG_LEVEL = 'error';
        }
        postRobot.CONFIG.LOG_LEVEL = 'error';

        const handler = mouseEventHandler.bind(null, this);
        mouseEvents.forEach(event => addWindowEventListener(event, handler, windowObject));

        // register the window resize strategy
        this.erd = elementResizeDetectorMaker({ strategy: "scroll" });
        this.erd.listenTo(windowObject.document.body, windowSizeChangeHandler.bind(null, this));

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
    postRobot.on(eventName, handler);
  }

  /**
   * @param {String} eventName
   * @param {Error|null} error
   * @param {{}} data
   * @param {WidgetRequest} request
   * @return {Promise.<{response: WidgetResponse, emit: (function())}>}
   */
  async emitResponse(eventName, error, data, request)
  {
    const { widgetId } = this;
    const response = WidgetFactories.nextResponse(request, error ? error: data, !!error);

    const payload = { eventName, ...response.toJS() };
    const event = `urn:deskpro:apps.widget.event?widgetId=${widgetId}`;

    const emit = () => {
      postRobot.send(postRobot.parent, event, payload);
    };
    return Promise.resolve({ response, emit });
  }

  /**
   * @param {String} eventName
   * @param {*} data
   * @return {Promise.<{request: WidgetRequest, emit: (function())}>}
   */
  async emitRequest(eventName, data)
  {
    const { widgetId } = this;
    const request = WidgetFactories.nextRequest(widgetId, data);

    const payload = { eventName, ...request.toJS() };
    const event = `urn:deskpro:apps.widget.event?widgetId=${widgetId}`;


    const emit = () => {
      postRobot.send(postRobot.parent, event, payload);
    };
    return Promise.resolve({ request, emit });
  }

  /**
   * @public
   * @constant
   *
   * @type {WidgetWindowBridge~GetSize}
   */
  get bodySize() {
    const { windowObject } = this.props;
    return getSize(windowObject.document.body);
  }

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