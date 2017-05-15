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

const xcomponentOptions = {
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
  tag: 'ticket-sidebar', //needs to match xcomponent config on the parent
  url: 'http://localhost', // dummy entry to bypass validation
};

const getReceivedProps = xchild => {
  const { appId, appTitle, appPackageName, instanceId } = xchild.props;
  return { appId, appTitle, appPackageName, instanceId };
};

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const xcomponent = create(xcomponentOptions);
  if (xcomponent.isChild()) {
      xcomponent.child().init().then(xchild => {
        const receivedProps = getReceivedProps(xchild);
        const props = { eventDispatcher: RequestEventDispatcher, ...receivedProps };

        const app = new App(props);
        cb(app);
      }).catch();
  } else if (isBrowser()) {
      windowProxy.onLoad(() => cb(app));
  }
};

export default createApp;
