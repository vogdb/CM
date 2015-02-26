var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var rimraf = require('rimraf');

var buildOutputPath = path.join(__dirname, 'webpack_output');
rimraf.sync(buildOutputPath);

/**
 * 1. We can not keep the same `before-body`, `after-body` structure as we want modules to be loaded only when they are needed. That is why we need define a core vendor module that is required by CM_View_Abstract hierarchy. The rest of vendor modules should be defined as standalone singular units.
 * 2. As the result we need only one directory for vendor libraries cause they would have a dependency tree among them. Also we don't need to prefix the core libraries with digit prefixes.
*/
module.exports = {
  entry: {
    core: ['modernizr', 'jserror', 'jquery', 'underscore', 'backbone']
    ,CM_Page_Example: './library/CM/Page/Example.js'
  }
  ,resolve: {
    modulesDirectories: [].concat(glob.sync('./client-vendor/after-body/*'), glob.sync('./client-vendor/before-body/*'))
  }
  //plugins: [
  //  new webpack.ProvidePlugin({
  //    '$': 'jquery',
  //    '_': 'underscore'
  //  })
  //  ,new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.bundle.js')
  //],
  ,module: {
    // Disable handling of unknown requires
    //unknownContextRegExp: /$^/,
    //unknownContextCritical: false
  },

  output: {
    path: buildOutputPath
    ,filename: '[name].js'
  }
};

/*
var path = require('path');
//var CommonsChunkPlugin = require('../../lib/optimize/CommonsChunkPlugin');
module.exports = {
  entry: {
    //pageA: './library/CM/Page/pageA',
    pageB: './library/CM/Page/pageB'
  },
  output: {
    path: path.join(__dirname, 'js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    //new CommonsChunkPlugin('commons.js')
  ]
}
*/
