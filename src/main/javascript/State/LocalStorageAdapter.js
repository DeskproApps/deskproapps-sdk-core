import { StateStorageAdapter } from './StateStorageAdapter';

/**
 * @class
 */
export class LocalStorageAdapter extends StateStorageAdapter
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
   * @param {LocalStorage} localStorage
   */
  constructor (localStorage)
  {
    super();
    this.props = { localStorage };
  }

  /**
   * @method
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<Array>} nameValuePairsList
   * @param entityId
   * @return {Promise}
   */
  async handleSetBatchState (dispatchPromise, nameValuePairsList, entityId)
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
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param value
   * @param entityId
   * @return {Promise}
   */
  async handleSetState (dispatchPromise, name, value, entityId)
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
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param name
   * @param entityId
   * @param defaultValue
   * @return {Promise.<*>}
   */
  async handleGetState (dispatchPromise, name, entityId, defaultValue = null)
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
   * @param {Promise.<{eventDispatcher:EventDispatcher}>} dispatchPromise
   * @param {Array<String>} nameList
   * @param {String} entityId
   * @param {*} defaultValue
   * @return {Promise.<{}>}
   */
  async handleGetBatchState(dispatchPromise, nameList, entityId, defaultValue = null)
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