import { WebAPIEvents } from '../WebAPI';

/**
 * @ignore
 * @param {Object} fields
 * @param {string} alias
 * @param {*} defaultValue
 * @returns {*}
 */
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
 * An API client that enables reading or writing the values of custom fields
 *
 * @class
 */
class CustomFieldsClient
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher the outgoing events dispatcher
   * @param {string} instanceId this application's instance id
   * @param {string} endpoint Deskpro API endpoint for the custom fields resource
   */
  constructor({ outgoingDispatcher, instanceId, endpoint })
  {
    this.props = { outgoingDispatcher, instanceId, endpoint };
  }

  /**
   * Set the value of a field
   *
   * @method
   *
   * @param {string} id
   * @param {String|Number|Array<String|Number>} value
   *
   * @return {Promise.<DeskproAPIResponse, Error>}
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
   * Retrieves the value of a field
   *
   * @param {String} id
   * @param {*} defaultValue
   * @return {Promise.<String|null|Array<String|null>, Error>}
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
   * Sets the value of a field which is specifically linked to this application. Such fields include those created
   * when the application was installed
   *
   * @param {string} alias
   * @param {*} value
   * @return {Promise.<DeskproAPIResponse, Error>}
   */
  async setAppField(alias, value)
  {
    const fieldId = `app:${this.props.instanceId}:${alias}`;
    return this.setField(fieldId, value);
  }

  /**
   * Returns the value of a field which is referenced by this application. Such fields include those created
   * when the application was installed
   *
   * @param {string} alias
   * @param {*} defaultValue
   *
   * @return {Promise.<String|null|Array<String|null>, Error>}
   */
  async getAppField(alias, defaultValue = null)
  {
    const fieldId = `app:${this.props.instanceId}:${alias}`;
    return this.getField(fieldId, defaultValue);
  }
}

export default CustomFieldsClient;