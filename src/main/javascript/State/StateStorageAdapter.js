export class StateStorageAdapter
{
  /**
   * @param {Promise} dispatchPromise
   * @param {Array<Array>} nameValuePairsList
   * @param entityId
   * @return {Promise}
   */
  handleSetBatchState = (dispatchPromise, nameValuePairsList, entityId) =>
  {
    throw new Error('method must be implemented in a subclass');
  };

  /**
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param value
   * @param entityId
   * @return {Promise}
   */
  handleSetState = (dispatchPromise, name, value, entityId) =>
  {
    throw new Error('method must be implemented in a subclass');
  };

  /**
   * @param {Promise} dispatchPromise
   * @param name
   * @param entityId
   * @param defaultValue
   * @return {Promise.<*>}
   */
  handleGetState = (dispatchPromise, name, entityId, defaultValue = null) =>
  {
    throw new Error('method must be implemented in a subclass');
  };

  /**
   * @param {Promise} dispatchPromise
   * @param {Array<String>} nameList
   * @param {String} entityId
   * @param {*} defaultValue
   * @return {Promise.<{}>}
   */
  handleGetBatchState = (dispatchPromise, nameList, entityId, defaultValue = null) =>
  {
    throw new Error('method must be implemented in a subclass');
  };
}