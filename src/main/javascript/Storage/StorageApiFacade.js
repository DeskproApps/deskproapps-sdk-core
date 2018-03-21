import * as Events from './events';
import StorageAdapter from './StorageAdapter';

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
   * @param {AppEventEmitter} outgoingDispatcher the outgoing event dispatcher
   * @param {AppEventEmitter} internalDispatcher the interval event dispatcher
   * @param {StorageAdapter} storageAdapter a storage adapter
   * @param {String} instanceId the id of this application's instance
   * @param {String} appId the id of this application
   * @param {String} contextEntityType the type of the context entity
   * @param {String} contextEntityId the id of the context entity
   * @param {...*} [other]
   */
  constructor(outgoingDispatcher, internalDispatcher, storageAdapter, { instanceId, appId, contextEntityType, contextEntityId, ...other }) {
    if (! storageAdapter instanceof StorageAdapter) {
      throw new Error('param storageAdapter must be an instance of StorageAdapter');
    }
    this.props = { outgoingDispatcher, internalDispatcher, storageAdapter, instanceId, contextEntityType, contextEntityId, appId, ...other };
  }

  /**
   * Stores a value or a list of values. This method supports the following signatures:
   *
   * - Single item mode
   * ```
   *  setStorage(name:String, value:*, entityId:String): Promise<*,Error>
   * ```
   *
   * - Batch mode
   * ```
   *  setStorage(batch:Array<{name:String, value:*}>, entityId:String): Promise<Array<{name:String, value:*}>,Error>
   * ```
   *
   * See the list of parameters for a description of each one
   *
   * @public
   * @method
   *
   * @param {...*} args
   * @param {string} [args.name] the name under which to store the value
   * @param {string} [args.value] the value to be stored. Will be `JSON serialized`
   * @param {Array<{name:String, value:*}>} [args.batch] a list of name-value pairs for batch processing
   * @param {string} args.entityId the id of the entity to link the values to
   *
   * @return {Promise<Array<{name:String, value:*}>|String,Error>} the list of values which were not saved in batch mode or the saved value in single mode
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
            entityId,
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
            entityId,
            batch
          );
    
          return resp;
        });
    }

    throw new Error(`Bad method call: unknown number of args: ${args.length}`);
  }

  /**
   * Stores a value or a set of values attaching every value to the application. This method supports the following signatures:
   *
   * - Single item mode
   * ```
   *  setAppStorage(name:String, value:*): Promise<*,Error>
   * ```
   *
   * - Batch mode
   * ```
   *  setAppStorage(batch:Array<{name:String, value:*}>): Promise<Array<{name:String, value:*}>,Error>
   * ```
   *
   * See the list of parameters for a description of each one
   *
   * @public
   * @method
   *
   * @param {...*} args
   * @param {string} [args.name] the name under which to store the value
   * @param {string} [args.value] the value to be stored. Will be `JSON serialized`
   * @param {Array<{name:String, value:*}>} [args.batch] a list of name-value pairs for batch processing
   * @return {Promise<Array<{name:String, value:*}>|*,Error>} the list of values which were not saved in batch mode or the saved value in single mode
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
   * Stores a value or a set of values attaching every value to the application's context entity. This method supports the following signatures:
   *
   * - Single item mode
   * ```
   *  setEntityStorage(name:String, value:*): Promise<*,Error>
   * ```
   *
   * - Batch mode
   * ```
   *  setEntityStorage(batch:Array<{name:String, value:*}>): Promise<Array<{name:String, value:*}>,Error>
   * ```
   *
   * See the list of parameters for a description of each one
   *
   * @public
   * @method
   *
   * @param {...*} args
   * @param {string} [args.name] the name under which to store the value
   * @param {string} [args.value] the value to be stored. Will be `JSON serialized`
   * @param {Array<{name:String, value:*}>} [args.batch] a list of name-value pairs for batch processing
   * @return {Promise<Array<{name:String, value:*}>|String,Error>} the list of values which were not saved in batch mode or the saved value in single mode
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
   * Retrieves a generic storage item or a list
   *
   * @public
   * @method
   *
   * @param {string|Array<string>} name either one storage item id or a list of ids
   * @param {string} entityId the id of the entity to which the storage item is attached
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise<*|Array<*>, Error>}
   */
  async getStorage(name, entityId, defaultValue = null) {
    const { storageAdapter } = this.props;

    if (validName(name)) {
      return storageAdapter.handleGetStorage(Promise.resolve(this.props), name, entityId, defaultValue || null)
        .then((value) => {
          this.props.internalDispatcher.emit(
            entityId.indexOf(APP_TYPE) === 0 ? Events.EVENT_APP_FETCHED : Events.EVENT_ENTITY_FETCHED,
            entityId,
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
            entityId,
            batch,
            values
          );
    
          return values;
        });
    }

    throw new Error('Bad method call');
  }

  /**
   * Retrieves a storage item attached to the application's context entity
   *
   * @public
   * @method
   *
   * @param {string|Array<string>} name
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise<String|Number|Boolean|Object|null, Error>}
   */
  async getEntityStorage(name, defaultValue = null) {
    const entityId = `${this.props.contextEntityType}:${this.props.contextEntityId}`;
    return this.getStorage(name, entityId, defaultValue);
  }

  /**
   * Retrieves a storage item attached to the application
   *
   * @public
   * @method
   *
   * @param {string|Array<string>} name
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
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
   * @param args
   * @return {Promise}
   */
  async setAppState(...args) {
    return this.setAppStorage(...args);
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
   * @ignore
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
   * @ignore
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

export default StorageApiFacade;
