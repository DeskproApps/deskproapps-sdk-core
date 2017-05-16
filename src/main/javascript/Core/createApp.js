import { isBrowser } from './utils';

import { windowProxy } from './Window';

import { RequestEventDispatcher, ResponseEventDispatcher } from './EventDispatcher';

import * as SdkEvents from './SdkEvents';
import * as SdkEventHandlers from './SdkEventHandlers';

import * as AppEvents from './AppEvents';
import * as EventListener from './EventListener';
import { on as postRobotOn } from '../../../post-robot';

import App from './App';
import { create } from '../../../xcomponent';

// register sdk event listeners
for (const eventName of SdkEvents.eventNames) {
  const listener = EventListener.factory(eventName, SdkEventHandlers.requestHandler(eventName), SdkEventHandlers.responseHandler(eventName));
  RequestEventDispatcher.addListener(eventName, listener);

  postRobotOn(eventName, event => { ResponseEventDispatcher.emit(eventName, event.data)  });
}

const getPropsFromXchild = xchild => {
  const { appId, appTitle, appPackageName, instanceId } = xchild.props;
  return { appId, appTitle, appPackageName, instanceId };
};

/**
 * @param dpParams
 * @return {{dimensions: {width: string, height: string}, props: {widgetId: {type: string, required: boolean}, appId: {type: string, required: boolean}, appTitle: {type: string, required: boolean}, appPackageName: {type: string, required: boolean}, instanceId: {type: string, required: boolean}, onDpMessage: {type: string, required: boolean}}, scrolling: boolean, autoResize: boolean, tag: *, url: string}}
 */
const getXcomponentOptions = (dpParams) => {

  return {
    dimensions: {
      width: '100%',
      height: '100%'
    },
    props: {
      widgetId: {
        type: 'string',
        required: true
      },

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

      onDpMessage: {
        type: 'function',
        required: true
      }
    },
    scrolling: false,
    autoResize: true,
    tag: dpParams['dp.xconf.tag'], //needs to match xcomponent config on the parent
    url: 'http://localhost', // dummy entry to bypass validation
  };

};

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const xcomponentOptions = getXcomponentOptions(windowProxy.dpParams);
  const xcomponent = create(xcomponentOptions);

  if (xcomponent.isChild()) {
      xcomponent.child().init().then(xchild => {

        const injectedProps = getPropsFromXchild(xchild);
        const props = { eventDispatcher: RequestEventDispatcher, ...injectedProps };

        const app = new App(props);
        windowProxy.onLoad(() => cb(app));
      }).catch();
  } else if (isBrowser()) {
      windowProxy.onLoad(() => cb(app));
  }
};

export default createApp;
