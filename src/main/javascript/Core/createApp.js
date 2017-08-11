/**
 * @module Core/createApp
 */

import { WidgetWindow } from '../Widget';

import { InternalEventDispatcher, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';

import { registerEventHandlers as registerStateEventHandlers } from '../State';
import { registerEventHandlers as registerSecurityEventHandlers } from '../Security';
import { registerEventHandlers as registerAppEventHandlers } from './AppEventHandlers';
import { registerEventHandlers as registerContextEventHandlers } from './ContextEventHandlers';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerTicketEventHandlers } from '../Context';
import { registerEventHandlers as registerDeskproWindowEventHandlers } from '../DeskproWindow';
import { registerEventHandlers as registerWindowEventHandlers } from '../Window';

import App from './App';

import { InstanceProps, ContextProps } from './AppProps';

/**
 * @param {App} app
 */
const registerAppEventListeners = (app) => {
  [
    registerSecurityEventHandlers,
    registerStateEventHandlers,
    registerAppEventHandlers,
    registerContextEventHandlers,
    registerWebAPIEventHandlers,
    registerDeskproWindowEventHandlers,
    registerTicketEventHandlers,
    registerWindowEventHandlers
  ].forEach(registrar => registrar(app, IncomingEventDispatcher, OutgoingEventDispatcher));

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
    contextProps: new ContextProps(contextProps),
    appWindow: WidgetWindow
  };

  return new App(appProps);
};

/**
 * @method
 * @param {function} cb
 */
const createApp = (cb) => {
  WidgetWindow
    .connect(createAppFromProps)
    .then(registerAppEventListeners)
    .then(cb)
    .catch(err => { cb(null); }); // the scenario where the app can run without xcomponent needs rethinking
};

export default createApp;
