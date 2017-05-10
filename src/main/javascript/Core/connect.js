import Runtime from './Runtime';

import { windowProxy } from './Window';
import { xcomponentInstance } from './Xcomponent';

import { RequestEventDispatcher, ResponseEventDispatcher } from './EventDispatcher';

import * as SdkEvents from './SdkEvents';
import * as SdkEventHandlers from './SdkEventHandlers';

import * as AppEvents from './AppEvents';
import * as EventListener from './EventListener';
import { on as postRobotOn } from '../../../post-robot';

import DpApp from './DpApp';

/**
 * @param {EventEmitter}  dispatcher
 */
const registerSdkEvents = (dispatcher) =>
{
  for (const eventName of SdkEvents.eventNames) {
    const listener = EventListener.factory(eventName, SdkEventHandlers.requestHandler(eventName), SdkEventHandlers.responseHandler(eventName));
    dispatcher.addListener(eventName, listener);

    postRobotOn(eventName, event => { ResponseEventDispatcher.emit(eventName, event.data)  });
  }
};

/**
 * @return {Promise.<DpApp>|*}
 */
const connect = () => {
  registerSdkEvents(RequestEventDispatcher);

  const dpapp = new DpApp(RequestEventDispatcher);
  const executor = (resolve, reject) => RequestEventDispatcher.once(AppEvents.EVENT_MOUNT, () => resolve(dpapp));
  const connectPromise = new Promise(executor);

  if (xcomponentInstance.isChild()) {
      xcomponentInstance.child().init().then(() => RequestEventDispatcher.emit(AppEvents.EVENT_MOUNT)).catch();
  } else if (Runtime.isBrowser()) {
      windowProxy.onLoad(() => RequestEventDispatcher.emit(AppEvents.EVENT_MOUNT));
  }

  return connectPromise;
};

export default connect;
