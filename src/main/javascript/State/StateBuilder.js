/**
 * @param {Context} context
 * @return {String}
 */
export const buildScopeTargetForContext = context => [context.type, context.entityId].join(':');

/**
 * @param {String} scopeTarget
 * @return {String}
 */
export const buildSharedScope = ({ scopeTarget }) => ['shared', scopeTarget].join('.');

/**
 * @param {String} scopeTarget
 * @return {String}
 */
export const buildPrivateScope = ({ scopeTarget }) => ['private', scopeTarget].join('.');
