import StorageAdapter from './StorageAdapter';

/**
 * Implementation of a storage adapter which uses the browser's LocalStorage API to retrieve items from the storage
 *
 * @class
 */
class LocalStorageAdapter extends StorageAdapter
{
  /**
   * @method
   * @return {LocalStorageAdapter}
   */
  static fromGlobals()
  {
    const {localStorage} = window;
    return new LocalStorageAdapter(localStorage);
  }

  /**
   * @param {Storage} localStorage see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage}
   */
  constructor (localStorage)
  {
    super();
    this.props = { localStorage };
  }

  /**
   * @method
   * @param {Promise.<AppEventEmitter, Error>} dispatchPromise  a promise which resolve with an event dispatcher
   * @param {Array<{name:String, value:*}>} nameValuePairsList
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<Array<{name:String, value:*}>, Error>}
   */
  async handleSetBatchStorage (dispatchPromise, nameValuePairsList, entityId)
  {
    const { localStorage } = this.props;
    return dispatchPromise.then((props) => {

      nameValuePairsList
        .map((nameAndValue) => {
          const [name, value] = nameAndValue;
          return [`apps/${props.instanceId}/state/${entityId}/${name}`, value]
        })
        .forEach((keyAndValue) => {
          const [key, value] = keyAndValue;
          localStorage.setItem(key, JSON.stringify(value));
        })
      ;

      return nameValuePairsList;
    });
  };

  /**
   * @method
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {*} value the value to store, will be `JSON serialized`
   * @param {String} entityId the id of the entity to link the values to
   * @return {Promise<*, Error>}
   */
  async handleSetStorage (dispatchPromise, name, value, entityId)
  {
    const { localStorage } = this.props;
    return dispatchPromise.then((props) => {
      const key = `apps/${props.instanceId}/state/${entityId}/${name}`;

      if (! value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }

      return value;
    });
  };

  /**
   * @method
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {String} name the name under which to store the value
   * @param {String} entityId the id of the entity to link the values to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise<*, Error>}
   */
  async handleGetStorage (dispatchPromise, name, entityId, defaultValue = null)
  {
    const { localStorage } = this.props;

    return dispatchPromise.then((props) => {
      const key = `apps/${props.instanceId}/state/${entityId}/${name}`;
      const value = localStorage.getItem(key);

      if (value) {
        return JSON.parse(value);
      }

      return defaultValue;
    });
  };

  /**
   * @method
   * @param {Promise<AppEventEmitter, Error>} dispatchPromise a promise which resolve with an event dispatcher
   * @param {Array<String>} nameList the list of value names to retrieve
   * @param {String} entityId the id of the entity which the values are linked to
   * @param {*} [defaultValue=null] the value to return if one the the storage items was not found
   * @return {Promise.<Array<*>, Error>}
   */
  async handleGetBatchStorage(dispatchPromise, nameList, entityId, defaultValue = null)
  {
    const { localStorage } = this.props;

    return dispatchPromise.then((props) => {
      return nameList
        .map((name) => [name, `apps/${props.instanceId}/state/${entityId}/${name}`])
        .reduce(
          (values, nameAndKey) => {
            const [name, key] = nameAndKey;
            const value = localStorage.getItem(key);
            if (value) {
              values[name] = JSON.parse(value)
            }
            return values;
          },
          {}
        );
    });
  };
}

export default LocalStorageAdapter