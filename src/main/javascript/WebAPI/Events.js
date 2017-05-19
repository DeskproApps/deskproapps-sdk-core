export const EVENT_WEBAPI_REQUEST_DESKPRO = 'webapi.request.deskpro';

export const events = {

  EVENT_WEBAPI_REQUEST_DESKPRO

};

export const eventNames = Object.keys(events).map(key => events[key]);

export const isEventName = name => eventNames.indexOf(name) !== -1;