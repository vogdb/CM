var webpack = require('webpack');
var glob = require('glob');

/**
 * 1. We can not keep the same `before-body`, `after-body` structure as we want modules to be loaded only when they are needed. That is why we need define a core vendor module that is required by CM_View_Abstract hierarchy. The rest of vendor modules should be defined as standalone singular units.
 * 2. As the result we need only one directory for vendor libraries cause they would have a dependency tree among them. Also we don't need to prefix the core libraries with digit prefixes.
*/
module.exports = {
  entry: {
    modernizr: ['./client-vendor/before-body/01-modernizr/modernizr.js']
    ,jserror: ['./client-vendor/after-body/00-jserror/jserror.js']
    ,jquery: ['./client-vendor/after-body/10-jquery/jquery.js']
    ,underscore: ['./client-vendor/after-body/20-underscore/underscore.js']
    ,backbone: ['./client-vendor/after-body/30-backbone/backbone.js']
    ,'jquery.ui.widget': ['./client-vendor/after-body/40-jquery.ui.widget/jquery.ui.widget.js']
    ,'jquery.fileUpload': glob.sync('./client-vendor/after-body/jquery.fileUpload/*.js')
    //CM_Page_Abstract: './library/CM/Page/Abstract.js',
    ,CM_Page_Example: './library/CM/Page/Example.js'
    //, afterBody: glob.sync('./client-vendor/after-body/**/*.js')
  }
  ,resolve: {
    alias: {
      //'jquery.ui.widget': 'jquery.ui.widget'
      'jquery.ui.widget': __dirname + '/client-vendor/after-body/40-jquery.ui.widget/jquery.ui.widget.js'
    }
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
    unknownContextCritical: false
  },

  output: {
    path: __dirname + '/webpack_output'
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
