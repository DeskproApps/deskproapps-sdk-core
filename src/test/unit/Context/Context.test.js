import {Context} from '../../../main/javascript/Core/Context';
import { EventDispatcher } from '../../../main/javascript/Core/EventDispatcher'

test('getProperty returns undefined for unknown property', done => {

  const context = new Context({
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher: new EventDispatcher(),
    type: 'not-important',
    entityId: '1',
    locationId: 'not-important'
  });
  expect(context.getProperty('not-existing-property')).toBeUndefined();

  done();
});

test('hasProperty returns false for unknown property', done => {

  const context = new Context({
    outgoingDispatcher: new EventDispatcher(),
    incomingDispatcher: new EventDispatcher(),
    type: 'not-important',
    entityId: '1',
    locationId: 'not-important'
  });
  expect(context.hasProperty('not-existing-property')).toBe(false);

  done();
});
