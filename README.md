# http-tester

Simple library and created in a hurry to test and log HTTP requests.

## How to install?
Have node.js installed
> npm install http-tester --g

## Using Windows?
If you're having problems installing http-tester, try this
> npm install http-tester --g --ignore-scripts

## How to use?
> http-test -l /my/log/file/name -u http://my-url.com -t 2000 -i 5000

Args:
* -l: log file name [./LOG.txt]
* -u: url to request [http://www.google.com]
* -t: request timeout [2000]
* -i: request interval [5000]
