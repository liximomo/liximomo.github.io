const path = require('path');

const projectPath = __dirname;

const config = {
  projectPath,
  src: `${projectPath}/src`,
  output: path.resolve(projectPath, '../js/page'),
  public: 'http://localhost:4001/js/dist/',
  pirvateModule: 'private_modules',
};

config.es6 = [
  config.src,
  /private_modules/i,
];

config.modules = [
  config.pirvateModule,
  'node_modules',
];

module.exports = config;
