/**
 * @desc Reject in 't' milliseconds,
 * or it will be resolved/rejected depending on result of 'p' promise.
 *
 * @param {Promise} p
 * @param {number} t
 * @returns {Promise}
 */
function timeout(p, t) {
  const failure = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('timed out')), t);
  });

  return Promise.race([failure, p]);
}

/**
 * @desc Set timeout for a given interval.
 *
 * @param {number} interval
 * @returns {Promise}
 */
function sleep(interval) {
  return new Promise(resolve => setTimeout(
    () => {
      console.log(`slept for ${interval} ms`);
      resolve();
    },
    interval,
  ));
}

exports.sleep = sleep;
exports.timeout = timeout;
