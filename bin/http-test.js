#!/usr/bin/env node

'use strict';

const args = process.argv.slice(2);
const logFile = findArg(args, ['-l', '--l']);
const requestUrl = findArg(args, ['-u', '--u']);
const requestTimeout = findArg(args, ['-t', '--t']);
const requestInterval = findArg(args, ['-i', '--i']);

function findArg(args, names) {
    let found;
    for (let i = 0, len = args.length; i < len; i++) {
        const arg = args[i];
        if (names.indexOf(arg) > -1) {
            found = args[i + 1];
            break;
        }
    }
    return found;
}

require('../index.js')({
    logFile: logFile,
    requestUrl: requestUrl,
    requestTimeout: requestTimeout,
    requestInterval: requestInterval
}).start();