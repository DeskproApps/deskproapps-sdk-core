import Context from '../../../main/javascript/Core/Context';
import AppEventEmitter from '../../../main/javascript/Core/AppEventEmitter'

test('getProperty returns undefined for unknown property', done => {

  const context = new Context({
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    type: 'not-important',
    entityId: '1',
    locationId: 'not-important',
    tabId: 1,
    tabUrl: 'http://localhost'
  });
  expect(context.getProperty('not-existing-property')).toBeUndefined();

  done();
});

test('hasProperty returns false for unknown property', done => {

  const context = new Context({
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    type: 'not-important',
    entityId: '1',
    locationId: 'not-important',
    tabId: 1,
    tabUrl: 'http://localhost'
  });
  expect(context.hasProperty('not-existing-property')).toBe(false);

  done();
});

test('get throws error when called with unknown object type', () => {

  const context = new Context({
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    type: 'ticket',
    entityId: '1',
    locationId: 'not-important',
    tabId: 1,
    tabUrl: 'http://localhost'
  });
  expect(() => context.get('not-a-ticket')).toThrow();

});


