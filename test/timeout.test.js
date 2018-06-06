const { assert } = require('chai');
const { sleep, timeout } = require('../timeout');

/**
 * Sleep
 */

describe('sleep', function() {
  let startTime;

  beforeEach(function () {
    startTime = Date.now();
  });

  it('should sleep at least 0ms', function (done) {
    sleep(0).then(() => {
      const endTime = Date.now();

      const timePassed = endTime - startTime;

      assert.operator(timePassed, '>=', 0);

      done();
    })
  });

  it('should sleep at least 50ms', function (done) {
    sleep(50).then(() => {
      const endTime = Date.now();

      const timePassed = endTime - startTime;

      assert.operator(timePassed, '>=', 50);

      done();
    })
  });

  it('should sleep no more 100ms', function (done) {
    sleep(75).then(() => {
      const endTime = Date.now();

      const timePassed = endTime - startTime;

      assert.operator(timePassed, '>=', 75);

      done();
    })
  });
});

/**
 * Timeout
 */

describe('timeout', function() {
  it('should resolve if passing resolved promise', function (done) {
    timeout(Promise.resolve('resolved'), 0).then((result) => {
      assert.equal(result, 'resolved');

      done();
    })
  });

  it('should reject if passing rejected promise', function (done) {
    timeout(Promise.reject('rejected'), 0).catch((result) => {
      assert.equal(result, 'rejected');

      done();
    })
  });

  it('should resolve if one promise resolves before other', function (done) {
    timeout(sleep(50), 100).then((result) => {
      assert.notEqual(result, 'timed out');

      done();
    })
  });

  it('should reject if one promise rejects before other', function (done) {
    timeout(sleep(100), 50).catch((result) => {
      assert.equal(result, 'timed out');

      done();
    })
  });
});
