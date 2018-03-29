
class ContextObject
{
  /**
   * @param {String} type the context type
   * @param {String} entityId the id of the Deskpro Entity referenced by this context
   * @param {CustomFieldsClient} [customFields] A client for the `CustomFields` API of this Deskpro Object, if supported
   * @param {...*} rest
   * @constructor
   */
  constructor({ type, entityId, customFields, ...rest }) {
    this.props = { type, entityId, customFields, ...rest }
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