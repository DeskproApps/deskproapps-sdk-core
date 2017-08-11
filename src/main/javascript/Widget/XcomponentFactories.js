/**
 * Window/Xcomponent module.
 * @module WebAPI/EventHandlers
 */

import { create } from '../../../xcomponent';

/**
 * @class
 */
class XcomponentFactories
{
  /**
   * @method
   */
  static create = create;

  /**
   * @method
   *
   * @param {string} dpXconfTag
   * @return {props}
   */
  static createFromAppInitProps({ dpXconfTag })
  {
    const props = {
      scrolling: false,
      tag: dpXconfTag, // needs to match xcomponent config on the parent
      url: 'http://localhost', // dummy entry to bypass validation

      dimensions: { width: '100%', height: '100%' },

      props: {

        // WIDGET PROPERTIES

        widgetId: {
          type: 'string',
          required: true
        },

        onDpMessage: {
          type: 'function',
          required: true
        },

        instanceProps: {
          type:     'object',
          required: true
        },

        contextProps: {
          type:     'object',
          required: true
        }
      }
    };

    return create(props);
  }
}

export {
  /**
   * @class
   */
  XcomponentFactories
};

