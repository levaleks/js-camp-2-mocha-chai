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

  it('should sleep at least 0ms', async function () {
    await sleep(0);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 0);
  });

  it('should sleep at least 50ms', async function () {
    await sleep(50);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 50);
  });

  it('should sleep no more 100ms', async function () {
    await sleep(75);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 75);
  });
});

/**
 * Timeout
 */

describe('timeout', function() {
  it('should resolve if passing resolved promise', async function () {
    const result = await timeout(Promise.resolve('resolved'), 0);

    assert.equal(result, 'resolved');
  });

  it('should reject if passing rejected promise', async function () {
    try {
      await timeout(Promise.reject('rejected'), 0);

      assert.ok(false);
    } catch (error) {
      assert.equal(error, 'rejected');
    }
  });

  it('should resolve if one promise resolves before other', async function () {
    const result = await timeout(sleep(50), 100);

    assert.notEqual(result, 'timed out');
  });

  it('should reject if one promise rejects before other', async function () {
    try {
      await timeout(sleep(100), 50);

      assert.ok(false);
    } catch (error) {
      assert.equal(error, 'timed out');
    }
  });
});
