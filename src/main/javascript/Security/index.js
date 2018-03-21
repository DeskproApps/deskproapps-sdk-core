/**
 * This module exports the interface of the Security package
 *
 * @module Security
 */

import { createStorageAPIClient } from '../Storage';
import { handleOutgoingEvent } from '../Core/EventHandler';

import * as SecurityEvents from './events';
import OauthFacade from './OauthFacade';
import OauthToken from './OauthToken';

export {
  /**
   * @type {module:Security/events}
   */
  SecurityEvents,

  /**
   * @type {OauthToken}
   */
  OauthToken
};

/**
 * Registers the Security events with the event dispatching system
 *
 * @function
 *
 * @param {WidgetWindowBridge} windowBridge
 * @param {AppClient} app
 */
export function registerEventHandlers(windowBridge, app) {
  handleOutgoingEvent(windowBridge, app, SecurityEvents.EVENT_SECURITY_AUTHENTICATE_OAUTH, SecurityEvents.props.EVENT_SECURITY_AUTHENTICATE_OAUTH);
  handleOutgoingEvent(windowBridge, app, SecurityEvents.EVENT_SECURITY_SETTINGS_OAUTH, SecurityEvents.props.EVENT_SECURITY_SETTINGS_OAUTH);
}

/**
 * @function
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} internalDispatcher
 * @param {InstanceProps} instanceProps
 * @param {ContextProps} contextProps
 * @return {OauthFacade}
 */
export function createOauthAPIClient (outgoingDispatcher, internalDispatcher, instanceProps, contextProps) {
  const storageClient = createStorageAPIClient(outgoingDispatcher, internalDispatcher, instanceProps, contextProps);
  const setStorage = storageClient.setAppStorage.bind(storageClient);

  return new OauthFacade(outgoingDispatcher, setStorage);
}