import * as ObjectEvents from "./eventsObject";

/**
 * @param {AppEventEmitter}  outgoingDispatcher
 * @param {ContextProps} contextProps
 * @return {Function}
 */
export function propertyProviderTab(outgoingDispatcher, contextProps)
{
  const { tabId } = contextProps;

  if (! tabId) {
    throw new Error('context is missing the tab id')
  }

  return function(props) {
    const eventProps = { ...props, tabId };
    return outgoingDispatcher.emitAsync(ObjectEvents.EVENT_CONTEXT_PROPERTY_GET, eventProps);
  }
}