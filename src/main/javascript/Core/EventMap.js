export class EventMap
{
  constructor ({ map, names, props }) {
    this.props = { map, names, props };
  }

  /**
   * @param {String} name
   * @return boolean
   */
  isEventName = (name) => this.props.names.indexOf(name) !== -1;

  /**
   * @return {Array.<String>}
   */
  get eventNames() { return [].concat(this.props.names); }

  /**
   * @param {String} eventName
   */
  getEventKey = (eventName) => this.props.map.hasOwnProperty(eventName) ? this.props.map[eventName] : null;

  getEventProps = eventName => {
    const eventKey = this.getEventKey(eventName);
    if (eventKey && this.props.props.hasOwnProperty(eventKey)) {
      return this.props.props[eventKey];
    }
  }

}