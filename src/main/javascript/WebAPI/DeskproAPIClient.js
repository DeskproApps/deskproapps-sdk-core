import * as Events from './events';

/**
 * @param {AppEventEmitter} eventDispatcher
 * @return {DeskproAPIClient}
 */
export const create = (eventDispatcher) => new DeskproAPIClient(eventDispatcher);

/**
 * An API client for the Deskpro API. Application code can use it to interact with the Deskpro instance hosting the app
 *
 * @class
 */
export class DeskproAPIClient
{
  /**
   * @param {AppEventEmitter} eventDispatcher the outgoing event dispatcher
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
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async fetch (url, init) {
    const request = { url, init };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, request);
  };

  /**
   * Executes a fetch style request
   *
   * @method
   *
   * @param {string} url the resource's relative url
   * @param {object} init a fetch init object. See {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch}
   *
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async fetchCORS(url, init){
    const corsInit = { ...init, mode: 'cors'};
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_FETCH, { url, init: corsInit })
  };

  /**
   * Executes a `GET` request
   *
   * @param {string} path the resource's relative url
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async get(path) {
    const request = { method: 'get', path };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * Executes a `POST` request
   *
   * @method
   *
   * @param {string} path the resource's relative url
   * @param {object} body the request body
   *
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async post(path, body) {
    const request = { method: 'post', path, body };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * Executes a `PUT` request
   *
   * @method
   *
   * @param {string} path the resource's relative url
   * @param {Object} body the request body
   *
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async put(path, body) {
    const request = { method: 'put', path, body };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * Executes a `DELETE` request
   *
   * @method
   *
   * @param {String} path the resource's relative url
   * @return {Promise<DeskproAPIResponse, Error>}
   */
  async del(path)
  {
    const request = { method: 'delete', path };
    return this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, request);
  }

  /**
   * Executes a `DELETE` request
   *
   * @method
   *
   * @param {string} path the resource's relative url
   *
   * @return {Promise}
   */
  ['delete'] = (path) => this.props.eventDispatcher.emitAsync(Events.EVENT_WEBAPI_REQUEST_DESKPRO, { method: 'delete', path });

}

/**
 * Represents the result of applying a DOM Query Pattern with a `exists` type
 *
 * @typedef {Object} DeskproAPIResponse
 * @property {'complete'|'error'|'timeout'|'abort'|'parseerror'} status the status of the xhr request
 * @property {Object} body the json decoded body of the response
 * @property {Object} headers a map of <header name, value> the response headers
 * @property {number} statusCode the http code of the response
 */