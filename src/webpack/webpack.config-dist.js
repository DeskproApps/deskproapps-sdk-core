const path = require('path');
const dpatRootPath = require.resolve('@deskproapps/dpat').split('dpat').shift().concat('dpat');

const webpack = require('@deskproapps/dpat/node_modules/webpack');
const ManifestPlugin = require('@deskproapps/dpat/node_modules//webpack-manifest-plugin');
const ChunkManifestPlugin = require('@deskproapps/dpat/node_modules/chunk-manifest-webpack-plugin');
const WebpackChunkHash = require('@deskproapps/dpat/node_modules/webpack-chunk-hash');

const BuildUtils = require('./BuildUtils');
const PROJECT_ROOT_PATH = path.resolve(__dirname, '../../');
const PRODUCTION = !process.env.NODE_ENV || process.env.NODE_ENV === 'production';
const SLIM_PACKAGE = process.env.DPA_PACKAGE_MODE === 'slim';
const STANDALONE_PACKAGE = process.env.DPA_PACKAGE_MODE === 'standalone';

const commonPlugins = [
  new webpack.DefinePlugin({PRODUCTION: PRODUCTION}),
  // for stable builds, in production we replace the default module index with the module's content hash
  (PRODUCTION ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin()),
  (PRODUCTION
      ? new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {unused: true, dead_code: true, warnings: false}
      })
      : null
  ),
].filter(function (entry) {
  return entry !== null
});

const configParts = [];
configParts.push({
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(PROJECT_ROOT_PATH, 'src/main/javascript'),
        ]
      },
      {test: /\.(html?|css)$/, loader: 'raw-loader'}
    ]
  },
  plugins: [],
  resolve: {
    modules: ["node_modules", path.join(dpatRootPath, "node_modules")],
    extensions: ['*', '.js', '.jsx', '.scss', '.css']
  },
  resolveLoader: {
    modules: [path.join(dpatRootPath, "node_modules")],
  },
  stats: 'verbose',
  bail: true
});

if (STANDALONE_PACKAGE) {
  configParts.push({
    entry: path.resolve(PROJECT_ROOT_PATH, 'src/main/javascript/index.js'),
    output: {
      libraryTarget: 'umd',
      umdNamedDefine: true,
      library: 'DeskproAppsSDKCore',

      pathinfo: !PRODUCTION,
      chunkFilename: BuildUtils.artifactName('.js'),
      filename: BuildUtils.artifactName('.js'),
      path: path.resolve(PROJECT_ROOT_PATH, 'dist')
    },
    plugins: commonPlugins.concat([])
  });
} else if (SLIM_PACKAGE) {
  configParts.push({
    entry: {
      slim: [path.resolve(PROJECT_ROOT_PATH, 'src/main/javascript/index.js')],
      vendor: ['post-robot', 'eventemitter3', 'element-resize-detector', 'get-size'],
    },
    output: {
      pathinfo: !PRODUCTION,
      chunkFilename: BuildUtils.artifactName('[name].js'),
      filename: BuildUtils.artifactName('[name].js'),
      path: path.resolve(PROJECT_ROOT_PATH, 'dist')
    },
    plugins: commonPlugins.concat([
      // replace a standard webpack chunk hashing with custom (md5) one
      new WebpackChunkHash(),
      // vendor libs + extracted manifest
      new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'manifest'], minChunks: Infinity}),
      // export map of chunks that will be loaded by the extracted manifest
      new ChunkManifestPlugin({
        filename: BuildUtils.artifactName('manifest.json'),
        manifestVariable: 'DeskproAppsCoreManifest'
      }),

      // mapping of all source file names to their corresponding output file
      new ManifestPlugin({fileName: BuildUtils.artifactName('asset-manifest.json')}),
    ]),
  });
}

module.exports = Object.assign.apply(Object, configParts);
