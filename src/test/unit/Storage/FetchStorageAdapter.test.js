import { StorageApiFacade } from '../../../main/javascript/Storage/StorageApiFacade';
import { FetchStorageAdapter } from '../../../main/javascript/Storage/FetchStorageAdapter';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'
import { WebAPIEvents } from '../../../main/javascript/WebAPI';


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

describe('FetchStorageAdapter', () => {

  const outgoingDispatcher = new EventDispatcher();
  const internalDispatcher = new EventDispatcher();
  const storageAdapter     = new FetchStorageAdapter();

  test('handleSetBatchStorage sends the expected batch request representation', () => {

    let actualRequest;

    const expectedRequest = {
      url: 'batch',
      init: {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: {
            key1: {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              url: "apps/1/state/2/key1",
              body: JSON.stringify({value: "value-1"})
            },
            key2: {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              url: "apps/1/state/2/key2",
              body: JSON.stringify({value: "value-2"})
            }
          }
        })
      }
    };

    let response = {
        body: {
          responses: {
            key1: {
              value: 'expected-value-1',
              headers: {
                'status-code': 200
              }
            },
            key2: {
              value: 'expected-value-2',
              headers: {
                'status-code': 200
              }
            }
          }
        }
      }
      ;

    const batch = [
      ["key1", "value-1"],
      ["key2", "value-2"]
    ];

    const outgoingDispatcher = new EventDispatcher();
    outgoingDispatcher.addListener(
      WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH,
      (resolve, reject, data) => {
        actualRequest = data;
        resolve(response)
    });

    return storageAdapter
      .handleSetBatchStorage(Promise.resolve({
        outgoingDispatcher,
        instanceId: 1
      }), batch, 2)
      .then(data => {
        expect(data).toEqual([]);
        expect(actualRequest.init.body).toEqual(expectedRequest.init.body);
      })
    ;

  });

});

