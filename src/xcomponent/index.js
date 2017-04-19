import * as xcomponent from 'xcomponent/src';

// we're doing this instead of export * from ... because the import rename plugin does not pick up the export * syntax
// and instead we have to use a standalone import statement
export const CONSTANTS = xcomponent.CONSTANTS;
export const create = xcomponent.create;
export const destroyAll = xcomponent.destroyAll;
export const getByTag = xcomponent.getByTag;
export const IntegrationError = xcomponent.IntegrationError;
export const PopupOpenError = xcomponent.PopupOpenError;
export const postRobot = xcomponent.postRobot;