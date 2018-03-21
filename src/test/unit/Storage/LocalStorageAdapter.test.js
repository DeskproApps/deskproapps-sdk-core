import StorageApiFacade from '../../../main/javascript/Storage/StorageApiFacade';
import LocalStorageAdapter from '../../../main/javascript/Storage/LocalStorageAdapter';
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

describe('LocalStorageAdapter', () => {

  const params = {
    appId:              '1',
    instanceId:         '1',
    contextEntityType:  '2',
    contextEntityId:    '2'
  };
  
  const outgoingDispatcher = new AppEventEmitter();
  const internalDispatcher = new AppEventEmitter();
  const localStorage       = new LocalStorageAdapter(localStorageMock);
  const storage            = new StorageApiFacade(outgoingDispatcher, internalDispatcher, localStorage, params);
  
  test('get from app storage', () => {
    const value = { testing: true };
    localStorageMock.clear();
    localStorageMock.setItem('apps/1/state/app:1/auth', JSON.stringify(value));
    
    return storage.getAppStorage('auth')
      .then((data) => {
        expect(localStorageMock.lastGetKey).toEqual('apps/1/state/app:1/auth');
        return data;
      })
      .then(data => expect(data).toEqual(value));
  });
  
  test('set app storage', () => {
    const value = { testing: true };
    return storage.setAppStorage('auth', value)
      .then((data) => {
        expect(localStorageMock.lastSetKey).toEqual('apps/1/state/app:1/auth');
        return data;
      })
      .then(data => expect(data).toEqual(value));
  });
  
  test('set and get app storage', () => {
    localStorageMock.clear();
    const value = { testing: true };
    
    return storage.setAppStorage('auth', value)
      .then((data) => {
        expect(localStorageMock.lastSetKey).toEqual('apps/1/state/app:1/auth');
        return data;
      })
      .then((data) => {
          expect(data).toEqual(value);
      })
      .then(() => {
        return storage.getAppStorage('auth')
          .then((data) => {
            expect(localStorageMock.lastGetKey).toEqual('apps/1/state/app:1/auth');
            return data;
          })
          .then(data => expect(data).toEqual(value));
      });
  });
  
  test('get from entity storage', () => {
    const value = { testing: true };
    localStorageMock.clear();
    localStorageMock.setItem('apps/1/state/2:2/auth', JSON.stringify(value));
    
    return storage.getEntityStorage('auth')
      .then((data) => {
        expect(localStorageMock.lastGetKey).toEqual('apps/1/state/2:2/auth');
        return data;
      })
      .then(data => expect(data).toEqual(value));
  });
  
  test('set entity storage', () => {
    const value = { testing: true };
    return storage.setEntityStorage('auth', value)
      .then((data) => {
        expect(localStorageMock.lastSetKey).toEqual('apps/1/state/2:2/auth');
        return data;
      })
      .then(data => expect(data).toEqual(value));
  });
  
  test('set and get entity storage', () => {
    localStorageMock.clear();
    const value = { testing: true };
    
    return storage.setEntityStorage('auth', value)
      .then((data) => {
        expect(localStorageMock.lastSetKey).toEqual('apps/1/state/2:2/auth');
        return data;
      })
      .then((data) => {
        expect(data).toEqual(value);
      })
      .then(() => {
        return storage.getEntityStorage('auth')
          .then((data) => {
            expect(localStorageMock.lastGetKey).toEqual('apps/1/state/2:2/auth');
            return data;
          })
          .then(data => expect(data).toEqual(value));
      });
  });
});

