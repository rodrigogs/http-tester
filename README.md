# http-tester

[![npm version](https://badge.fury.io/js/http-tester.svg)](https://badge.fury.io/js/http-tester)
[![Code Climate](https://codeclimate.com/github/rodrigogs/http-tester/badges/gpa.svg)](https://codeclimate.com/github/rodrigogs/http-tester)

Simple Node.js library created in a hurry to test and log HTTP requests.

## How to install?
1. [Install Node.js](https://nodejs.org/en/)
2. From your console, execute: npm install http-tester --g

## Using Windows?
If you're having problems installing http-tester, try this
> npm install http-tester --g --ignore-scripts

## How to use?
> http-test -l /my/log/file/name -u http://my-url.com -t 2000 -i 5000

Arguments:
* -l: log file name [Default: ./LOG.txt]
* -u: url to request [Default: http://www.google.com]
* -t: request timeout [Default: 2000]
* -i: request interval [Default: 5000]
