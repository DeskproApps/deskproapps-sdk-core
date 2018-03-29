
class ContextHostUI
{
  /**
   * @param {String} locationId the id of the specific location within the UITab where the app is mounted
   * @param {...*} rest
   * @constructor
   */
  constructor({ locationId, ...rest }) {
    this.props = { locationId, ...rest }
  }

  /**
   * The id of the location within the helpdesk UI where this application is shown
   *
   * @public
   * @return {String}
   */
  get locationId() { return this.props.locationId.toString(); }
}

export default ContextHostUI