import { WebAPIEvents } from '../WebAPI';

const findFieldValue = ({ data: { fields }}, alias, defaultValue) =>
{
  if (!fields || typeof fields !== 'object') {
    return defaultValue;
  }

  const foundFields = Object.keys(fields).map(key => fields[key]).filter(field => {
    if (field && field.aliases instanceof Array) {
      return -1 !== field.aliases.indexOf(alias);
    }
    return false;
  });

  if (1 === foundFields.length) {
    const field = foundFields.pop();
    return field.value;
  }

  return defaultValue;
};

/**
 * @class
 */
export class CustomFieldsClient
{
  /**
   * @param {EventDispatcher} outgoingDispatcher
   * @param {string} instanceId
   * @param {string} endpoint
   */
  constructor({ outgoingDispatcher, instanceId, endpoint })
  {
    console.log(' properties ', { outgoingDispatcher, instanceId, endpoint });
    this.props = { outgoingDispatcher, instanceId, endpoint };
  }

  /**
   * @method
   *
   * @param {string} id
   * @param {*} value
   *
   * @return {Promise.<*>}
   */
  async setField(id, value)
  {
    const { outgoingDispatcher, endpoint:url } = this.props;

    const body = {
      fields: {
        [id]: value
      }
    };

    const init = {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return outgoingDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init });
  }

  /**
   * @param {String} id
   * @param {*} defaultValue
   * @return {Promise.<*>}
   */
  async getField(id, defaultValue = null)
  {
    const { outgoingDispatcher, endpoint:url } = this.props;
    const init = {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };

    return outgoingDispatcher
      .emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init })
      .then(({status, body}) => status === 'success' ? findFieldValue(body, id, defaultValue) : defaultValue)
    ;
  }

  /**
   * @param {string} alias
   * @param {*} value
   * @return {Promise.<*>}
   */
  async setAppField(alias, value)
  {
    const fieldId = `app:${this.props.instanceId}:${alias}`;
    return this.setField(fieldId, value);
  }

  /**
   * @param {string} alias
   * @param {*} defaultValue
   *
   * @return {Promise.<*>}
   */
  async getAppField(alias, defaultValue = null)
  {
    const fieldId = `app:${this.props.instanceId}:${alias}`;
    return this.getField(fieldId, defaultValue);
  }
}