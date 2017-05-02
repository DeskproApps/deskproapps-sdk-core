import { create } from '../../../xcomponent';

const xcomponentConfig = {
  dimensions: {
    width: '100%',
    height: 1000
  },
  props: {

    widgetId: {
      type: 'string',
      required: true
    },

    onDpMessage: {
      type: 'function',
      required: true
    }
  },
  scrolling: false,
  autoResize: true,
  tag: 'ticket-sidebar',
  url: 'http://localhost', // dummy entry to bypass validation
};

// the tag needs to match the parent configuration otherwise communication will not be established
export const xcomponentInstance = create(xcomponentConfig);
