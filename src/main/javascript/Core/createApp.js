import { isBrowser } from './utils';

import { windowProxy } from './Window';
import { xcomponentInstance } from './Xcomponent';

import { RequestEventDispatcher, ResponseEventDispatcher } from './EventDispatcher';

import * as SdkEvents from './SdkEvents';
import * as SdkEventHandlers from './SdkEventHandlers';

import * as AppEvents from './AppEvents';
import * as EventListener from './EventListener';
import { on as postRobotOn } from '../../../post-robot';

import App from './App';

// register sdk event listeners
for (const eventName of SdkEvents.eventNames) {
  const listener = EventListener.factory(eventName, SdkEventHandlers.requestHandler(eventName), SdkEventHandlers.responseHandler(eventName));
  RequestEventDispatcher.addListener(eventName, listener);

  postRobotOn(eventName, event => { ResponseEventDispatcher.emit(eventName, event.data)  });
}

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const app = new App(RequestEventDispatcher);
  if (xcomponentInstance.isChild()) {
      xcomponentInstance.child().init().then(() => cb(app)).catch();
  } else if (isBrowser()) {
      windowProxy.onLoad(() => cb(app));
  }
};

export default createApp;
