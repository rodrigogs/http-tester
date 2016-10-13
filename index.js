'use strict';

const Promise = require('bluebird');
const request = require('request');
const moment = require('moment');
const fs = require('fs');
const os = require('os');

let writeStream;
let interval;

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
    interval = setInterval(() => {
        const promise = _test();
        promise.then(et => _persist(`#S ${moment().format('DD/MM/YYYY hh:mm:ss')}: Succeeded in ${et}ms`));
        promise.catch(err => _persist(`#E ${moment().format('DD/MM/YYYY hh:mm:ss')}: ${err.message}`));
    }, _requestInterval);

    process.on('SIGINT', _stop);
    process.on('unhandledRejection', err => {
       // DO NOTHING
    });
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

module.exports = args => {
    const logFile = args.logFile || './LOG.txt';
    _requestUrl = args.requestUrl || 'http://www.google.com';
    _requestTimeout = args.requestTimeout || 2000;
    _requestInterval = args.requestInterval || 5000;

    writeStream = fs.createWriteStream(logFile, {encoding: 'utf8', flags: 'a', mode: '0666'});

    return {
        start: _start,
        stop: _stop
    }
};