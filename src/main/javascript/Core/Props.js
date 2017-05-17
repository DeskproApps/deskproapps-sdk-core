export class InstanceProps
{
  constructor({ appId, appTitle, appPackageName, instanceId })
  {
    this.props = { appId, appTitle, appPackageName, instanceId };
  }

  get appId() { return this.props.appId; }

  get appTitle() { return this.props.appTitle; }

  get appPackageName() { return this.props.appPackageName; }

  get instanceId() { return this.props.instanceId; }

}

export class ContextProps
{
  constructor({ type, entityId, locationId, tabId })
  {
    this.props = { type, entityId, locationId, tabId };
  }

  get type() { return this.props.type; }

  get entityId() { return this.props.entityId; }

  get locationId() { return this.props.locationId; }

  get tabId() { return this.props.tabId; }
}

