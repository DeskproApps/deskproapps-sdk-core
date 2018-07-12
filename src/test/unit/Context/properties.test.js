import { propertyProviderTab } from '../../../main/javascript/Context/properties'
import ContextProps from "../../../main/javascript/Core/ContextProps";
import AppEventEmitter from "../../../main/javascript/Core/AppEventEmitter";

test('propertyProviderTab throws error if missing tabId', () => {

  const outgoingDispatcher = new AppEventEmitter();
  const contextProps = new ContextProps({})

  expect(() =>  propertyProviderTab(outgoingDispatcher, contextProps)).toThrow();
});
