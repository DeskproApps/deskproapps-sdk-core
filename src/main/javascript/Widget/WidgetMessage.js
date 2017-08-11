import { PropertyBag } from '../Core/PropertyBag';

/**
 * @class
 */
export class WidgetMessage extends PropertyBag
{
  /**
   * @readonly
   *
   * @type {String}
   */
  get id() { return this.props.id };

  /**
   * @readonly
   *
   * @type {String}
   */
  get widgetId() { return this.props.widgetId };

  /**
   * @readonly
   *
   * @type {String}
   */
  get correlationId() { return this.props.correlationId };

  /**
   * @readonly
   *
   * @type {*}
   */
  get body() { return this.props.body };
}