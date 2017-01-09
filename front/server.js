const glob = require('glob');
const Express = require('express');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const NODE_ENV = require('./env').NODE_ENV;
const isProd = process.env.NODE_ENV === NODE_ENV.PRODUCTION;

const webpackConfig = isProd ? require('./webpack.config.prod') : require('./webpack.config.dev');
const pathCfg = require('./path.cfg');

const program = require('commander');

// 处理命令行参数
program
  .version('1.0.0')
  .usage('[entry ...]')
  .parse(process.argv);

// console.log('args: %j', program.args);

let entryNames = null;
if (program.args.length > 0) {
  entryNames = program.args;
}

function getEntryGlobPattern(names) {
  return  names
    ? `${pathCfg.src}/entry/+(${names.join('|')}).js`
    : `${pathCfg.src}/entry/*.js`;
}

const entryGlobPattern = getEntryGlobPattern(entryNames);

// config entry and output
let inculdes = [];
if (isProd) {
  // do nothing
} else {
  inculdes = ['webpack-hot-middleware/client?reload=true&path=//localhost:4001/__webpack_hmr'];
}

const entryFiles = glob.sync(entryGlobPattern);
const entry = entryFiles.reduce((entries, filePath) => {
  const basename = path.basename(filePath);
  const entryName = basename.split('.')[0];
  entries[entryName] = inculdes.concat(filePath);
  return entries;
}, {});
webpackConfig.entry = entry;
console.log('entries :\n', entry);
const compiler = webpack(webpackConfig);

// Initialize the Express App
const app = new Express();

if (isProd) {
  compiler.run(function(err, stats) {
    if(err) throw new Error("webpack", err);
    const jsonStats = stats.toJson();
    let log = stats.toString();
    console.log(log);
  });
} else {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true, 
    // colors: true,
    publicPath: pathCfg.public
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(pathCfg.public, Express.static(pathCfg.output));

const port = 4001;

app.listen(port, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  }
  console.log(`app is running on http://localhost:${port}`);
});
