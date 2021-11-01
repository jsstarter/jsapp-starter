const process = require('process');
const { Command } = require('commander');

const packageJson = require('../package.json');
const createAppCommand = require('./create-app');

const program = new Command();
program.version(packageJson.version);
program.addCommand(createAppCommand);

function start() {
  program.parse(process.argv);
}

module.exports = {
  start,
};
