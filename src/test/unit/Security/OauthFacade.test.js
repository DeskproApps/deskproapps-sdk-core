import OauthFacade from '../../../main/javascript/Security/OauthFacade'
import { EVENT_SECURITY_AUTHENTICATE_OAUTH, EVENT_SECURITY_SETTINGS_OAUTH } from '../../../main/javascript/Security/events'

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

describe('OauthFacade', () => {
  "use strict";

  const localStorage       = new LocalStorageAdapter(localStorageMock);

  test('settings: default oauth version is 2.0', done => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_SETTINGS_OAUTH, (resolve, reject, {provider, protocolVersion}) => {

      try {
        expect(protocolVersion).toEqual('2.0');
        resolve({})
      } catch (e) {
        reject(e);
      }

    });

    const storageClient = new StorageApiFacade(
      outgoingDispatcher,
      internalDispatcher,
      localStorage,
      { instanceId: '1', contextEntityType : 'ticket', contextEntityId : '2', appId : '3' }
    );

    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));
    facade.settings('jira')
      .then(() => facade.settings('jira', {}))
      .catch((e) => {
        expect(e).toBeUndefined();
      })
      .then(() => done());
  });

  test('settings: custom oauth version is used', done => {
    const internalDispatcher = new AppEventEmitter();
    const outgoingDispatcher = new AppEventEmitter();
    outgoingDispatcher.on(EVENT_SECURITY_SETTINGS_OAUTH, (resolve, reject, {provider, protocolVersion}) => {

      try {
        expect(protocolVersion).toEqual('1.0');
        resolve({})
      } catch (e) {
        reject(e);
      }

    });

    const storageClient = new StorageApiFacade(
      outgoingDispatcher,
      internalDispatcher,
      localStorage,
      { instanceId: '1', contextEntityType : 'ticket', contextEntityId : '2', appId : '3' }
    );

    const facade  = new OauthFacade(outgoingDispatcher, storageClient.setAppStorage.bind(localStorage));
    facade.settings('jira', { protocolVersion: '1.0' })
      .catch((e) => {
        expect(e).toBeUndefined();
      })
      .then(() => done());
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

});
