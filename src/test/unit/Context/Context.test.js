import Context from '../../../main/javascript/Core/Context';
import AppEventEmitter from '../../../main/javascript/Core/AppEventEmitter'

test('getProperty returns undefined for unknown property', done => {

  const context = new Context({
    outgoingDispatcher: new AppEventEmitter(),
    incomingDispatcher: new AppEventEmitter(),
    type: 'not-important',
    entityId: '1',
    locationId: 'not-important'
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
    locationId: 'not-important'
  });
  expect(context.hasProperty('not-existing-property')).toBe(false);

  done();
});
