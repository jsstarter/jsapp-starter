const chalk = require('chalk');

function logError(msg) {
  console.log(chalk.red(`ERROR: ${msg}`));
}

function logWarn(msg) {
  console.log(chalk.warn(`WARN: ${msg}`));
}

function logInfo(msg) {
  console.log(`INFO: ${msg}`);
}

function log(msg) {
  console.log(msg);
}

const logger = {
  error: logError,
  warn: logWarn,
  info: logInfo,
  log,
};

exports.logger = logger;
