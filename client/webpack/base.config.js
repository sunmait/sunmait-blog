const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development';

const app = path.resolve('src/');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [app, 'node_modules'],
  },
  output: {
    path: path.resolve('../server/API/public', env),
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1, minimize: true}},
          'less-loader',
        ],
        exclude: [/node_modules/, /public/],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { minimize: true } },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(app, 'index.html'),
      favicon: 'src/favicon.ico',
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true,
    }),
  ],
};