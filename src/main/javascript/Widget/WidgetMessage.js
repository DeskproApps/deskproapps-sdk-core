import { PropertyBag } from '../Core';

/**
 * Represents a message that is exchanged between an application and a third party
 *
 * @class
 * @extends {PropertyBag}
 */
class WidgetMessage extends PropertyBag
{
  /**
   * The message id
   *
   * @readonly
   *
   * @type {String}
   */
  get id() { return this.props.id };

  /**
   * The widget/application id
   * @readonly
   *
   * @type {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * The conversation id
   *
   * @readonly
   *
   * @type {String}
   */
  get correlationId() { return this.props.correlationId };

  /**
   * The message contents
   *
   * @readonly
   *
   * @type {*}
   */
  get body() { return this.props.body };
}

export default WidgetMessage