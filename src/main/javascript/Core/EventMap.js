/**
 * This class provides a way of retrieving and indexing events
 *
 * @class
 */
class EventMap
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
   * Returns the event key given an event name
   *
   * @method
   * @public
   *
   * @param {String} eventName
   * @return {string}
   */
  getEventKey = (eventName) => this.props.map.hasOwnProperty(eventName) ? this.props.map[eventName] : null;

  /**
   * Returns the event properties
   *
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

export default EventMap