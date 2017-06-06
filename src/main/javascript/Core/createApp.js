import { isBrowser } from './utils';

import { windowProxy } from './Window';

import { InternalEventDispatcher, IncomingEventDispatcher, OutgoingEventDispatcher } from './EventDispatcher';

import { registerEventHandlers as registerStateEventHandlers, StateApiFacade } from '../State';

import { registerEventHandlers as registerAppEventHandlers } from './AppEventHandlers';
import { registerEventHandlers as registerContextEventHandlers } from './ContextEventHandlers';
import { registerEventHandlers as registerWebAPIEventHandlers } from '../WebAPI';
import { registerEventHandlers as registerTicketEventHandlers } from '../Context/TicketEventHandlers';

import App from './App';

import { create } from '../../../xcomponent';
import { InstanceProps, ContextProps } from './Props';

//register event listeners
[
  registerStateEventHandlers,
  registerAppEventHandlers,
  registerContextEventHandlers,
  registerWebAPIEventHandlers,

  registerTicketEventHandlers
].forEach(registrar => registrar(IncomingEventDispatcher, OutgoingEventDispatcher));

/**
 * @param dpParams
 * @return {{dimensions: {width: string, height: string}, props: {widgetId: {type: string, required: boolean}, appId: {type: string, required: boolean}, appTitle: {type: string, required: boolean}, appPackageName: {type: string, required: boolean}, instanceId: {type: string, required: boolean}, onDpMessage: {type: string, required: boolean}}, scrolling: boolean, autoResize: boolean, tag: *, url: string}}
 */
const getXcomponentOptions = (dpParams) => {

  return {
    scrolling: false,
    tag: dpParams['dp.xconf.tag'], //needs to match xcomponent config on the parent
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

      // INSTANCE PROPERTIES

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

      // CONTEXT PROPERTIES

      contextType: {
        type: 'string',
        required: true
      },

      contextEntityId: {
        type: 'string',
        required: true
      },

      contextLocationId: {
        type: 'string',
        required: true
      },

      contextTabId: {
        type: 'string',
        required: true
      }
    }
  };
};

/**
 * @param xchild
 * @return {InstanceProps}
 */
const extractInstancePropsFromXChild = xchild => new InstanceProps(xchild.props);

/**
 * @param xchild
 * @return {ContextProps}
 */
const extractContextPropsFromXChild = xchild => {
  const { props } = xchild;
  const { contextType: type, contextEntityId: entityId, contextLocationId: locationId, contextTabId: tabId } = props;
  return new ContextProps({ type, entityId, locationId, tabId });
};

/**
 * @param {function} cb
 */
const createApp = (cb) => {
  const xcomponentOptions = getXcomponentOptions(windowProxy.dpParams);
  const xcomponent = create(xcomponentOptions);

  if (xcomponent.isChild()) {
      xcomponent.child().init().then(xchild => {

        const props = {
          incomingDispatcher: IncomingEventDispatcher,
          outgoingDispatcher: OutgoingEventDispatcher,
          internalDispatcher: InternalEventDispatcher,
          instanceProps: extractInstancePropsFromXChild(xchild),
          contextProps: extractContextPropsFromXChild(xchild),
          windowProxy
        };

        const app = new App(props);
        // register the app with the resize listener
        windowProxy.addEventListener('bodyResize', () => app.resetSize());
        windowProxy.addEventListener('load', () => cb(app));
      }).catch();
  } else if (isBrowser()) {
      windowProxy.addEventListener('load', () => cb(app));
  }
};

export default createApp;
