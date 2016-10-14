'use strict';

const Promise = require('bluebird');
const request = require('request');
const moment = require('moment');
const fs = require('fs');
const os = require('os');

let writeStream;
let interval;

let _logFile;
let _requestUrl;
let _requestTimeout;
let _requestInterval;

/**
 *
 * @private
 */
function _test() {
    return new Promise((resolve, reject) => {
        request(_requestUrl, {timeout: _requestTimeout, time: true}, (err, res) => {
            if (err || res.statusCode !== 200) {
                return reject(err || new Error(`Failed with status ${res.statusCode}`));
            }

            resolve(res.elapsedTime);
        });
    });
}

/**
 *
 * @param data
 * @private
 */
function _persist(data) {
    console.log(data);
    writeStream.write(data + os.EOL);
}

/**
 *
 * @private
 */
function _start() {
    const errorTypes = {
        'ENOTFOUND': {
            type: 'D',
            message: 'DNS Can\'t resolve host'
        },
        'ENOENT': {
            type: 'N',
            message: 'Network error'
        },
        'ETIMEDOUT': {
            type: 'T',
            message: 'Request timed out'
        }
    };

    writeStream = fs.createWriteStream(_logFile, {encoding: 'utf8', flags: 'a', mode: '0666'});
    interval = setInterval(() => {
        const promise = _test();
        promise.then(et => _persist(`#S ${moment().format('DD/MM/YYYY hh:mm:ss')}: Succeeded in ${et}ms`));
        promise.catch(err => {
            const error = errorTypes[err.code];
            _persist(`#${error.type} ${moment().format('DD/MM/YYYY hh:mm:ss')}: ${error.message}: ${err.message}`);
        });
    }, _requestInterval);
}

/**
 *
 * @private
 */
function _stop() {
    if (writeStream) {
        writeStream.end();
    }
    clearInterval(interval);
}

process.on('SIGINT', _stop);
process.on('unhandledRejection', err => {
   // DO NOTHING
});

module.exports = args => {
    _logFile = args.logFile || './LOG.txt';
    _requestUrl = args.requestUrl || 'http://www.google.com';
    _requestTimeout = args.requestTimeout || 2000;
    _requestInterval = args.requestInterval || 5000;

    return {
        start: _start,
        stop: _stop
    }
};
