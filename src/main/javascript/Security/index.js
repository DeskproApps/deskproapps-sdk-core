import * as SecurityEvents from './Events';
import { OauthFacade } from './OauthFacade';
export { SecurityEvents };
export { OauthToken }  from './OauthToken';
export { registerEventHandlers } from './EventHandlers';

import { createStateAPIClient } from '../State';

export const createOauthAPIClient = (eventDispatcher, instanceProps, contextProps) => {
  const stateClient = createStateAPIClient(eventDispatcher, instanceProps, contextProps);
  const setState = stateClient.setAppState.bind(stateClient);

  return new OauthFacade(eventDispatcher, setState);
};