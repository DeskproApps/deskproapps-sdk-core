
class ContextObject
{
  /**
   * @param {Function} propertyProvider
   * @param {String} type the context type
   * @param {String} entityId the id of the Deskpro Entity referenced by this context
   * @param {CustomFieldsClient} [customFields] A client for the `CustomFields` API of this Deskpro Object, if supported
   * @param {...*} rest
   * @constructor
   */
  constructor({ propertyProvider, type, entityId, customFields, ...rest }) {
    this.props = { propertyProvider, type, entityId, customFields, ...rest }
  }

  /**
   * Retrieves the value of a custom field field from this object is supported
   *
   * @param {String} id
   * @param {*} defaultValue
   * @return {Promise<String|null|Array<String|null>, Error>}
   */
  async getCustomField(id, defaultValue = null)
  {
    const { customFields } = this.props;

    if (! customFields) {
      return Promise.reject(new Error('this object does not support custom fields'))
    }

    return customFields.getField(id, defaultValue);
  }

  /**
   * A client for the `CustomFields` API of this context
   * This property is null when the object does not support custom fields
   *
   * @public
   * @return {CustomFieldsClient|null}
   */
  get customFields() {
    if (! this.props.customFields) {
      return null;
    }

    return this.props.customFields;
  }

  /**
   * Retrieves a property from this object
   *
   * @param {String} [property]
   * @return {Promise<*>}
   */
  async get(property)
  {
    if (property && typeof property !== 'string') {
      return Promise.reject(new Error('property must be a string'));
    }

    const path = property ? property.split('.') : [];
    return this.props.propertyProvider({ path, type: this.props.type });
  }

  /**
   * The type of this context
   *
   * @public
   * @return {String}
   */
  get type() { return this.props.type.toString(); }

  /**
   * The id of the Deskpro Entity which belongs to this context.
   *
   * For example if the `type` is `ticket`, then this is the id of `Ticket` Entity
   *
   * @public
   * @return {String}
   */
  get id() { return this.props.entityId.toString(); }
}

export default ContextObject