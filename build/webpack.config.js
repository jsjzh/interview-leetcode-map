const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const utils = require('./utils')

const IP = utils.getIPAdress()
const POTR = 8888

module.exports = {
  context: utils.resolve('./'),
  mode: 'development',
  entry: {
    app: ['babel-polyfill', './src/index.js']
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: utils.resolve('dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': utils.resolve('src'),
      static: utils.resolve('static'),
      type: utils.resolve('src/types')
    }
  },
  module: {
    rules: [
      { test: /\.html$/, use: { loader: 'html-loader' } },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/,
        include: [utils.resolve('src'), utils.resolve('node_modules/webpack-dev-server/client')]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] }
    ]
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    port: POTR,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    quiet: true,
    host: IP,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      clearConsole: true,
      compilationSuccessInfo: {
        messages: [`你的项目在这里吼~ (╯‵□′)╯︵ http://${IP}:${POTR}`]
      },
      onErrors: utils.createNotifierCallback()
    })
  ]
}
