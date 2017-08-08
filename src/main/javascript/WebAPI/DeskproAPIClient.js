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
  fetch = (url,  init) => {
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, { url, init})
  };

  /**
   * @method
   *
   * @param {string} url
   * @param {object} init
   *
   * @return {Promise}
   */
  fetchCORS = (url,  init) => {
    const corsInit = { ...init, mode: 'cors'};
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, { url, init: corsInit })
  };

  /**
   * @param {string} path
   * @return {Promise}
   */
  get = (path) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'get', path});

  /**
   * @method
   *
   * @param {string} path
   * @param {object} body
   *
   * @return {Promise}
   */
  post = (path, body) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'post', path, body });

  /**
   * @method
   *
   * @param {string} path
   * @param {Object} body
   *
   * @return {Promise}
   */
  put = (path, body) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'put', path, body });

  /**
   * @method
   *
   * @param {string} path
   * @param {Object} body
   *
   * @return {Promise}
   */
  ['delete'] = (path, body) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'delete', path });

}