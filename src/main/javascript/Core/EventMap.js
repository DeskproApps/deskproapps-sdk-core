/**
 * @class
 */
export class EventMap
{
  constructor ({ map, names, props }) {
    this.props = { map, names, props };
  }

  /**
   * @method
   * @public
   *
   * @param {String} name
   * @return boolean
   */
  isEventName = (name) => this.props.names.indexOf(name) !== -1;

  /**
   * @public
   *
   * @type {Array.<String>}
   */
  get eventNames() { return [].concat(this.props.names); }

  /**
   * @method
   * @public
   *
   * @param {String} eventName
   * @return {string}
   */
  getEventKey = (eventName) => this.props.map.hasOwnProperty(eventName) ? this.props.map[eventName] : null;

  /**
   * @method
   * @public
   *
   * @param eventName
   * @return {*|null}
   */
  getEventProps = eventName => {
    const eventKey = this.getEventKey(eventName);
    if (eventKey && this.props.props.hasOwnProperty(eventKey)) {
      return this.props.props[eventKey];
    }
  }

}