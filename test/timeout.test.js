const { assert } = require('chai');
const { sleep, timeout } = require('../timeout');

/**
 * Sleep
 */

describe('sleep', () => {
  let startTime;

  beforeEach(() => {
    startTime = Date.now();
  });

  it('should sleep at least 0ms', async () => {
    await sleep(0);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 0);
  });

  it('should sleep at least 50ms', async () => {
    await sleep(50);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 50);
  });

  it('should sleep no more 100ms', async () => {
    await sleep(75);

    const endTime = Date.now();

    const timePassed = endTime - startTime;

    assert.operator(timePassed, '>=', 75);
  });
});

/**
 * Timeout
 */

describe('timeout', () => {
  it('should resolve if passing resolved promise', async () => {
    const result = await timeout(Promise.resolve('resolved'), 0);

    assert.equal(result, 'resolved');
  });

  it('should reject if passing rejected promise', async () => {
    try {
      await timeout(Promise.reject(new Error('rejected')), 0);

      assert.ok(false);
    } catch (error) {
      assert.equal(error && error.message, 'rejected');
    }
  });

  it('should resolve if one promise resolves before other', async () => {
    const result = await timeout(sleep(50), 100);

    assert.notEqual(result, 'timed out');
  });

  it('should reject if one promise rejects before other', async () => {
    try {
      await timeout(sleep(100), 50);

      assert.ok(false);
    } catch (error) {
      assert.equal(error && error.message, 'timed out');
    }
  });
});
