import { isBrowser } from './utils';

import { windowProxy } from './Window';

import { RequestEventDispatcher, ResponseEventDispatcher } from './EventDispatcher';

import * as SdkEventHandlers from '../PostMessageAPI/EventHandlers';
import * as StateEventHandlers from '../State/StateEventHandlers';

import { on as postRobotOn } from '../../../post-robot';

import App from './App';
import * as AppEvents from './AppEvents';

import { create } from '../../../xcomponent';

import { InstanceProps, ContextProps } from './Props';

console.log('mortii matii');
let requestListeners;
// register sdk api request and response listeners
requestListeners = SdkEventHandlers.registerRequestListeners(RequestEventDispatcher);
requestListeners.forEach(
  (value, eventName) => postRobotOn(eventName, event => { ResponseEventDispatcher.emit(eventName, event.data)  })
);

// register state api request and response listeners
requestListeners = StateEventHandlers.registerRequestListeners(RequestEventDispatcher);
requestListeners.forEach(
  (value, eventName) => postRobotOn(eventName, event => { ResponseEventDispatcher.emit(eventName, event.data)  })
);



/**
 * @param dpParams
 * @return {{dimensions: {width: string, height: string}, props: {widgetId: {type: string, required: boolean}, appId: {type: string, required: boolean}, appTitle: {type: string, required: boolean}, appPackageName: {type: string, required: boolean}, instanceId: {type: string, required: boolean}, onDpMessage: {type: string, required: boolean}}, scrolling: boolean, autoResize: boolean, tag: *, url: string}}
 */
const getXcomponentOptions = (dpParams) => {

  return {
    autoResize: true,
    scrolling: false,
    tag: dpParams['dp.xconf.tag'], //needs to match xcomponent config on the parent
    url: 'http://localhost', // dummy entry to bypass validation

    dimensions: { width: '100%', height: '100%' },

    props: {

      // WIDGET PROPERTIES

      widgetId: {
        type: 'string',
        required: true
      },

      onDpMessage: {
        type: 'function',
        required: true
      },

      // INSTANCE PROPERTIES

      appId: {
        type: 'string',
        required: true
      },

      appTitle: {
        type: 'string',
        required: true
      },

      appPackageName: {
        type: 'string',
        required: true
      },

      instanceId: {
        type: 'string',
        required: true
      },

      // CONTEXT PROPERTIES

      contextType: {
        type: 'string',
        required: true
      },

      contextEntityId: {
        type: 'string',
        required: true
      },

      contextLocationId: {
        type: 'string',
        required: true
      },

      contextTabId: {
        type: 'string',
        required: true
      }
    }
  };
};

/**
 * @param xchild
 * @return {InstanceProps}
 */
const extractInstancePropsFromXChild = xchild => new InstanceProps(xchild.props);

/**
 * @param xchild
 * @return {ContextProps}
 */
const extractContextPropsFromXChild = xchild => {
  const { props } = xchild;
  const { contextType: type, contextEntityId: entityId, contextLocationId: locationId, contextTabId: tabId } = props;
  return new ContextProps({ type, entityId, locationId, tabId });
};

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const xcomponentOptions = getXcomponentOptions(windowProxy.dpParams);
  const xcomponent = create(xcomponentOptions);

  if (xcomponent.isChild()) {
      xcomponent.child().init().then(xchild => {

        const props = {
          eventDispatcher: RequestEventDispatcher,
          instanceProps: extractInstancePropsFromXChild(xchild),
          contextProps: extractContextPropsFromXChild(xchild),
        };

        const app = new App(props);
        windowProxy.onLoad(() => cb(app));
      }).catch();
  } else if (isBrowser()) {
      windowProxy.onLoad(() => cb(app));
  }
};

export default createApp;
