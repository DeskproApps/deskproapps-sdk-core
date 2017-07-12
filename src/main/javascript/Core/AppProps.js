class PropertyBag
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
   * @return {*}
   */
  getProperty = (propName) => {
    if (this.props.hasOwnProperty(propName)) {
      return this.props[propName];
    }

    return undefined;
  };

  toJSON = () => this.toJS();

  /**
   * @return {Object}
   */
  toJS = () => {
    return JSON.parse(JSON.stringify(this.props));
  };
}

export class InstanceProps extends PropertyBag
{
  /**
   * @param {String} appId
   * @param {String} appTitle
   * @param {String} appPackageName
   * @param {String} instanceId
   * @param {{}} otherProps
   */
  constructor({ appId, appTitle, appPackageName, instanceId, ...otherProps })
  {
    super({ appId, appTitle, appPackageName, instanceId, ...otherProps })
  }

  /**
   * @return {String}
   */
  get appId() { return this.props.appId; }

  /**
   * @return {String}
   */
  get appTitle() { return this.props.appTitle; }

  /**
   * @return {String}
   */
  get appPackageName() { return this.props.appPackageName; }

  /**
   * @return {String}
   */
  get instanceId() { return this.props.instanceId; }
}

export class ContextProps extends PropertyBag
{
  /**
   * @param {String} type alias for contextType
   * @param {String} contextType
   * @param {String} entityId
   * @param {String} locationId
   * @param {String} tabId
   * @param {String} tabUrl
   * @param {Object} [otherProps] experimental props
   */
  constructor({ type, contextType, entityId, locationId, tabId, tabUrl, ...otherProps })
  {
    super({ contextType: contextType || type, entityId, locationId, tabId, tabUrl, ...otherProps });
  }

  /**
   * @return {String}
   */
  get contextType() { return this.props.contextType; }

  /**
   * @return {String}
   */
  get entityId() { return this.props.entityId; }

  /**
   * @return {String}
   */
  get locationId() { return this.props.locationId; }

  /**
   * @return {String}
   */
  get tabId() { return this.props.tabId; }

  /**
   * @return {String}
   */
  get tabUrl() { return this.props.tabUrl; }
}

