/**
 * A simple class very similar to a map or a plain object that acts as an indexed container for a group of values
 *
 * @class
 */
class PropertyBag
{
  /**
   * @param {...*} props
   */
  constructor({ ...props })
  {
    this.props = { ...props };
  }

  /**
   * Returns a value from the bag
   *
   * @method
   *
   * @param {String} propName
   * @return {*}
   */
  getProperty = (propName) => {
    if (this.props.hasOwnProperty(propName)) {
      return this.props[propName];
    }

    return undefined;
  };

  /**
   * Alias for `toJS`
   *
   * @method
   * @return {Object}
   */
  toJSON = () => this.toJS();

  /**
   * Returns a deep clone of this object
   *
   * @method
   * @return {Object}
   */
  toJS = () => {
    return JSON.parse(JSON.stringify(this.props));
  };
}

export default PropertyBag