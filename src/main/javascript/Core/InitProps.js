const paramPrefix = 'dp.';

export const propNamesMap = {
  dpXconfTag: 'dp.xconf.tag'
};

/**
 * @param {InitProps} props
 */
export const validate = props => {
  if (!props) { return false; }

  const { dpXconfTag } = props;
  return typeof dpXconfTag === 'string' && dpXconfTag != '';
};

/**
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
 * @param {String} str
 * @return {void|*|string|XML}
 */
const toPropName = str => {
  const replace = match => match.charAt(1).toUpperCase() + match.substr(2);
  return str.replace(/[.](\w|$)/g, replace);
};

/**
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

const encodeAsQueryString = (props) => {
  "use strict";

  const reducer = (acc, key) => {
    const paramKey = toParamName(key);
    const paramValue = encodeURIComponent(props[key]);

    return acc + (acc === '' ? '' : '&') + `${paramKey}=${paramValue}`;
  };

  return Object.keys(props).reduce(reducer, '');
};

export class InitProps
{
  constructor({ dpXconfTag }) {
    this.props = { dpXconfTag };
  }

  /**
   * @return {String}
   */
  get dpXconfTag () {  return this.props.dpXconfTag; }

  toQueryString() { return encodeAsQueryString(this.props); }
}