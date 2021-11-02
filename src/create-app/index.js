const process = require('process');
const path = require('path');
const fs = require('fs');
const { Command, Option } = require('commander');
const shell = require('shelljs');
const Sqrly = require('squirrelly');

const { logger } = require('../utils');

const gitRepo = 'https://github.com/jsstarter/cra-express-ts-starter.git';
const typeChoices = ['fullstack', 'react', 'express'];

if (!shell.which('git')) {
  logger.error('git is not installed, please check and install git.');
  process.exit(1);
}

function getGitAuthor() {
  let gitUserName = '';
  try {
    const result = shell.exec('git config user.name', { silent: true }).stdout;
    gitUserName = result.trim();
  } catch (err) {
    logger.warn('Unable to get git Author information.');
  }
  return gitUserName;
}

const gitAuthor = getGitAuthor();

function checkAndCreateAppDir(projectDir) {
  const curDir = process.cwd();
  const appDir = path.join(curDir, projectDir);
  try {
    fs.mkdirSync(appDir);
  } catch (err) {
    if (err.code === 'EEXIST') {
      logger.error(`Directory ${projectDir} already exists. Please provide another name.`);
    } else {
      logger.error(err);
    }
    process.exit(1);
  }
  return appDir;
}

function cloneRepository(projectDir) {
  logger.info('Cloning template git repository');
  if (shell.exec(`git clone --depth 1 ${gitRepo} ${projectDir}`).code !== 0) {
    logger.error('Unable to clone template git repository.');
    process.exit(1);
  }
}

function cleanupFiles(appDir) {
  logger.info('Cleaning up folder');
  shell.cd(`${appDir}`);
  shell.rm('-rf', '.git');
  shell.rm('-f', 'README.md');
  shell.rm('-f', 'LICENSE');
  shell.rm('-f', 'package-lock.json');
  shell.rm('-f', 'client/package-lock.json');
  shell.rm('-f', 'server/package-lock.json');
}

function fixPackageJson(projectDir, appDir, packageJsonFilePath = '') {
  const packageFilePath = packageJsonFilePath ? `${packageJsonFilePath}/package.json` : 'package.json';
  logger.info(`Updating ${projectDir}/${packageFilePath}`);
  const jsonString = fs.readFileSync(`${appDir}/${packageFilePath}`, 'utf-8');
  let packageInfo = JSON.parse(jsonString);
  packageInfo = Object.assign(packageInfo, {
    name: packageJsonFilePath ? packageInfo.name : projectDir,
    author: gitAuthor,
    license: '',
    description: '',
  });
  fs.writeFileSync(`${appDir}/${packageFilePath}`, JSON.stringify(packageInfo, null, 2), 'utf-8');
}

function subProjectFolder(options) {
  let subProject = '';

  if (/react/i.test(options.type)) {
    subProject = 'client';
  } else if (/express/i.test(options.type)) {
    subProject = 'server';
  }
  return subProject;
}

function setSubProjectAsMain(projectDir, appDir, options) {
  const subProject = subProjectFolder(options);

  if (subProject) {
    logger.info(`Setting up ${options.type} as main project.`);
    shell.cd(`${appDir}`);
    shell.ls().forEach((file) => {
      if (file !== '.gitignore' && file !== subProject) {
        shell.rm('-rf', file);
      }
    });
    shell.cp('-R', `${subProject}/*`, '.');
    shell.rm('-rf', subProject);
  }
}

function generateReadme(projectDir, appDir, options) {
  const subProject = subProjectFolder(options);
  const readmeTemplateFile = path.join(__dirname, '../templates/README.md');
  const readmeTemplate = fs.readFileSync(readmeTemplateFile, 'utf-8');
  const data = { projectDir, subProject };
  const readme = Sqrly.render(readmeTemplate, data);
  fs.writeFileSync(`${appDir}/README.md`, readme);
}

function installNpmPackages(appDir) {
  shell.cd(`${appDir}`);
  logger.info('Installing npm packages');
  if (shell.exec('npm install').code !== 0) {
    logger.error('npm install failed. Please clean up app folder and retry.');
    process.exit(1);
  }
}

function processCommand(projectDir, options) {
  const appDir = checkAndCreateAppDir(projectDir);

  cloneRepository(projectDir);
  cleanupFiles(appDir);

  fixPackageJson(projectDir, appDir);
  fixPackageJson(projectDir, appDir, 'client');
  fixPackageJson(projectDir, appDir, 'server');

  setSubProjectAsMain(projectDir, appDir, options);
  generateReadme(projectDir, appDir, options);

  if (!options.skipNpmInstall) {
    installNpmPackages(appDir);
  }

  logger.log('Finished Creating App.', 'You can now start by running npm install --workspace=client');
}

const command = new Command('create-app');
command
  .argument('<project-dir>')
  .addOption(new Option('-t, --type <type>', 'Project type').choices(typeChoices).default(typeChoices[0]))
  .addOption(new Option('-s, --skip-npm-install', 'Skip npm install').default(false))
  .description('Create javascript project')
  .action(processCommand);

module.exports = command;
