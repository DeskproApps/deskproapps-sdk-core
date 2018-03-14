import ContextProps from '../../../main/javascript/Core/ContextProps';

test('contextType property takes precedence over type property', done =>
{
  const context = new ContextProps({
      type: 'not-a-ticket',
      contextType: 'ticket',
      entityId: '1',
      locationId: '1',
      tabId : 'tab-1' ,
      tabUrl: 'https://127.0.0.1'
    });
  expect(context.contextType).toEqual('ticket');
  done();
});

test('type property is used when contextType property is missing', done =>
{
  const context = new ContextProps({
      type: 'not-a-ticket',
      entityId: '1',
      locationId: '1',
      tabId : 'tab-1' ,
      tabUrl: 'https://127.0.0.1'
    });
  expect(context.contextType).toEqual('not-a-ticket');
  done();
});
