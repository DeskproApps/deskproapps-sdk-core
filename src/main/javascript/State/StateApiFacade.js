import { StateStorageAdapter } from './StorageAdapter';

const validName = (nameString) => typeof nameString === 'string' && nameString.length > 0;

const validNameValuePair = (nameAndValue) => {
  let isValid = false;

  if (nameAndValue instanceof Array && nameAndValue.length >= 2) {
    const [name] = nameAndValue;
    isValid = validName(name);
  }

  return isValid
};

/**
 * @param batch
 * @return {Error|null}
 */
const validateNameValuePairsList = (batch) => {
  if (! batch instanceof Array || batch.length === 0) {
    return new Error('In batch mode, the first parameter must be a non-empty Array');
  }

  const invalidPairs = batch.filter((nameAndValue) => !validNameValuePair(nameAndValue));
  if (invalidPairs.length) {
    return new Error('Bad method call: some of the name and value pairs were invalid. A name-value pair should have a non empty name and a value');
  }

  return null;
};

class StateApiFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {StateStorageAdapter} storageAdapter
   * @param {String} instanceId
   * @param {String} entityType
   * @param {String} entityId
   */
  constructor(eventDispatcher, storageAdapter, { instanceId, entityType, entityId }) {
    this.props = { eventDispatcher, storageAdapter, instanceId, entityType, entityId };
  }

  setState(...args) {

    if (args.length === 4) { //
      const [name, value, entityId, options] = args;
      if (! validName(name)) {
        throw new Error('Bad method call: name parameter must be a non empty string');
      }
      const { storageAdapter } = this;
      return storageAdapter.handleSetState(Promise.resolve(this.props), name, value, entityId);
    }

    if (args.length === 2) {
      const [batch, entityId] = args;
      const batchError = validateNameValuePairsList(batch);
      if (batchError instanceof Error) {
        throw batchError;
      }

      const { storageAdapter } = this;
      return storageAdapter.handleSetBatchState(Promise.resolve(this.props), batch, entityId);
    }

    if (args.length == 3 && args[0] instanceof Array && typeof args[1] === 'string' && typeof args[2] === 'object') {
      const [name, value, entityId] = args;
      if (name ) {
        const batchError = validateNameValuePairsList(name);
        if (batchError instanceof Error) {
          throw batchError;
        }
        const { storageAdapter } = this;
        return storageAdapter.handleSetBatchState(Promise.resolve(this.props), name, value);
      }
    }

    if (args.length == 3 && typeof args[0] === 'string' && typeof args[2] === 'object') {
      const [name, value, entityId] = args;
      if (! validName(name)) {
        throw new Error('Bad method call: name parameter must be a non empty string');
      }

      const { storageAdapter } = this;
      return storageAdapter.handleSetState(Promise.resolve(this.props), name, value, entityId);
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
      const { storageAdapter } = this;
      return storageAdapter.handleGetState(Promise.resolve(this.props), name, entityId, defaultValue || null)
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
      const { storageAdapter } = this;
      return storageAdapter.handleGetBatchState(Promise.resolve(this.props), batch, entityId, defaultValue || null)
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