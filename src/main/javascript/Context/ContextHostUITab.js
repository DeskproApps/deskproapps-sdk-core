import ContextHostUI from '../Core/ContextHostUI';
import * as UITabEvents from './eventsTab';

/**
 * The data stored by the Deskpro UITab
 * @typedef {Object} ContextHostUITab~TabData
 */

/**
 * The interface to the context supplied by the Deskpro UI Tab component hosting the app
 *
 * @class
 * @extends {ContextHostUI}
 */
class ContextHostUITab extends ContextHostUI
{
  /**
   * @param {AppEventEmitter} outgoingDispatcher
   * @param {String} locationId the id of the specific location within the UITab where the app is mounted
   * @param {String} tabId the id of this tab
   * @param {String} tabUrl the Deskpro URL of this tab
   * @param {...*} rest internal parameters
   */
  constructor({ outgoingDispatcher, locationId, tabId, tabUrl, ...rest }) {
    super({
      outgoingDispatcher,
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
   * the Deskpro URL of this tab, useful if you want to link directly to this tab
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
    return this.props.outgoingDispatcher.emitAsync(UITabEvents.EVENT_TAB_STATUS, this.props.tabId)
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
    return this.props.outgoingDispatcher.emitAsync(UITabEvents.EVENT_TAB_ACTIVATE, this.props.tabId);
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
    return this.props.outgoingDispatcher.emitAsync(UITabEvents.EVENT_TAB_CLOSE, this.props.tabId);
  }

  /**
   * Returns the data loaded by this tab
   *
   * @public
   * @method
   * @async
   * @return {Promise.<ContextHostUITab~TabData, Error>}
   */
  async getTabData() { return this.props.outgoingDispatcher.emitAsync(UITabEvents.EVENT_TAB_DATA, this.props.tabId); }
}

export default ContextHostUITab;