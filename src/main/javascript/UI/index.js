import * as UIEvents from './Events';
export { UIEvents }

import UI from './UI';

/**
 * @param {EventEmitter} eventDispatcher
 */
export const create = eventDispatcher => new UI(eventDispatcher);