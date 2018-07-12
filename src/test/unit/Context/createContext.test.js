import {createContext, ContextFactory} from '../../../main/javascript/Context';
import Context from '../../../main/javascript/Core/Context';

import AppEventEmitter from '../../../main/javascript/Core/AppEventEmitter'
import ContextProps from '../../../main/javascript/Core/ContextProps';
import InstanceProps from '../../../main/javascript/Core/InstanceProps';

test('can create a default context', done => {

  const contextType = 'rogue-context';
  expect(ContextFactory.contextObjectTypes.indexOf(contextType)).toBe(-1);

  const outgoingDispatcher = new AppEventEmitter();
  const incomingDispatcher = new AppEventEmitter();
  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: "title",
    appPackageName: "com.deskpro.app",
    instanceId: '1'
  });
  const contextProps = new ContextProps({
    type: contextType,
    entityId: '1',
    locationId: 'install',
    manifest: { field: 'value' },
    tabId: 1,
    tabUrl: 'http://localhost'
  });

  const context = createContext(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  expect(context instanceof Context).toBe(true);
  expect(context.hasProperty('manifest')).toBe(true);
  expect(context.getProperty('manifest')).toEqual({ field: 'value' });

  done();
});
