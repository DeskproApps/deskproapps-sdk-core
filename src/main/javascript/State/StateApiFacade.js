import { WebAPIEvents } from '../WebAPI';

class StateApiFacade
{
  /**
   * @param {EventDispatcher} eventDispatcher
   * @param {String} instanceId
   * @param {String} entityType
   * @param {String} entityId
   */
  constructor(eventDispatcher, { instanceId, entityType, entityId }) {
    this.props = { eventDispatcher, instanceId, entityType, entityId };
  }

  setState(name, value, entityId, options) {
    const url = `apps/${this.props.instanceId}/state/${entityId}/${name}`;
    const headers = { 'Accept': 'application/json' };

    let init;
    if (value === null || value === undefined) {
      init = { method: 'DELETE' };
    } else {
      headers['Content-Type'] = 'application/json';
      init = { method: 'PUT', body: JSON.stringify(value), headers };
    }

    return this.props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init })
      .then(() => value)
    ;
  }

  setAppState(name, value, options) {
    const entityId = `app:${this.props.instanceId}`;
    return this.setState(name, value, entityId, options);
  }

  setEntityState(name, value, options) {
    const entityId = `${this.props.entityType}:${this.props.entityId}`;
    return this.setState(name, value, entityId, options);
  }

  getState(name, entityId, defaultValue = null) {
    const url = `/apps/${this.props.instanceId}/state/${entityId}/${name}?options.mode=find`;
    const headers = { 'Accept': 'application/json' };

    let init = { method: 'GET' };
    return this.props.eventDispatcher.emitAsync(WebAPIEvents.EVENT_WEBAPI_REQUEST_FETCH, { url, init, headers })
      .then((response) => {
        return response.body ? response.body : defaultValue
      })
    ;
  }

  getEntityState(name, defaultValue = null) {
    const entityId = `${this.props.entityType}:${this.props.entityId}`;
    return this.getState(name, entityId, defaultValue);
  }

  getAppState(name, defaultValue = null) {
    const entityId = `app:${this.props.instanceId}`;
    return this.getState(name, entityId, defaultValue);
  }

}

export { StateApiFacade };