/**
 * @class
 */
export class StorageAdapter
{
  // noinspection JSMethodCanBeStatic
  /**
   * @public
   * @virtual
   * @method
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<Array>} nameValuePairsList
   * @param entityId
   * @return {Promise}
   */
  async handleSetBatchStorage(dispatchPromise, nameValuePairsList, entityId)
  {
    throw new Error('method must be implemented in a subclass');
  };

  // noinspection JSMethodCanBeStatic
  /**
   * @public
   * @method
   * @virtual
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param value
   * @param entityId
   * @return {Promise}
   */
  async handleSetStorage(dispatchPromise, name, value, entityId)
  {
    throw new Error('method must be implemented in a subclass');
  };

  // noinspection JSMethodCanBeStatic
  /**
   * @public
   * @method
   * @virtual
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param entityId
   * @param defaultValue
   * @return {Promise.<*>}
   */
  async handleGetStorage(dispatchPromise, name, entityId, defaultValue = null)
  {
    throw new Error('method must be implemented in a subclass');
  };

  /**
   * @public
   * @method
   * @virtual
   *
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<String>} nameList
   * @param {String} entityId
   * @param {*} defaultValue
   * @return {Promise.<{}>}
   */
  async handleGetBatchStorage(dispatchPromise, nameList, entityId, defaultValue = null)
  {
    throw new Error('method must be implemented in a subclass');
  };
}