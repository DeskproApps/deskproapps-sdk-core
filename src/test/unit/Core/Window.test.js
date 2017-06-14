"use strict";
import WindowProxy from '../../../main/javascript/Core/Window'
import {propNamesMap} from '../../../main/javascript/Core/InitProps'


test('parseInitParamsFromLocation favors the hash property over the query string', done => {

  const expectedValue = 'expected&value';

  const proxy = new WindowProxy({
    location : {
      search: `?${propNamesMap.dpXconfTag}=${encodeURIComponent('unexpected.value')}&dp.otherNotYetUsed=entirely_other`,
      hash: `#${propNamesMap.dpXconfTag}=${encodeURIComponent(expectedValue)}&dp.otherNotYetUsed=entirely_other`
    },
    document: { readyState : 'notReady' }
  });
  expect(proxy.initParams.dpXconfTag).toBe(expectedValue);

  done();
});

test('parseInitParamsFromLocation use the query string if hash is missing ', done => {
  const expectedValue = 'expected&value';

  const proxy = new WindowProxy({
    location : {
      hash: `#`,
      search: `?${propNamesMap.dpXconfTag}=${encodeURIComponent(expectedValue)}&dp.otherNotYetUsed=entirely_other`
    },
    document: { readyState : 'notReady' }
  });
  expect(proxy.initParams.dpXconfTag).toBe(expectedValue);

  done();
});

test('window.initParams returns null when init params parsing returns an invalid object ', done => {

  const proxies = [
    new WindowProxy({
      location : {
        hash: `#`,
        search: `?`
      },
      document: { readyState : 'notReady' }
    }),
    new WindowProxy({
      location : {
        hash: `#`,
        search: `?&otherNotYetUsed=entirely_other`
      },
      document: { readyState : 'notReady' }
    })
  ];

  proxies.forEach(proxy => expect(proxy.initParams).toBeNull());
  done();
});