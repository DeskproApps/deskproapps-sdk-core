
import Runtime from './Core/Runtime';

import { windowProxy } from './Core/Window';
import { xcomponentInstance } from './Core/Xcomponent';

import SdkEventDispatcher from './Core/SdkEventDispatcher';
import ListenerRegistry from './Core/ListenerRegistry';
import DeskproEventListener from './Core/DeskproEventListener';
import DeskproEventDispatcher from './Core/DeskproEventDispatcher';

import * as SdkEvents from './Core/SdkEvents';
import DpApp from './Core/DpApp';

const sdkEventListenerRegistry = new ListenerRegistry();
const deskproEventDispatcher = new DeskproEventDispatcher(windowProxy);
const dpapp = new DpApp(sdkEventListenerRegistry, deskproEventDispatcher);

const sdkEventDispatcher = new SdkEventDispatcher();
const deskproEventListener = new DeskproEventListener();

// bind deskpro event listener to sdk event dispatcher
SdkEvents.eventNames.forEach(eventName => deskproEventListener.on(eventName)(msg => sdkEventDispatcher.dispatch(eventName, sdkEventListenerRegistry, msg)));

if (xcomponentInstance.isChild()) {
  xcomponentInstance.child().init().then(() => sdkEventDispatcher.dispatch('mount', sdkEventListenerRegistry)).catch();
} else if (Runtime.isBrowser()) {
  windowProxy.onLoad(() => sdkEventDispatcher.dispatch('mount', sdkEventListenerRegistry));
}

export { dpapp };
