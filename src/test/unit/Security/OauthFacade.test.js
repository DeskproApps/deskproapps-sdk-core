import { OauthFacade } from '../../../main/javascript/Security/OauthFacade'
import { EVENT_SECURITY_AUTHENTICATE_OAUTH, EVENT_SECURITY_SETTINGS_OAUTH } from '../../../main/javascript/Security/Events'

import { LocalStorageAdapter } from '../../../main/javascript/Storage/LocalStorageAdapter'
import { StorageApiFacade } from '../../../main/javascript/Storage/StorageApiFacade'
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'


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
    const internalDispatcher = new EventDispatcher();
    const outgoingDispatcher = new EventDispatcher();
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
    const internalDispatcher = new EventDispatcher();
    const outgoingDispatcher = new EventDispatcher();
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

});
