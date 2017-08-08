/**
 * @class
 */
export class PropertyBag
{
  /**
   * @param {{}} props
   */
  constructor({ ...props })
  {
    this.props = { ...props };
  }

  /**
   * @method
   *
   * @param {String} propName
   * @return {{}}
   */
  getProperty = (propName) => {
    if (this.props.hasOwnProperty(propName)) {
      return this.props[propName];
    }

    return undefined;
  };

  /**
   * @method
   *
   * @return {Object}
   */
  toJSON = () => this.toJS();

  /**
   * @method
   *
   * @return {Object}
   */
  toJS = () => {
    return JSON.parse(JSON.stringify(this.props));
  };
}
