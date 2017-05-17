import UI from './UI';

/**
 * @param {EventEmitter} eventDispatcher
 */
export const createUI = eventDispatcher => new UI(eventDispatcher);