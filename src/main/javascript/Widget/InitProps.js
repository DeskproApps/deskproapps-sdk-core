/**
 * @type {string}
 */
const paramPrefix = 'dp.';

/**
 * @type {{dpXconfTag: string}}
 */
const propNamesMap = {
  dpXconfTag: 'dp.xconf.tag'
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
 * @method
 *
 * @param {String} qs
 * @return {*}
 */
const parseQueryString = (qs) => {
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

  return props;
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
  /**
   * @type {string}
   */
  static get PARAM_PREFIX() { return paramPrefix; } ;

  /**
   * @type {{dpXconfTag: string}}
   */
  static get PROP_NAMES() { return propNamesMap; } ;
  /**
   * @param {*|InitProps} propsOrInstance
   * @return {boolean}
   */
  static validate(propsOrInstance)
  {
    if (propsOrInstance && typeof propsOrInstance === 'object') {
      const { dpXconfTag } = propsOrInstance;
      return typeof dpXconfTag === 'string' && dpXconfTag != '';
    }

    return false;
  }

  /**
   * @type {string} queryString
   * @return {InitProps|null}
   */
  static fromQueryString(queryString)
  {
    const initParams = parseQueryString(queryString);
    if (InitProps.validate(initParams)) {
      return new InitProps(initParams);
    }

    return null;
  }

  /**
   * @param {Window} windowObject
   * @return {InitProps}
   */
  static fromWindow(windowObject)
  {
    const {
      /** @type {{search: String, hash: String}} */ location
    } = windowObject;

    // build a list of potential sources for init params, ordered by priority
    const paramsQueryStrings = [
      location.hash.length ? location.hash.substring(1) : null,
      location.search.length ? location.search.substring(1) : null
    ].filter(string => !!string);

    if (paramsQueryStrings.length === 0) { return null; }

    for (const queryString of paramsQueryStrings) {
      const initParams = InitProps.fromQueryString(queryString);
      if (initParams) {
        return initParams;
      }
    }

    return null;
  }

  /**
   * @param {string} dpXconfTag
   */
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