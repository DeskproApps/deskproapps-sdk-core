import ContextObject from '../../../main/javascript/Core/ContextObject';

test('get rejects with error when property is not a string', () => {

  const object = new ContextObject({
    propertyProvider: () => {},
    type: 'ticket',
    entityId: '1a'
  });


  const errors = [];
  const attempts = [
    object.get({}).catch(err => err),
    object.get(true).catch(err => err),
    object.get(() => {}).catch(err => err),
  ];

  return Promise.all(attempts).then(errors => expect(errors.length).toBe(3));
});

test('get invokes property provider with expected property path', () => {

  const propertyProvider = props => props;

  const object = new ContextObject({ propertyProvider, type: 'ticket', entityId: '1a' });
  const expected = { type: 'ticket', path: ['organization', 'id'] };

  return object.get('organization.id').then(result => expect(result).toMatchObject(expected));
});

test('get invokes property provider with empty property path', () => {

  const propertyProvider = props => props;

  const object = new ContextObject({ propertyProvider, type: 'ticket', entityId: '1a' });
  const expected = { type: 'ticket', path: [] };

  return object.get().then(result => expect(result).toMatchObject(expected));
});
