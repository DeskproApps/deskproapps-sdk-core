import * as SdkEvents from '../Core/SdkEvents';

class StateAPIClient {

  /**
   * @param {Function} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.eventDispatcher = eventDispatcher;
  }

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncGetShared = (name) => {
    const state = {
      name,
      scope: 'shared.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_GET, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncCreateShared = (name, value) => {
    const state = {
      name,
      value: JSON.stringify(value),
      scope: 'shared.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_CREATE, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncUpdateShared = (name, value) => {
    const state = {
      name,
      value: JSON.stringify(value),
      scope: 'shared.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_UPDATE, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSaveShared = (name, value) => {
    const state = {
      name,
      value: JSON.stringify(value),
      scope: 'shared.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_SAVE, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncDeleteShared = (name) => {
    const state = {
      name,
      scope: 'shared.app'
    };

    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_DELETE, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncGetPrivate = (name) => {
    const state = {
      name,
      scope: 'private.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_GET, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @param {Object} value
   * @return {Promise}
   */
  asyncSavePrivate = (name, value) => {
    const state = {
      name,
      value: JSON.stringify(value),
      scope: 'private.app'
    };
    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_SAVE, state);
    };
    return new Promise(executor);
  };

  /**
   * @param {String} name
   * @return {Promise}
   */
  asyncDeletePrivate = (name) => {
    const state = {
      name,
      scope: 'private.app'
    };

    const { eventDispatcher } = this;
    const executor = (resolve, reject) => {
      eventDispatcher(resolve, SdkEvents.EVENT_STATE_DELETE, state);
    };
    return new Promise(executor);
  };
}

export default StateAPIClient;
