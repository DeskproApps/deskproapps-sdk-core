import App from '../../../main/javascript/Core/App';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'
import { InstanceProps, ContextProps } from '../../../main/javascript/Core/AppProps';
import { AppWindowBridge } from '../../../main/javascript/Window';

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
    windowProxy: new AppWindowBridge({
      location : { search: '', hash: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app).toBeTruthy();
  done();

});

test('retrieve properties', done => {

  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: "title",
    appPackageName: "com.deskpro.app",
    instanceId: '1',

    instanceExperimentalOne: experimental.instanceExperimentalOne,
    instanceExperimentalTwo: experimental.instanceExperimentalTwo
  });

  const contextProps = new ContextProps({
    type: 'ticket',
    entityId: '1',
    locationId: '1',
    tabId : 'tab-1' ,
    tabUrl: 'https://127.0.0.1',

    contextExperimentalThree: experimental.contextExperimentalThree,
  });


  const params = {
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher:  new EventDispatcher(),
    internalDispatcher:  new EventDispatcher(),
    instanceProps,
    contextProps,
    windowProxy: new AppWindowBridge({
      location : { search: '', hash: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app.getProperty('appId')).toEqual('1');
  expect(app.getProperty('contextType')).toEqual('ticket');
  expect(app.getProperty('contextType')).toEqual(app.context.type);
  expect(app.getProperty('tabUrl')).toEqual('https://127.0.0.1');
  expect(app.getProperty('instanceExperimentalTwo')).toEqual(experimental.instanceExperimentalTwo);

  done();

});

test('retrieve property', done => {

  const experimental = {
    instanceExperimentalOne: 'instanceExperimentalOne',
    instanceExperimentalTwo: 'instanceExperimentalTwo',
    contextExperimentalThree: 3,
  };

  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: "title",
    appPackageName: "com.deskpro.app",
    instanceId: '1',

    instanceExperimentalOne: experimental.instanceExperimentalOne,
    instanceExperimentalTwo: experimental.instanceExperimentalTwo
  });

  const contextProps = new ContextProps({
    type: 'ticket',
    entityId: '1',
    locationId: '1',
    tabId : 'tab-1' ,
    tabUrl: 'https://127.0.0.1',

    contextExperimentalThree: experimental.contextExperimentalThree,
  });


  const params = {
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher:  new EventDispatcher(),
    internalDispatcher:  new EventDispatcher(),
    instanceProps,
    contextProps,
    windowProxy: new AppWindowBridge({
      location : { search: '', hash: '' },
      document: { readyState : 'notReady' }
    })
  };

  const app = new App(params);

  expect(app.properties).toEqual(Object.assign({}, instanceProps.toJS(), contextProps.toJS()));
  done();

});