import { WebAPIEvents } from '../WebAPI';
import StorageAdapter from './StorageAdapter';

/**
 * Implementation of a storage adapter which uses the Deskpro API to retrieve items from the storage
 *
 * @class
 */
class FetchStorageAdapter extends StorageAdapter
{
  /**
   * @method
   *
   * @param {Promise.<AppEventEmitter, Error>} dispatchPromise  a promise which resolve with an event dispatcher
   * @param {Array<{name:String, value:*}>} nameValuePairsList
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<Array<{name:String, value:*}>, Error>}
   */
  async handleSetBatchStorage (dispatchPromise, nameValuePairsList, entityId)
  {
    const buildRequestBody = (instanceId, body, nameAndValue) => {
      const [name, value] = nameAndValue;

      if (value === null || value === undefined) {
        body[name] = {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: `apps/${instanceId}/state/${entityId}/${name}`
        };
      } else {
        body[name] = {
          method: "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          url: `apps/${instanceId}/state/${entityId}/${name}`,
          data: { value }
        };
      }

      return body;
    };

    const parseSaveBatchStatus = (batchResponse) =>
    {
      /**
       * @param result
       * @param response
       * @param name
       * @return {*}
       */
      const reducer = (result, response, name) => {
        result[name] = response.headers['status-code'] === 200;
        return result;
      };
      const { responses } = batchResponse.body;
      return Object.keys(responses).reduce((result, name) => reducer(result, responses[name], name), {});
    };

    /**
     * @return {Array}
     * @param saveBatchResults
     */
    const collectSaveFailures = (saveBatchResults) =>
    {
      const reducer = (failures, nameAndValue) => {
        const [name] = nameAndValue;
        if (! saveBatchResults[name]) {
          failures.push(nameAndValue);
        }

        return failures;
      };
      return nameValuePairsList.reduce(reducer, []);
    };


    return dispatchPromise.then((props) => {
      const url = `batch`;
      const requests = nameValuePairsList.reduce(buildRequestBody.bind(this, props.instanceId), {});

      const init = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requests })
      };
      return props.outgoingDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then(parseSaveBatchStatus)
      .then (collectSaveFailures)
  };

  /**
   * @method
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {*} value the value to store, will be `JSON serialized`
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<*, Error>}
   */
  async handleSetStorage (dispatchPromise, name, value, entityId)
  {
    return dispatchPromise.then((props) => {
      const url = `apps/${props.instanceId}/state/${entityId}/${name}`;

      let init;
      if (value === null || value === undefined) {
        init = {
          method: 'DELETE',
          'Accept': 'application/json'
        };
      } else {
        init = {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({value})
        };
      }

      return props.outgoingDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then(() => value);
  };

  /**
   * @method
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise  a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {String} entityId the id of the entity which the value is linked to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise.<*, Error>}
   */
  async handleGetStorage (dispatchPromise, name, entityId, defaultValue = null)
  {
    return dispatchPromise.then((props) => {
      const url = `apps/${props.instanceId}/state/${entityId}/${name}?options.mode=find`;

      const init = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      };
      return props.outgoingDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then((response) => {
      return response.body && response.body.value ? response.body.value : defaultValue
    })
  };

  /**
   * @method
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {Array<String>} nameList the list of value names to retrieve
   * @param {String} entityId the id of the entity which the values are linked to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise.<Array<*>, Error>}
   */
  async handleGetBatchStorage (dispatchPromise, nameList, entityId, defaultValue = null)
  {
    const buildRequestBody = (instanceId, body, name) => {
      body[name] = `apps/${instanceId}/state/${entityId}/${name}?options.mode=find`;
      return body;
    };

    const parseBatchResponse = (response, result, name) => {
      if (response.headers['status-code'] === 200) {
        result[name] = response.value;
      } else {
        result[name] = defaultValue;
      }
      return result;
    };

    return dispatchPromise.then((props) => {
      const url = `batch`;
      const requests = nameList.reduce((body, name) => buildRequestBody(props.instanceId, body, name), {});

      const init = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requests })
      };
      return props.outgoingDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then((response) => {
      const { responses } = response.body;
      return Object.keys(responses).reduce((result, name) => parseBatchResponse(responses[name], result, name), {});
    })
  };
}

export default FetchStorageAdapter;