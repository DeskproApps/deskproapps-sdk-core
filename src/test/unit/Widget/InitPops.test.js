import {InitProps} from '../../../main/javascript/Widget/InitProps'

test('fromQueryString returns null when called with an empty string', done => {
  const props = InitProps.fromQueryString('');
  expect(props).toBe(null);
  done();
});

test('fromQueryString parses a valid query string', done => {

  const props = InitProps.fromQueryString(`${InitProps.PROP_NAMES.dpXconfTag}=${encodeURIComponent('something&something')}&dp.otherNotYetUsed=entirely_other`);
  expect(props instanceof InitProps).toBe(true);
  expect(props.dpXconfTag).toBe('something&something');

  done();
});

test('fromWindow favors the hash property over the query string', done => {

  const expectedValue = 'expected&value';
  const windowObject = {
    location : {
      search: `?${InitProps.PROP_NAMES.dpXconfTag}=${encodeURIComponent('unexpected.value')}&dp.otherNotYetUsed=entirely_other`,
      hash: `#${InitProps.PROP_NAMES.dpXconfTag}=${encodeURIComponent(expectedValue)}&dp.otherNotYetUsed=entirely_other`
    },
    document: { readyState : 'notReady' }
  };
  const initProps = InitProps.fromWindow(windowObject);

  expect(initProps instanceof InitProps).toBe(true);
  expect(initProps.dpXconfTag).toBe(expectedValue);

  done();
});

test('fromWindow uses the query string if hash is missing ', done => {
  const expectedValue = 'expected&value';

  const windowObject = {
    location : {
      hash: `#`,
      search: `?${InitProps.PROP_NAMES.dpXconfTag}=${encodeURIComponent(expectedValue)}&dp.otherNotYetUsed=entirely_other`
    },
    document: { readyState : 'notReady' }
  };
  const initProps = InitProps.fromWindow(windowObject);

  expect(initProps instanceof InitProps).toBe(true);
  expect(initProps.dpXconfTag).toBe(expectedValue);

  done();
});

test('fromWindow returns null when init params parsing returns an invalid object ', done => {

  const initProps = [
    {
      location : {
        hash: `#`,
        search: `?`
      },
      document: { readyState : 'notReady' }
    },
    {
      location : {
        hash: `#`,
        search: `?&otherNotYetUsed=entirely_other`
      },
      document: { readyState : 'notReady' }
    }
  ].map(InitProps.fromWindow);

  initProps.forEach(props => expect(props).toBeNull());
  done();
});
