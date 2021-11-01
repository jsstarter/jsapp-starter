const colors = require('colors');

let logger = {
  error: logError,
  warn: logWarn,
  info: logInfo,
  log: log
};

function logError(msg) {
  console.log(`ERROR: ${msg}`.red);
}

function logWarn(msg) {
  console.log(`WARN: ${msg}`.red);
}

function logInfo(msg) {
  console.log(`INFO: ${msg}`);
}

function log(msg) {
  console.log(msg);
}

exports.logger = logger;
