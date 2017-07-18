import { WebAPIEvents } from '../WebAPI';

/**
 * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
 * @param {Array<Array>} nameValuePairsList
 * @param entityId
 */
const handleSetBatchState = (dispatchPromise, nameValuePairsList, entityId) => {

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
        body: JSON.stringify(value)
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
  const collectSaveFailures = (saveBatchResults) => {

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
 * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
 * @param name
 * @param value
 * @param entityId
 */
const handleSetState = (dispatchPromise, name, value, entityId) =>
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
        body: JSON.stringify(value)
      };
    }

    return props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
  }).then(() => value);
};

/**
 * @param {Promise.<EventDispatcher>} dispatchPromise
 * @param name
 * @param entityId
 * @param defaultValue
 * @return {Promise.<*>}
 */
const handleGetState = (dispatchPromise, name, entityId, defaultValue = null) =>
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
    return response.body ? response.body : defaultValue
  })

};

/**
 * @param {Promise} dispatchPromise
 * @param {Array<String>} nameList
 * @param {String} entityId
 * @param {*} defaultValue
 * @return {Promise.<{}>}
 */
const handleGetBatchState = (dispatchPromise, nameList, entityId, defaultValue = null) => {

  const buildRequestBody = (instanceId, body, name) => {
    body[name] = `apps/${instanceId}/state/${entityId}/${name}?options.mode=find`;
    return body;
  };

  const parseBatchResponse = (batchResponse, result, name) => {
    const response = batchResponse.body[name];

    if (response.headers.response_code === 200) {
      result[name] = response.data;
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

const validName = (nameString) => typeof nameString === 'string' && nameString.length > 0;

const validNameValuePair = (nameAndValue) => {
  let isValid = false;

  if (nameAndValue instanceof Array && nameAndValue.length >= 2) {
    const [name] = nameAndValue;
    isValid = validName(name);
  }

  return isValid
};

class StateApiFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {String} instanceId
   * @param {String} entityType
   * @param {String} entityId
   */
  constructor(eventDispatcher, { instanceId, entityType, entityId }) {
    this.props = { eventDispatcher, instanceId, entityType, entityId };
  }

  setState(...args) {

    /**
     * @param batch
     * @return {Error|null}
     */
    const validateBatch = (batch) => {
      if (! batch instanceof Array || batch.length === 0) {
        return new Error('In batch mode, the first parameter must be a non-empty Array');
      }

      const invalidPairs = batch.filter((nameAndValue) => !validNameValuePair(nameAndValue));
      if (invalidPairs.length) {
        return new Error('Bad method call: some of the name and value pairs were invalid. A name-value pair should have a non empty name and a value');
      }

      return null;
    };

    if (args.length === 4) { //
      const [name, value, entityId, options] = args;
      if (! validName(name)) {
        throw new Error('Bad method call: name parameter must be a non empty string');
      }
      return handleSetState(Promise.resolve(this.props), name, value, entityId);
    }

    if (args.length === 2) {
      const [batch, entityId] = args;
      const batchError = validateBatch(batch);
      if (batchError instanceof Error) {
        throw batchError;
      }

      return handleSetBatchState(Promise.resolve(this.props), batch, entityId);
    }

    if (args.length == 3 && args[0] instanceof Array && typeof args[1] === 'string' && typeof args[2] === 'object') {
      const [name, value, entityId] = args;
      if (name ) {
        const batchError = validateBatch(name);
        if (batchError instanceof Error) {
          throw batchError;
        }

        return handleSetBatchState(Promise.resolve(this.props), name, value);
      }
    }

    if (args.length == 3 && typeof args[0] === 'string' && typeof args[2] === 'object') {
      const [name, value, entityId] = args;
      if (! validName(name)) {
        throw new Error('Bad method call: name parameter must be a non empty string');
      }
      return handleSetState(Promise.resolve(this.props), name, value, entityId);
    }

    throw new Error('Bad method call');
  }

  setAppState(...args) {
    const entityId = `app:${this.props.appId}`;
    if (args.length == 3) {
      const [ name, value, options ] = args;
      return this.setState(name, value, entityId, options);
    }

    if (args.length == 2 && args[0] instanceof Array ) {
      const [ batch, options ] = args;
      return this.setState(batch, entityId, options);
    }

    if (args.length == 2 && typeof args[0] == 'string' ) {
      const [ name, value ] = args;
      return this.setState(name, value, entityId);
    }

    if (args.length == 1 && typeof args[0] instanceof Array ) {
      const [ batch ] = args;
      return this.setState(batch, entityId);
    }

    throw new Error('Bad method call');
  }

  /**
   * @return {*}
   */
  setEntityState(...args) {
    const entityId = `${this.props.entityType}:${this.props.entityId}`;
    if (args.length == 3) {
      const [ name, value, options ] = args;
      return this.setState(name, value, entityId, options);
    }

    if (args.length == 2 && args[0] instanceof Array ) {
      const [ batch, options ] = args;
      return this.setState(batch, entityId, options);
    }

    if (args.length == 2 && typeof args[0] == 'string' ) {
      const [ name, value ] = args;
      return this.setState(name, value, entityId);
    }

    if (args.length == 1 && typeof args[0] instanceof Array ) {
      const [ batch ] = args;
      return this.setState(batch, entityId);
    }

    throw new Error('Bad method call');
  }

  /**
   * @param {string|Array<string>}name
   * @param {string} entityId
   * @param {*} defaultValue
   * @return {Promise}
   */
  getState(name, entityId, defaultValue = null) {
    if (validName(name)) {
      return handleGetState(Promise.resolve(this.props), name, entityId, defaultValue || null)
    }

    const batch = name;
    if (batch instanceof Array) {
      if (batch.length === 0) {
        throw new Error('In batch mode, the first parameter must be a non-empty Array');
      }

      const invalidName = batch.filter((nameString) => !validName(nameString));
      if (invalidName.length) {
        throw new Error('Bad method call: some names were not syntactically valid');
      }

      return handleGetBatchState(Promise.resolve(this.props), batch, entityId, defaultValue || null)
    }

    throw new Error('Bad method call');
  }

  getEntityState(name, defaultValue = null) {
    const entityId = `${this.props.entityType}:${this.props.entityId}`;
    return this.getState(name, entityId, defaultValue);
  }

  getAppState(name, defaultValue = null) {
    const entityId = `app:${this.props.instanceId}`;
    return this.getState(name, entityId, defaultValue);
  }

}

export { StateApiFacade };