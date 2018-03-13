/**
 * The interface for a storage adapter
 *
 * @class
 * @abstract
 */
class StorageAdapter
{
  // noinspection JSMethodCanBeStatic
  /**
   * Stores a list of values
   *
   * @public
   * @virtual
   * @method
   *
   * @param {Promise.<AppEventEmitter, Error>} dispatchPromise  a promise which resolve with an event dispatcher
   * @param {Array<{name:String, value:*}>} nameValuePairsList
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<Array<{name:String, value:*}>, Error>}
   */
  async handleSetBatchStorage(dispatchPromise, nameValuePairsList, entityId)
  {
    throw new Error('method must be implemented in a subclass');
  };

  // noinspection JSMethodCanBeStatic
  /**
   * Stores a single value
   *
   * @public
   * @method
   * @virtual
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {*} value the value to store, will be `JSON serialized`
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<*, Error>}
   */
  async handleSetStorage(dispatchPromise, name, value, entityId)
  {
    throw new Error('method must be implemented in a subclass');
  };

  // noinspection JSMethodCanBeStatic
  /**
   * Retrieves a single value
   *
   * @public
   * @method
   * @virtual
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise  a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {String} entityId the id of the entity which the value is linked to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise.<*, Error>}
   */
  async handleGetStorage(dispatchPromise, name, entityId, defaultValue = null)
  {
    throw new Error('method must be implemented in a subclass');
  };

  /**
   * Retrieves a list of values
   *
   * @public
   * @method
   * @virtual
   *
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {Array<String>} nameList the list of value names to retrieve
   * @param {String} entityId the id of the entity which the values are linked to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise.<Array<*>, Error>}
   */
  async handleGetBatchStorage(dispatchPromise, nameList, entityId, defaultValue = null)
  {
    throw new Error('method must be implemented in a subclass');
  };
}

export default StorageAdapter;