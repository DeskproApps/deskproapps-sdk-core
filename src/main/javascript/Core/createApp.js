import { isBrowser } from './utils';

import { windowProxy } from './Window';

import { InternalEventDispatcher, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';

import { registerEventHandlers as registerStateEventHandlers, StateApiFacade } from '../State';

import { registerEventHandlers as registerAppEventHandlers } from './AppEventHandlers';
import { registerEventHandlers as registerContextEventHandlers } from './ContextEventHandlers';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerEventHandlers as registerTicketEventHandlers } from '../Context/TicketEventHandlers';
import { registerEventHandlers as registerDeskproWindowEventHandlers } from '../DeskproWindow';

import App from './App';

import { create } from '../../../xcomponent';
import { InstanceProps, ContextProps } from './AppProps';

//register event listeners
[
  registerStateEventHandlers,
  registerAppEventHandlers,
  registerContextEventHandlers,
  registerWebAPIEventHandlers,
  registerDeskproWindowEventHandlers,
  registerTicketEventHandlers
].forEach(registrar => registrar(IncomingEventDispatcher, OutgoingEventDispatcher));

/**
 * @param {InitProps} initParams
 * @return {{dimensions: {width: string, height: string}, props: {widgetId: {type: string, required: boolean}, appId: {type: string, required: boolean}, appTitle: {type: string, required: boolean}, appPackageName: {type: string, required: boolean}, instanceId: {type: string, required: boolean}, onDpMessage: {type: string, required: boolean}}, scrolling: boolean, autoResize: boolean, tag: *, url: string}}
 */
const getXcomponentOptions = initParams => {

  return {
    scrolling: false,
    tag: initParams.dpXconfTag, //needs to match xcomponent config on the parent
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

      instanceProps: {
        type:     'object',
        required: true
      },

      contextProps: {
        type:     'object',
        required: true
      }
    }
  };
};

/**
 * Creates an application using the keys defined on the props object
 *
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
    windowProxy
  };

  return new App(appProps);
};

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const xcomponentOptions = getXcomponentOptions(windowProxy.initParams);
  const xcomponent = create(xcomponentOptions);

  if (xcomponent.isChild()) {
      xcomponent.child().init().then(xchild => {

        const {instanceProps, contextProps} = xchild.props;
        const app = createAppFromProps({instanceProps, contextProps});

        // register the app with the resize listener
        windowProxy.addEventListener('bodyResize', () => app.ui.resetSize());
        windowProxy.addEventListener('load', () => cb(app));
      }).catch();
  } else if (isBrowser()) { // TODO this is clearly not going to work so the scenario where the app can run without xcomponent needs rethinking
      windowProxy.addEventListener('load', () => cb(app));
  }
};

export default createApp;
