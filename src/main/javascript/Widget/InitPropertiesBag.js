import { PropertyBag } from '../Core'

/**
 * @ignore
 *
 * @type {string}
 */
const paramPrefix = 'dp.';

/**
 * @ignore
 *
 * @type {{dpXconfTag: string, dpWidgetId: string}}
 */
const propNamesMap = {
  dpXconfTag: 'dp.xconf.tag',
  dpWidgetId: 'dp.widgetId',
};

/**
 * @ignore
 *
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
class InitPropertiesBag extends PropertyBag
{
  /**
   * @type {string}
   */
  static get PARAM_PREFIX() { return paramPrefix; } ;

  /**
   * @type {{dpXconfTag: string, dpWidgetId: string}}
   */
  static get PROP_NAMES() { return propNamesMap; } ;
  /**
   * @param {*|InitPropertiesBag} propsOrInstance
   * @return {boolean}
   */
  static validate(propsOrInstance)
  {
    if (propsOrInstance && typeof propsOrInstance === 'object') {
      const { dpWidgetId } = propsOrInstance;

      return dpWidgetId && typeof dpWidgetId === 'string' && dpWidgetId != '';
    }

    return false;
  }

  /**
   * @type {string} queryString
   * @return {InitPropertiesBag|null}
   */
  static fromQueryString(queryString)
  {
    const initParams = parseQueryString(queryString);
    if (InitPropertiesBag.validate(initParams)) {
      return new InitPropertiesBag(initParams);
    }

    return null;
  }

  /**
   * @param {Window} windowObject
   * @return {InitPropertiesBag}
   */
  static fromWindow(windowObject)
  {
    const {
      /**
       * @ignore
       *
       *  @type {{search: String, hash: String}}
       * */
      location
    } = windowObject;

    // build a list of potential sources for init params, ordered by priority
    const paramsQueryStrings = [
      location.hash.length ? location.hash.substring(1) : null,
      location.search.length ? location.search.substring(1) : null
    ].filter(string => !!string);

    if (paramsQueryStrings.length === 0) { return null; }

    for (const queryString of paramsQueryStrings) {
      const initParams = InitPropertiesBag.fromQueryString(queryString);
      if (initParams) {
        return initParams;
      }
    }

    return null;
  }

  /**
   * @param {string} dpXconfTag
   * @param {string} dpWidgetId
   * @param rest
   */
  constructor({ dpXconfTag, dpWidgetId, ...rest }) {
    super({ dpXconfTag, dpWidgetId, ...rest });
  }

  /**
   * @deprecated
   *
   * @type {String}
   */
  get dpXconfTag () {  return this.props.dpXconfTag; }

  /**
   * @type {string}
   */
  get dpWidgetId () {  return this.props.dpWidgetId; }

  /**
   * @method
   *
   * @return {string}
   */
  toQueryString() { return encodeAsQueryString(this.props); }
}

export default InitPropertiesBag