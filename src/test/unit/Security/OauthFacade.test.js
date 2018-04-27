import OauthFacade from '../../../main/javascript/Security/OauthFacade'
import { EVENT_SECURITY_AUTHENTICATE_OAUTH, EVENT_SECURITY_SETTINGS_OAUTH, EVENT_SECURITY_OAUTH_REFRESH } from '../../../main/javascript/Security/events'

import LocalStorageAdapter from '../../../main/javascript/Storage/LocalStorageAdapter'
import StorageApiFacade from '../../../main/javascript/Storage/StorageApiFacade'
import AppEventEmitter from '../../../main/javascript/Core/AppEventEmitter'

const localStorageMock = {
  store: {},
  lastGetKey: null,
  lastSetKey: null,
  lastRemoveKey: null,
  getItem: function(key) {
    this.lastGetKey = key;
    return this.store[key];
  },
  setItem: function(key, value) {
    this.lastSetKey = key;
    this.store[key] = value.toString();
  },
  removeItem: function(key) {
    this.lastRemoveKey = key;
    delete this.store[key];
  },
  clear: function() {
    this.store = {};
  }
};

const localStorage = new LocalStorageAdapter(localStorageMock);

/**
 * Creates a dummy storage api facade
 *
 * @param {AppEventEmitter} outgoingDispatcher
 * @param {AppEventEmitter} internalDispatcher
 * @return {StorageApiFacade}
 */
function createStorageApiFacade(outgoingDispatcher, internalDispatcher)
{
  return new StorageApiFacade(
    outgoingDispatcher,
    internalDispatcher,
    localStorage,
    { instanceId: '1', contextEntityType : 'ticket', contextEntityId : '2', appId : '3' }
  );
}

function createOauth2TokenResponse({protocolVersion, ...rest})
{
  let { body } = rest;
  if (!body || typeof body !== 'object') {
    body = {
      token: {}
    }
  }

  return {
    oauthVersion: protocolVersion,
    body,
    ...rest

  };
}

describe('OauthFacade', () => {
  "use strict";

  const localStorage       = new LocalStorageAdapter(localStorageMock);

  test('settings: default oauth version is 2.0', () => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_SETTINGS_OAUTH, (resolve, reject, {provider, protocolVersion}) => {
      try {
        expect(protocolVersion).toEqual('2.0');
        resolve(createOauth2TokenResponse({ protocolVersion}))
      } catch (e) {
        reject(e);
      }
    });

    const storageClient = createStorageApiFacade(outgoingDispatcher, internalDispatcher);
    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));
    return facade.settings('jira');
  });

  test('settings: custom oauth version is used', () => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_SETTINGS_OAUTH, (resolve, reject, {provider, protocolVersion}) => {

      try {
        expect(protocolVersion).toEqual('1.0');
        resolve(createOauth2TokenResponse({ protocolVersion}))
      } catch (e) {
        reject(e);
      }
    });

    const storageClient = createStorageApiFacade(outgoingDispatcher, internalDispatcher);
    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));
    return facade.settings('jira', { protocolVersion: '1.0' });
  });

  test('register: can register a connection', done => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();

    const setStorage = (storageName, connectionJS) => {
      expect(connectionJS.providerName).toBe('jira');
      expect(connectionJS.customProp).toBe('custom prop');
      expect(storageName).toBe('oauth:jira');
      return Promise.resolve(connectionJS)
    };

    const facade  = new OauthFacade(outgoingDispatcher, setStorage);
    facade.register('jira', {
      urlAuthorize: "http://deskpro-dev/oauth/authorize",
      urlAccessToken: "http://deskpro-dev/oauth/access" ,
      urlResourceOwnerDetails: "http://deskpro-dev/api/v2/me",
      urlRedirect: "http://deskpro-dev/apps/5" ,
      clientId: 'an id',
      clientSecret: 'a secret',
      customProp: 'custom prop'
    }).then(() => done());
  });

  test('requestAccess emits event EVENT_SECURITY_AUTHENTICATE_OAUTH', () => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_AUTHENTICATE_OAUTH, (resolve, reject, {provider, protocolVersion, query}) => {
      try {
        expect(protocolVersion).toEqual('2.0');
        expect(provider).toEqual('jira');
        expect(query).toBeDefined();
        expect(query).toEqual({ refresh_token: "token", random: "param value" });

        resolve(createOauth2TokenResponse({ protocolVersion}))
      } catch (e) {
        reject(e);
      }

    });

    const storageClient = createStorageApiFacade(outgoingDispatcher, internalDispatcher);
    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));

    return facade.requestAccess('jira', { protocolVersion: '2.0', query: { refresh_token: "token", random: "param value" } });
  });

  test('refreshAccess emits event EVENT_SECURITY_OAUTH_REFRESH', () => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_OAUTH_REFRESH, (resolve, reject, {provider, protocolVersion, query}) => {
      try {
        expect(protocolVersion).toEqual('2.0');
        expect(provider).toEqual('jira');
        expect(query).toBeDefined();
        expect(query).toEqual({ refresh_token: "token", random: "param value" });

        resolve(createOauth2TokenResponse({ protocolVersion}))
      } catch (e) {
        reject(e);
      }

    });

    const storageClient = createStorageApiFacade(outgoingDispatcher, internalDispatcher);
    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));

    return facade.refreshAccess('jira', { protocolVersion: '2.0', query: { refresh_token: "token", random: "param value" } });
  })

});
