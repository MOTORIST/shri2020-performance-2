const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['./js/main.js', './css/default.css', './css/main.css'],
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      minify: true,
    }),
    new MiniCssExtractPlugin({
        filename: 'style.css',
    }),
    new CopyPlugin([
        { from: './assets', to: './assets' },
        { from: './img', to: './img' },
        { from: './favicon.png', to: './' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false} },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
        ],
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ sourceMap: false}), new OptimizeCSSAssetsPlugin({})],
  },
};