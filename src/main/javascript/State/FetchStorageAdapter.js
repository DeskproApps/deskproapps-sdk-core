import { WebAPIEvents } from '../WebAPI';
import { StateStorageAdapter } from './StateStorageAdapter';

/**
 * @class
 */
export class FetchAdapter extends StateStorageAdapter
{
  /**
   * @method
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<Array>} nameValuePairsList
   * @param entityId
   * @return {Promise}
   */
  async handleSetBatchState (dispatchPromise, nameValuePairsList, entityId)
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
          body: JSON.stringify({value})
        };
      }

      return body;
    };

    const parseSaveBatchStatus = (batchResponse) =>
    {
      /**
       * @param result
       * @param name
       * @return {*}
       */
      const reducer = (result, name) => {
        const response = batchResponse.body[name];
        result[name] = response.headers.response_code === 200;
        return result;
      };

      return Object.keys(batchResponse.body).reduce(reducer, {});
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
      const body = nameValuePairsList.reduce(buildRequestBody.bind(this, props.instanceId));

      const init = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      return props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then(parseSaveBatchStatus)
      .then (collectSaveFailures)
  };

  /**
   * @method
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param value
   * @param entityId
   * @return {Promise}
   */
  async handleSetState (dispatchPromise, name, value, entityId)
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

      return props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then(() => value);
  };

  /**
   * @method
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param entityId
   * @param defaultValue
   * @return {Promise.<*>}
   */
  async handleGetState (dispatchPromise, name, entityId, defaultValue = null)
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
      return props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then((response) => {
      return response.body && response.body.value ? response.body.value : defaultValue
    })
  };

  /**
   * @method
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<String>} nameList
   * @param {String} entityId
   * @param {*} defaultValue
   * @return {Promise.<{}>}
   */
  async handleGetBatchState (dispatchPromise, nameList, entityId, defaultValue = null)
  {
    const buildRequestBody = (instanceId, body, name) => {
      body[name] = `apps/${instanceId}/state/${entityId}/${name}?options.mode=find`;
      return body;
    };

    const parseBatchResponse = (batchResponse, result, name) => {
      const response = batchResponse.body[name];

      if (response.headers.response_code === 200) {
        result[name] = response.data.value;
      } else {
        result[name] = defaultValue;
      }

      return result;
    };


    return dispatchPromise.then((props) => {
      const url = `batch`;
      const body = nameList.reduce((body, name) => buildRequestBody(props.instanceId, body, name), {});

      const init = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      return props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
    }).then((response) => {
      return Object.keys(response.body).reduce((result, name) => parseBatchResponse(response, result, name), {});
    })
  };
}