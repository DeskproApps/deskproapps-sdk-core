import * as UIEvents from './Events';
export { UIEvents }

import * as UIConstants from './Constants';
export { UIConstants }

import { UIFacade } from './UIFacade';

/**
 * @param {EventEmitter} eventDispatcher
 * @return {UIFacade}
 */
export const create = eventDispatcher => new UIFacade(eventDispatcher);