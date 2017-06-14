import {buildMap, matchEvent, CHANNEL_INCOMING, CHANNEL_OUTGOING, INVOCATION_REQUESTRESPONSE} from '../../../main/javascript/Core/Event'

const EVENT_INTERNAL_ONE = 'event.internal.one';
const EVENT_INTERNAL_TWO = 'event.internal.two';
const EVENT_INCOMING_ONE = 'event.incoming.one';

const events = {
  EVENT_INTERNAL_ONE,
  EVENT_INTERNAL_TWO,
  EVENT_INCOMING_ONE
};

const props = {
  EVENT_INCOMING_ONE: { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
};

test('matchEvent matches event without props (internal event) by name', done => {
  const eventMap = buildMap(events, props);
  const patterns = [ null ];

  patterns.forEach(pattern => {
    "use strict";
    const actualResult = matchEvent(EVENT_INTERNAL_ONE, pattern, eventMap);
    expect(actualResult).toBe(true);
  });

  done();
});

test('matchEvent matches event with props by name and props pattern', done => {
  const eventMap = buildMap(events, props);
  const patterns = [
    null,
    { channelType: CHANNEL_INCOMING },
    { invocationType: INVOCATION_REQUESTRESPONSE },
    { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
  ];

  patterns.forEach(pattern => {
    "use strict";
    const actualResult = matchEvent(EVENT_INCOMING_ONE, pattern, eventMap);
    expect(actualResult).toBe(true);
  });
  done();

});

test('matchEvent does not match internal event against a pattern', done => {
  const eventMap = buildMap(events, props);
  const patterns = [
    { invocationType: INVOCATION_REQUESTRESPONSE },
    { channelType: CHANNEL_INCOMING, invocationType: INVOCATION_REQUESTRESPONSE }
  ];

  patterns.forEach(pattern => {
    "use strict";
    const actualResult = matchEvent(EVENT_INTERNAL_ONE, pattern, eventMap);
    expect(actualResult).toBe(false);
  });
  done();

});

test('matchEvent does not match event with props when props pattern does not match', done => {
  const eventMap = buildMap(events, props);
  const actualResult = matchEvent(EVENT_INCOMING_ONE, { channelType: CHANNEL_OUTGOING }, eventMap);

  expect(actualResult).toBe(false);
  done();

});