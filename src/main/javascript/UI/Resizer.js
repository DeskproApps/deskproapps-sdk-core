/**
 * UI/Resizer module.
 * @module UI/Resizer
 */

import { EVENT_RESET_SIZE } from '../Core/AppEvents';
import { emitAsync } from '../Core/EventDispatcher';

/**
 * @method
 *
 * @param {EventDispatcher}  outgoingDispatcher
 * @param {WidgetWindowBridge} windowProxy
 * @return {function}
 */
export const createResizer = (outgoingDispatcher, windowProxy) => (onResize) =>
{
  const cb = typeof onResize === 'function' ? onResize : (x) => x;

  emitAsync(outgoingDispatcher)
    .then((emit) => emit(EVENT_RESET_SIZE, { size: windowProxy.bodySize }))
    .then(({ height }) => cb({ height }))
  ;
};
