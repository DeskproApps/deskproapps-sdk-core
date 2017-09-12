import * as Events from './Events';
import { StorageAdapter } from './StorageAdapter';

const APP_TYPE = 'app';

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
 * @private
 * @ignore
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

/**
 * @class
 */
class StorageApiFacade
{
  /**
   * @param {EventDispatcher} outgoingDispatcher
   * @param {EventDispatcher} internalDispatcher
   * @param {StorageAdapter} storageAdapter
   * @param {String} instanceId
   * @param {String} contextEntityType
   * @param {String} contextEntityId
   * @param {String} appId
   * @param other
   */
  constructor(outgoingDispatcher, internalDispatcher, storageAdapter, { instanceId, contextEntityType, contextEntityId, appId, ...other }) {
    if (! storageAdapter instanceof StorageAdapter) {
      throw new Error('param storageAdapter must be an instance of StorageAdapter');
    }
    this.props = { outgoingDispatcher, internalDispatcher, storageAdapter, instanceId, contextEntityType, contextEntityId, appId, ...other };
  }

  /**
   * @public
   * @method
   *
   * @param args
   * @return {Promise}
   */
  async setStorage(...args) {
    const { storageAdapter } = this.props;

    if (args.length === 3) { //
      const [name, value, entityId] = args;
      if (! validName(name)) {
        throw new Error('Bad method call: name parameter must be a non empty string');
      }

      return storageAdapter.handleSetStorage(Promise.resolve(this.props), name, value, entityId)
        .then((resp) => {
          this.props.internalDispatcher.emit(
            entityId.indexOf(APP_TYPE) === 0 ? Events.EVENT_APP_CHANGED : Events.EVENT_ENTITY_CHANGED,
            name,
            value
          );
          
          return resp;
        });
    }

    if (args.length === 2) {
      const [batch, entityId] = args;
      const batchError = validateNameValuePairsList(batch);
      if (batchError instanceof Error) {
        throw batchError;
      }

      return storageAdapter.handleSetBatchStorage(Promise.resolve(this.props), batch, entityId)
        .then((resp) => {
          this.props.internalDispatcher.emit(
            entityId.indexOf(APP_TYPE) === 0 ? Events.EVENT_APP_CHANGED : Events.EVENT_ENTITY_CHANGED,
            batch
          );
    
          return resp;
        });
    }

    throw new Error(`Bad method call: unknown number of args: ${args.length}`);
  }

  /**
   * @public
   * @method
   *
   * @param args
   * @return {Promise}
   */
  async setAppStorage(...args) {
    const entityId = `${APP_TYPE}:${this.props.appId}`;
    if (args.length == 2) {
      const [ name, value ] = args;
      return this.setStorage(name, value, entityId);
    }

    if (args.length == 1) {
      const [ batch ] = args;
      return this.setStorage(batch, entityId);
    }

    throw new Error(`Bad method call: unknown number of args: ${args.length}`);
  }
  
  /**
   * @deprecated
   * @public
   * @method
   *
   * @param args
   * @return {Promise}
   */
  async setAppState(...args) {
    return this.setAppStorage(...args);
  }

  /**
   * @public
   * @method
   *
   * @return {Promise}
   */
  async setEntityStorage(...args) {
    const entityId = `${this.props.contextEntityType}:${this.props.contextEntityId}`;
    if (args.length == 2) {
      const [ name, value ] = args;
      return this.setStorage(name, value, entityId);
    }

    if (args.length == 1) {
      const [ batch ] = args;
      return this.setStorage(batch, entityId);
    }

    throw new Error(`Bad method call: unknown number of args: ${args.length}`);
  }
  
  /**
   * @deprecated
   * @public
   * @method
   *
   * @return {Promise}
   */
  async setEntityState(...args) {
    return this.setEntityStorage(...args);
  }

  /**
   * @public
   * @method
   *
   * @param {string|Array<string>}name
   * @param {string} entityId
   * @param {*} defaultValue
   * @return {Promise}
   */
  async getStorage(name, entityId, defaultValue = null) {
    const { storageAdapter } = this.props;

    if (validName(name)) {
      return storageAdapter.handleGetStorage(Promise.resolve(this.props), name, entityId, defaultValue || null)
        .then((value) => {
          this.props.internalDispatcher.emit(
            entityId.indexOf(APP_TYPE) === 0 ? Events.EVENT_APP_FETCHED : Events.EVENT_ENTITY_FETCHED,
            name,
            value
          );
    
          return value;
        });
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
      return storageAdapter.handleGetBatchStorage(Promise.resolve(this.props), batch, entityId, defaultValue || null)
        .then((values) => {
          this.props.internalDispatcher.emit(
            entityId.indexOf(APP_TYPE) === 0 ? Events.EVENT_APP_FETCHED : Events.EVENT_ENTITY_FETCHED,
            batch,
            values
          );
    
          return values;
        });
    }

    throw new Error('Bad method call');
  }

  /**
   * @public
   * @method
   *
   * @param name
   * @param defaultValue
   * @return {Promise}
   */
  async getEntityStorage(name, defaultValue = null) {
    const entityId = `${this.props.contextEntityType}:${this.props.contextEntityId}`;
    return this.getStorage(name, entityId, defaultValue);
  }
  
  /**
   * @deprecated
   * @public
   * @method
   *
   * @param name
   * @param defaultValue
   * @return {Promise}
   */
  async getEntityState(name, defaultValue = null) {
    return this.getEntityStorage(name, defaultValue);
  }

  /**
   * @public
   * @method
   *
   * @param name
   * @param defaultValue
   * @return {Promise}
   */
  async getAppStorage(name, defaultValue = null) {
    const entityId = `app:${this.props.appId}`;
    return this.getStorage(name, entityId, defaultValue);
  }
  
  /**
   * @deprecated
   * @public
   * @method
   *
   * @param name
   * @param defaultValue
   * @return {Promise}
   */
  async getAppState(name, defaultValue = null) {
    return this.getAppStorage(name, defaultValue);
  }
}

export {
  StorageApiFacade
};