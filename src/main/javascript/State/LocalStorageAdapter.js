import { StateStorageAdapter } from './StateStorageAdapter';

export class LocalStorageAdapter extends StateStorageAdapter
{
  constructor (localStorage)
  {
    this.props = {localStorage};
  }

  /**
   * @param {Promise} dispatchPromise
   * @param {Array<Array>} nameValuePairsList
   * @param entityId
   * @return {Promise}
   */
  handleSetBatchState = (dispatchPromise, nameValuePairsList, entityId) =>
  {
    const { localStorage } = this.props;
    dispatchPromise.then((props) => {

      nameValuePairsList
        .map((nameAndValue) => {
          const [name, value] = nameAndValue;
          return [`apps/${props.instanceId}/state/${entityId}/${name}`, value]
        })
        .forEach((keyAndValue) => {
          const [key, value] = keyAndValue;
          localStorage.setItem(key, value);
        })
      ;

      return nameValuePairsList;
    });
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
    const { localStorage } = this.props;
    dispatchPromise.then((props) => {
      const key = `apps/${props.instanceId}/state/${entityId}/${name}`;

      if (! value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }

      return value;
    });
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
    const { localStorage } = this.props;

    dispatchPromise.then((props) => {
      const key = `apps/${props.instanceId}/state/${entityId}/${name}`;
      const value = localStorage.getItem(key);

      if (value) {
        return value;
      }

      return defaultValue;
    });
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
    const { localStorage } = this.props;

    dispatchPromise.then((props) => {
      return nameList
        .map((name) => [name, `apps/${props.instanceId}/state/${entityId}/${name}`])
        .reduce(
          (values, nameAndKey) => {
            const [name, key] = nameAndKey;
            values[name] = localStorage.getItem(key);
            return values;
          },
          {}
        );
    });
  };
}