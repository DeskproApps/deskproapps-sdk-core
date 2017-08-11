/**
 * @module Widget
 */

import { handleOutgoingEvent } from '../Core/EventHandler';

import {WidgetWindowBridge} from './WidgetWindowBridge'
import {WidgetRequest} from './WidgetRequest'
import {WidgetResponse} from './WidgetResponse'
import {WidgetFactories} from './WidgetFactories'

import * as Events from './Events';
import { InitProps } from './InitProps';

export {
  /**
   * @type {WidgetWindowBridge}
   */
  WidgetWindowBridge,

  /**
   * @type {WidgetRequest}
   */
  WidgetRequest,

  /**
   * @type {WidgetResponse}
   */
  WidgetResponse,

  /**
   * @type {WidgetFactories}
   */
  WidgetFactories
};

/**
 * @type {WidgetWindowBridge}
 * @static
 * @member
 */
export const WidgetWindow = new WidgetWindowBridge(window, InitProps.parseFromLocation(window));

/**
 * @method
 * @param {App} app
 */
export const registerEventHandlers = (app) => {
  handleOutgoingEvent(app, Events.EVENT_WINDOW_MOUSEEVENT, Events.props.EVENT_WINDOW_INPUT);
};