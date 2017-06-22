export class InstanceProps
{
  /**
   * @param {String} appId
   * @param {String} appTitle
   * @param {String} appPackageName
   * @param {String} instanceId
   * @param {Object} [experimentalProps] experimental props
   */
  constructor({ appId, appTitle, appPackageName, instanceId, ...experimentalProps })
  {
    this.props = { appId, appTitle, appPackageName, instanceId };
    this._experimentalProps = experimentalProps;
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

  /**
   * @return {Object}
   */
  get experimentalProps() { return JSON.parse(JSON.stringify(this._experimentalProps)); }

  /**
   * @return {Object}
   */
  toJS = (includeExperimental) => {
    if (includeExperimental) {
      const all = { ...this._props, ...this._experimentalProps };
      return JSON.parse(JSON.stringify(all));
    }

    return JSON.parse(JSON.stringify(this.props));
  };
}

export class ContextProps
{
  /**
   * @param {String} type
   * @param {String} entityId
   * @param {String} locationId
   * @param {String} tabId
   * @param {String} tabUrl
   * @param {Object} [experimentalProps] experimental props
   */
  constructor({ type, entityId, locationId, tabId, tabUrl, ...experimentalProps })
  {
    this.props = { type, entityId, locationId, tabId, tabUrl };
    this._experimentalProps = experimentalProps;
  }

  /**
   * @return {String}
   */
  get type() { return this.props.type; }

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

  /**
   * @return {Object}
   */
  get experimentalProps() { return JSON.parse(JSON.stringify(this._experimentalProps)); }

  /**
   * @return {Object}
   */
  toJS = (includeExperimental) => {
    if (includeExperimental) {
      const all = { ...this._props, ...this._experimentalProps };
      return JSON.parse(JSON.stringify(all));
    }

    return JSON.parse(JSON.stringify(this.props));
  };
}

