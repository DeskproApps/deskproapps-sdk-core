import App from '../../../main/javascript/Core/App';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'
import { InstanceProps, ContextProps } from '../../../main/javascript/Core/Props';
import WindowProxy from '../../../main/javascript/Core/Window';

test('successfully create an application', done => {

  const params = {
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher:  new EventDispatcher(),
    internalDispatcher:  new EventDispatcher(),
    instanceProps: new InstanceProps({ appId: 1, appTitle: "title", appPackageName: "com.deskpro.app", instanceId: 1 }),
    contextProps:  new ContextProps({ type: 'ticket', entityId: 1, locationId: 1, tabId : 'tab-1' }),
    windowProxy: new WindowProxy({
      location : { search: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app).toBeTruthy();
  done();

});