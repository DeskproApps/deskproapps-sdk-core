import * as Events from './Events';

/**
 * @param {EventDispatcher} eventDispatcher
 * @return {DeskproAPIClient}
 */
export const create = (eventDispatcher) => new DeskproAPIClient(eventDispatcher);

/**
 * @class
 */
export class DeskproAPIClient
{
  /**
   * @param {EventDispatcher} eventDispatcher
   */
  constructor(eventDispatcher) {
    this.props = { eventDispatcher };
  }

  /**
   * @method
   *
   * @param {string} url
   * @param {object} init
   *
   * @return {Promise}
   */
  async fetch (url, init) {
    const request = { url, init };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, request);
  };

  /**
   * @method
   *
   * @param {string} url
   * @param {object} init
   *
   * @return {Promise}
   */
  async fetchCORS(url, init){
    const corsInit = { ...init, mode: 'cors'};
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, { url, init: corsInit })
  };

  /**
   * @param {string} path
   * @return {Promise}
   */
  async get(path) {
    const request = { method: 'get', path };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * @method
   *
   * @param {string} path
   * @param {object} body
   *
   * @return {Promise}
   */
  async post(path, body) {
    const request = { method: 'post', path, body };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * @method
   *
   * @param {string} path
   * @param {Object} body
   *
   * @return {Promise}
   */
  async put(path, body) {
    const request = { method: 'put', path, body };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * @method
   *
   * @param {String} path
   * @return {Promise}
   */
  async del(path)
  {
    const request = { method: 'delete', path };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * @method
   *
   * @param {string} path
   *
   * @return {Promise}
   */
  ['delete'] = (path) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'delete', path });

}