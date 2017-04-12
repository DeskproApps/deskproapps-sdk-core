import { create } from 'xcomponent/src';

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
  url: 'http://127.0.0.1:31080/html/ticket-sidebar.html',
};

// the tag needs to match the parent configuration otherwise communication will not be established
export const xcomponentInstance = create(xcomponentConfig);
