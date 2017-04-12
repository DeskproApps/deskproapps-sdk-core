import Runtime from './Runtime';

import { windowProxy } from './Window';
import { xcomponentInstance } from './Xcomponent';

import SdkEventDispatcher from './SdkEventDispatcher';
import ListenerRegistry from './ListenerRegistry';
import DeskproEventListener from './DeskproEventListener';
import DeskproEventDispatcher from './DeskproEventDispatcher';

import * as SdkEvents from './SdkEvents';
import DpApp from './DpApp';

/**
 * bind deskpro event listener to sdk event dispatcher
 *
 * @param {DeskproEventListener} deskproEventListener
 * @param {SdkEventDispatcher} sdkEventDispatcher
 * @param {ListenerRegistry} listenerRegistry
 */
const bindToEvents = (deskproEventListener, sdkEventDispatcher, listenerRegistry) => {
    for (const eventName of SdkEvents.eventNames) {
        deskproEventListener.on(eventName)(msg => sdkEventDispatcher.dispatch(eventName, listenerRegistry, msg))
    }
};

/**
 * @return {Promise.<DpApp>|*}
 */
const connect = () => {
    const sdkEventListenerRegistry = new ListenerRegistry();
    const deskproEventDispatcher = new DeskproEventDispatcher(windowProxy);
    const dpapp = new DpApp(sdkEventListenerRegistry, deskproEventDispatcher);

    const sdkEventDispatcher = new SdkEventDispatcher();
    const deskproEventListener = new DeskproEventListener();
    bindToEvents(deskproEventListener, sdkEventDispatcher, sdkEventListenerRegistry);

    if (xcomponentInstance.isChild()) {
        xcomponentInstance.child().init().then(() => sdkEventDispatcher.dispatch('mount', sdkEventListenerRegistry)).catch();
    } else if (Runtime.isBrowser()) {
        windowProxy.onLoad(() => sdkEventDispatcher.dispatch('mount', sdkEventListenerRegistry));
    }

    return dpapp.onMount().then(() => dpapp);
};

export default connect;
