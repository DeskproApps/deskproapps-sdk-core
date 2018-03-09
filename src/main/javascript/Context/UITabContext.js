import Context from '../Core/Context';
import * as ContextEvents from '../Core/ContextEvents';

/**
 * This abstract class provides common implementations used by specific contexts which run inside a tab in the Deskpro UI
 *
 * @class
 * @abstract
 * @extends {Context}
 */
class UITabContext extends Context
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {AppEventEmitter} incomingDispatcher
   * @param {String} type the context type
   * @param {String} entityId the id of the Deskpro Entity referenced by this UITab
   * @param {String} locationId the id of the specific location within the UITab where the app is mounted
   * @param {String} tabId the id of this tab
   * @param {String} tabUrl the Deskpro URL of this tab
   * @param {...*} rest internal parameters
   */
  constructor({ outgoingDispatcher, incomingDispatcher, type, entityId, locationId, tabId, tabUrl, ...rest }) {
    super({
      outgoingDispatcher,
      incomingDispatcher,
      type,
      entityId,
      locationId,
      tabId,
      tabUrl,
      ...rest
    });
  }

  /**
   * @public
   * @return {String}
   */
  get tabId() { return this.props.tabId.toString(); }

  /**
   * the Deskpro URL of this tab
   *
   * @public
   * @return {String}
   */
  get tabUrl() { return this.props.tabUrl.toString(); }

  /**
   * Checks if this tab is active
   *
   * @public
   * @method
   * @async
   * @return {Promise.<boolean, Error>}
   */
  async isTabActive()
  {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_STATUS, this.props.tabId)
      .then(status => status.active)
      ;
  };

  /**
   * Activates this tab, making it visible
   *
   * @public
   * @method
   * @async
   * @return {Promise}
   */
  async activateTab()
  {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_ACTIVATE, this.props.tabId);
  }

  /**
   * Closes this tab
   *
   * @public
   * @method
   * @async
   * @return {Promise.<null, Error>}
   */
  async closeTab() {
    return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_CLOSE, this.props.tabId);
  }

  /**
   * Returns the data loaded by this tab
   *
   * @public
   * @method
   * @async
   * @return {Promise.<null, Error>}
   */
  async getTabData() { return this.props.outgoingDispatcher.emitAsync(ContextEvents.EVENT_TAB_DATA, this.props.tabId); }
}

export default UITabContext;