/**
 * Exports application factories
 *
 * @module Core/createApp
 */

import { WidgetFactories } from '../Widget';

import { InternalEventDispatcher, IncomingEventDispatcher, OutgoingEventDispatcher } from './emit';
import { handleInvokeEvents, handleAppEvents } from './EventHandler';

import { registerEventHandlers as registerStorageEventHandlers } from '../Storage';
import { registerEventHandlers as registerSecurityEventHandlers } from '../Security';
import { registerEventHandlers as registerAppEventHandlers } from './AppEvents';
import { registerEventHandlers as registerContextEventHandlers } from './ContextEvents';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerEventHandlers as registerDeskproWindowEventHandlers } from '../DeskproWindow';

import AppClient from './AppClient';

import InstanceProps from './InstanceProps';
import ContextProps from './ContextProps';

/**
 * @ignore
 * @internal
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
const registerAppEventListeners = (windowBridge, app) =>
{
  handleInvokeEvents(windowBridge, app);

  [
    registerSecurityEventHandlers,
    registerStorageEventHandlers,
    registerAppEventHandlers,
    registerContextEventHandlers,
    registerWebAPIEventHandlers,
    registerDeskproWindowEventHandlers,
  ].forEach(registrar => registrar(windowBridge, app, IncomingEventDispatcher, OutgoingEventDispatcher));

  return app;
};

/**
 * Creates an application using the keys defined on the props object
 *
 * @method
 * @param {WidgetWindowBridge} widgetWindow
 * @param {Object} instanceProps
 * @param {Object} contextProps
 * @return {AppClient}
 */
export const createAppFromProps = ({widgetWindow, instanceProps, contextProps}) =>
{
  const appProps = {
    registerEventHandlers: handleAppEvents.bind(null, widgetWindow),
    incomingDispatcher: IncomingEventDispatcher,
    outgoingDispatcher: OutgoingEventDispatcher,
    internalDispatcher: InternalEventDispatcher,
    instanceProps: new InstanceProps(instanceProps),
    contextProps: new ContextProps(contextProps)
  };

  return new AppClient(appProps);
};

/**
 * @function
 * @param {createAppCallback} cb a callback to be invoked after the app is ready
 */
export const createApp = (cb) => {
  const WidgetWindow = WidgetFactories.windowBridgeFromWindow(window);

  WidgetWindow
    .connect(createAppFromProps)
    .then(registerAppEventListeners.bind(null, WidgetWindow))
    .then(cb)
    .catch(err => { cb(err); }); // the error scenario needs re-thinking
};

export default createApp;

/**
 * Event emitter function
 *
 * @callback createAppCallback
 * @param {Error|null} error
 */