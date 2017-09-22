import {ContextFactory} from '../../../main/javascript/Context';
import {Context} from '../../../main/javascript/Core/Context';
import {TicketContext} from '../../../main/javascript/Context/TicketContext';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'
import { InstanceProps, ContextProps } from '../../../main/javascript/Core/AppProps';

test('can create a ticket context', done => {
  const contextType = 'rogue-context';
  expect(ContextFactory.contextTypes.indexOf(contextType)).toBe(-1);

  const outgoingDispatcher = new EventDispatcher();
  const incomingDispatcher = new EventDispatcher();
  const instanceProps = new InstanceProps({
    appId: '1',
    appTitle: "title",
    appPackageName: "com.deskpro.app",
    instanceId: '1'
  });
  const contextProps = new ContextProps({
    type: TicketContext.TYPE,
    entityId: '1',
    locationId: 'install',
    manifest: { field: 'value' }
  });

  const context = ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  expect(context instanceof TicketContext).toBe(true);

  done();
});

test('can create a default context', done => {

  const contextType = 'rogue-context';
  expect(ContextFactory.contextTypes.indexOf(contextType)).toBe(-1);

  const outgoingDispatcher = new EventDispatcher();
  const incomingDispatcher = new EventDispatcher();
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
    manifest: { field: 'value' }
  });

  const context = ContextFactory.create(outgoingDispatcher, incomingDispatcher, instanceProps, contextProps);
  expect(context instanceof Context).toBe(true);
  expect(context.hasProperty('manifest')).toBe(true);
  expect(context.getProperty('manifest')).toEqual({ field: 'value' });

  done();
});
