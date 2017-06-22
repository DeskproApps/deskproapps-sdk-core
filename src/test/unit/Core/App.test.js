import App from '../../../main/javascript/Core/App';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'
import { InstanceProps, ContextProps } from '../../../main/javascript/Core/AppProps';
import WindowProxy from '../../../main/javascript/Core/Window';

test('successfully create an application', done => {

  const params = {
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher:  new EventDispatcher(),
    internalDispatcher:  new EventDispatcher(),
    instanceProps: new InstanceProps({
      appId: '1',
      appTitle: "title",
      appPackageName: "com.deskpro.app",
      instanceId: '1'
    }),
    contextProps:  new ContextProps({
      type: 'ticket',
      entityId: '1',
      locationId: '1',
      tabId : 'tab-1' ,
      tabUrl: 'https://127.0.0.1'
    }),
    windowProxy: new WindowProxy({
      location : { search: '', hash: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app).toBeTruthy();
  done();

});

test('retrieve experiemental props', done => {

  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = {
    appId: '1',
    appTitle: "title",
    appPackageName: "com.deskpro.app",
    instanceId: '1'
  };

  const contextProps = {
    type: 'ticket',
    entityId: '1',
    locationId: '1',
    tabId : 'tab-1' ,
    tabUrl: 'https://127.0.0.1',
  };

  const params = {
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher:  new EventDispatcher(),
    internalDispatcher:  new EventDispatcher(),
    instanceProps: new InstanceProps({
        ...instanceProps,
        instanceExperimentalOne: experimental.instanceExperimentalOne,
        instanceExperimentalTwo: experimental.instanceExperimentalTwo,
    }),
    contextProps:  new ContextProps({
      ...contextProps,
      contextExperimentalThree: experimental.contextExperimentalThree,
    }),
    windowProxy: new WindowProxy({
      location : { search: '', hash: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app.experimentalProps).toEqual(experimental);
  done();

});