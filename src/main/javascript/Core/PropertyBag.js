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
   * @param {String} propName
   * @function
   * @return {{}}
   */
  getProperty = (propName) => {
    if (this.props.hasOwnProperty(propName)) {
      return this.props[propName];
    }

    return undefined;
  };

  /**
   * @return {Object}
   */
  toJSON = () => this.toJS();

  /**
   * @return {Object}
   */
  toJS = () => {
    return JSON.parse(JSON.stringify(this.props));
  };
}
