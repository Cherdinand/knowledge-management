/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const remarkHighlight = require('remark-highlight.js');
const ESlintPlugin = require('eslint-webpack-plugin');
/* eslint-enable */

module.exports = {
  devtool: 'eval-source-map',
  context: process.cwd(), // 设置入口文件的上下文为D:\knowledge-management，默认值为package.json文件所在目录

  entry: ['babel-polyfill', './src/index.tsx'], // 相对于context设置的目录查找

  output: {
    path: path.resolve('./dist/assets/'), // 所有打包后的静态资源资源放在这个目录下
    filename: 'js/[name].js', // js 打包后js的文件放在哪个目录下面  [name].js 打包后的js文件的文件名
    chunkFilename: '[name].bundle.js',
    publicPath: '/assets/', // 此选项指定浏览器中引用的输出目录的公用URL。
  },

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /^\//, to: '/assets/index.html' }],
    },
    publicPath: '/assets/',
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    // contentBase: path.resolve(__dirname, 'dist/assets'), // 会在设置的目录下创建本地服务器，然后使用目录下的index.html文件
  },

  resolve: {
    alias: {
      '@/src/router': path.resolve(__dirname, 'src/router'),
      '@/src/components': path.resolve(__dirname, 'src/components'),
      '@/src/cherComponents': path.resolve(__dirname, 'src/cherComponents'),
      '@/src/utils': path.resolve(__dirname, 'src/utils'),
      '@/markdown': path.resolve(__dirname, 'markdown'), // 给一个路径使用别名代替，这样在引用的时候就可以省略../  如import Class from '@/markdown/class';
      '@/common': path.resolve(__dirname, 'common'),
    },

    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.css', '.md'],
  },

  optimization: {
    minimize: false, // 禁止production模式下的TerserPlugin压缩默认开启
  },

  module: {
    rules: [
      {
        test: /\.scss$/, // 项目中使用的css预处理语言
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // 对sass文件开启css modules
              localIdentName: '[local]__[hash:base64:8]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [`${path.resolve(__dirname, 'src')}`],
            },
          },
        ],
      },
      {
        test: /\.(less|css)$/, // antd样式依赖使用的less语言
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'node_modules')],
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.md$/,
        use: [
          'babel-loader',
          {
            loader: '@mdx-js/loader',
            options: {
              mdPlugins: [remarkHighlight],
              // hastPlugins: [html]
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]', // 相对于output.path
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESlintPlugin({
      extensions: ['js', 'jsx', 'tsx', 'ts'],
      fix: true,
      threads: 3,
      emitError: false,
    }),
    new HtmlWebpackPlugin({
      title: 'Knowledge Management',
      favicon: './public/favicon.ico', // 相对于context设置的目录查找
      template: './public/index.html', // 相对于context设置的目录查找
      filename: 'index.html', // filename的路径是相对于 output.path
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
