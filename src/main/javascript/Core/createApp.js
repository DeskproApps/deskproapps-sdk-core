/**
 * @module Core/createApp
 */

import { WidgetFactories } from '../Widget';

import { InternalEventDispatcher, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';

import { registerEventHandlers as registerStorageEventHandlers } from '../Storage';
import { registerEventHandlers as registerSecurityEventHandlers } from '../Security';
import { registerEventHandlers as registerAppEventHandlers } from './AppEventHandlers';
import { registerEventHandlers as registerContextEventHandlers } from './ContextEventHandlers';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerTicketEventHandlers } from '../Context';
import { registerEventHandlers as registerDeskproWindowEventHandlers } from '../DeskproWindow';

import App from './App';

import { InstanceProps, ContextProps } from './AppProps';

/**
 * @param {WidgetWindowBridge} windowBridge
 * @param {App} app
 */
const registerAppEventListeners = (windowBridge, app) => {
  [
    registerSecurityEventHandlers,
    registerStorageEventHandlers,
    registerAppEventHandlers,
    registerContextEventHandlers,
    registerWebAPIEventHandlers,
    registerDeskproWindowEventHandlers,
    registerTicketEventHandlers
  ].forEach(registrar => registrar(windowBridge, app, IncomingEventDispatcher, OutgoingEventDispatcher));

  return app;
};

/**
 * Creates an application using the keys defined on the props object
 *
 * @method
 * @param {Object} instanceProps
 * @param {Object} contextProps
 * @return {App}
 */
export const createAppFromProps = ({instanceProps, contextProps}) =>
{
  const appProps = {
    incomingDispatcher: IncomingEventDispatcher,
    outgoingDispatcher: OutgoingEventDispatcher,
    internalDispatcher: InternalEventDispatcher,
    instanceProps: new InstanceProps(instanceProps),
    contextProps: new ContextProps(contextProps)
  };

  return new App(appProps);
};

/**
 * @method
 * @param {function} cb
 */
const createApp = (cb) => {
  const WidgetWindow = WidgetFactories.windowBridgeFromWindow(window);

  WidgetWindow
    .connect(createAppFromProps)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(cb)
    .catch(err => { cb(err); }); // the error scenario needs re-thinking
};

export default createApp;
