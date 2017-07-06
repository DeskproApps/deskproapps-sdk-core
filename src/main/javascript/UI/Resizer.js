import { EVENT_RESET_SIZE } from '../Core/AppEvents';

/**
 * @param {EventDispatcher}  outgoingDispatcher
 * @param {WindowProxy} windowProxy
 */
export const createEventEmittingResize = (outgoingDispatcher, windowProxy) => (onResize) =>
{
  return outgoingDispatcher.emitAsync(EVENT_RESET_SIZE, { size: windowProxy.bodySize })
    .then( ({ height }) => onResize({ height }) )
  ;
};



x(ev).then(dispatch => dispatch(a, b, c)).then()