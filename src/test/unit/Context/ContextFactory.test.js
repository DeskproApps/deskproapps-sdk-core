import {ContextFactory} from '../../../main/javascript/Context';
import Context from '../../../main/javascript/Core/Context';
import { CustomFieldsClient } from '../../../main/javascript/CustomFields';

import AppEventEmitter from '../../../main/javascript/Core/AppEventEmitter'
import ContextProps from '../../../main/javascript/Core/ContextProps';
import InstanceProps from '../../../main/javascript/Core/InstanceProps';

test('can create a ticket context', done => {
  const contextType = 'ticket';
  expect(ContextFactory.contextObjectTypes.indexOf(contextType) > -1).toBe(true);

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

  const context = ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  expect(context instanceof Context).toBe(true);
  expect(context.get(contextType).customFields instanceof CustomFieldsClient).toBe(true);

  done();
});

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

  const context = ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  expect(context instanceof Context).toBe(true);
  expect(context.get(contextType).customFields).toBeNull();
  done();
});
