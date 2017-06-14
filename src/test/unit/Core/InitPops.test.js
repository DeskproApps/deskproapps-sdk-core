import {parseQueryString, validate, InitProps, propNamesMap} from '../../../main/javascript/Core/InitProps'

test('parseQueryString parses empty string', done => {
  const props = parseQueryString('');
  expect(props instanceof InitProps).toBe(true);
  done();
});

test('parseQueryString parses a valid query string', done => {
  const props = parseQueryString(`${propNamesMap.dpXconfTag}=${encodeURIComponent('something&something')}&dp.otherNotYetUsed=entirely_other`);
  expect(validate(props)).toBe(true);
  expect(props.dpXconfTag).toBe('something&something');

  done();
});