const path = require('path');
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');//生成index.html页面
const config = require('./config');
const utils = require('./build/utils')
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH,'src');
const BUILD_PATH = path.resolve(ROOT_PATH,'dist');

module.exports = {
  context: ROOT_PATH,
  entry: {
    main: ['./src/main.js'],
    vendor: [
      'tween.js',
      'three',
      'react',
      'react-dom'
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  devtool: 'source-map',
  target: 'web',
  module: {
    rules: [
      /*{
        test: /\.(jsx)$/,
        use:[
          'eslint-loader'
        ],
        include: APP_PATH
      },*/
      {
        test:/\.(js|jsx)$/,
        include: [
          "node_modules",
          APP_PATH
        ],
        loader: "babel-loader",
        options: {
          presets: ["es2015", 'stage-2'],
          plugins: [
            ['import', [{ libraryName: "antd", style: "css" }]],
          ],
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
           {
             loader: 'css-loader',
             options: {
               modules: false,
               minimize:true,
               name: utils.assetsPath('css/[name].[hash:7].[ext]')
             }
           }
         ],
      },
      {
        test: /^(obj)\-.+\.(png)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('obj/maps/[name].[ext]')
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
      {
        test: /\.(json)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('json/[name].[ext]')
        }
      },
      {
        test: /\.(obj|mtl)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('obj/[name].[ext]')
        }
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      APP_PATH
    ],
    extensions: [".js", '.jsx', '.less', ".json", ".css"]
  },
  devServer: {
    port:8082,
    proxy: { // proxy URLs to backend development server
      '/assets':{
        target: "http://localhost:8082",
        pathRewrite: {"^/assets" : "src/assets"}
      },
      '/api':{
        target: "http://localhost:8084",
        pathRewrite: {"/api" : ""}
      }
    },
    contentBase: path.join(__dirname), // boolean | string | array, static file location
    compress: false, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    //hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    inline: true,
    https: false, // true for self-signed, object for cert authority
    noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new HtmlwebpackPlugin({
      title:'THREE',
      template: 'index.html',
      inject: 'body',
      hash:true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        filename:'vendor.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};
