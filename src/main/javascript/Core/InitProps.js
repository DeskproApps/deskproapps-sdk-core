/**
 * @module Core/InitProps
 */

const paramPrefix = 'dp.';

/**
 * @type {{dpXconfTag: string}}
 */
export const propNamesMap = {
  dpXconfTag: 'dp.xconf.tag'
};

/**
 * @method
 * @param {InitProps} props
 */
export const validate = props => {
  if (!props) { return false; }

  const { dpXconfTag } = props;
  return typeof dpXconfTag === 'string' && dpXconfTag != '';
};

/**
 * @method
 *
 * @param {String} qs
 * @return {InitProps}
 */
export const parseQueryString = (qs) => {
  "use strict";
  const props = {};
  
  const queryParams = qs.split('&').map(nameAndValue => nameAndValue.split('='));
  for (const param of queryParams) {
    const [name, value] = param;
    if (name.substr(0, paramPrefix.length) === paramPrefix) {
      const propName = toPropName(name);
      props[propName] = decodeURIComponent(value);
    }
  }

  return new InitProps(props);
};

/**
 * @ignore
 * @param {String} str
 * @return {void|*|string|XML}
 */
const toPropName = str => {
  const replace = match => match.charAt(1).toUpperCase() + match.substr(2);
  return str.replace(/[.](\w|$)/g, replace);
};

/**
 * @ignore
 * @private
 *
 * @param {String} str
 * @return {string}
 */
const toParamName = str =>
{
  return paramPrefix + str
    .replace(/([a-z\d])([A-Z])/g, '$1' + '.' + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + '.' + '$2')
    .toLowerCase();
};

/**
 * @ignore
 * @private
 *
 * @param props
 * @return {*}
 */
const encodeAsQueryString = (props) => {
  "use strict";

  const reducer = (acc, key) => {
    const paramKey = toParamName(key);
    const paramValue = encodeURIComponent(props[key]);

    return acc + (acc === '' ? '' : '&') + `${paramKey}=${paramValue}`;
  };

  return Object.keys(props).reduce(reducer, '');
};

/**
 * @class
 */
class InitProps
{
  constructor({ dpXconfTag }) {
    this.props = { dpXconfTag };
  }

  /**
   * @method
   *
   * @return {String}
   */
  get dpXconfTag () {  return this.props.dpXconfTag; }

  /**
   * @method
   */
  toQueryString() { return encodeAsQueryString(this.props); }
}

export { InitProps }