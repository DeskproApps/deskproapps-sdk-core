import {WidgetFactories} from '../../../main/javascript/Widget/WidgetFactories';
import {WidgetResponse} from '../../../main/javascript/Widget/WidgetResponse';
import {WidgetRequest} from '../../../main/javascript/Widget/WidgetRequest';

test('parseMessageFromJS parses response', done => {
  const expectedValue = WidgetResponse.parse({
    id: '1',
    widgetId : '1',
    correlationId : '100',
    body: JSON.stringify({ some: 'string' }),
    status : 'success'
  });
  const actualValue = WidgetFactories.parseMessageFromJS(expectedValue.toJS());

  expect(actualValue instanceof WidgetResponse).toBe(true);
  expect(actualValue.toJS()).toEqual(expectedValue.toJS());
  done();
});

test('parseMessageFromJS parses request', done => {
  const expectedValue = WidgetRequest.parse({
    id: '1',
    widgetId : '1',
    correlationId : '100',
    body: JSON.stringify({ some: 'string' })
  });
  const actualValue = WidgetFactories.parseMessageFromJS(expectedValue.toJS());

  expect(actualValue instanceof WidgetRequest).toBe(true);
  expect(actualValue.toJS()).toEqual(expectedValue.toJS());
  done();
});

test('nextRequest increments messageId and correlationId', done => {

  const payload = { some: 'string' };
  const widgetId = 100;


  const firstRequest = WidgetFactories.nextRequest(widgetId, payload);
  const secondRequest = WidgetFactories.nextRequest(widgetId, payload);

  expect(parseInt(secondRequest.id, 10) > parseInt(firstRequest.id, 10) ).toBe(true);
  expect(parseInt(secondRequest.correlationId, 10) > parseInt(firstRequest.correlationId, 10) ).toBe(true);

  done();
});

test('nextResponse increments messageId and re-uses correlationId', done => {

  const request = WidgetRequest.parse({
    id: '1',
    widgetId : '1',
    correlationId : '100',
    body: JSON.stringify({ some: 'string' })
  });

  const firstResponse = WidgetFactories.nextResponse(request, JSON.stringify({ some: 'string' }), false);
  const secondResponse = WidgetFactories.nextResponse(request, JSON.stringify({ some: 'string' }), false);

  expect(parseInt(firstResponse.id, 10) < parseInt(secondResponse.id, 10)).toBe(true);
  expect(firstResponse.correlationId).toBe(secondResponse.correlationId);
  expect(firstResponse.correlationId).toBe('100');

  done();
});


