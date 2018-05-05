const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  devtool: 'eval-source-map',
  
  devServer: {
    contentBase: './public', // 会在设置的目录下创建本地服务器，然后使用目录下的index.html文件
    inline: true,  // todo inline只能做到在更改代码的时候刷新整个页面，HMR可以做到不刷新页面，只刷新内容。所以后面还是要加上HMR
  },
  
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [`${path.resolve(__dirname,'src')}`]
        }
      }]
    }, {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
      },
      exclude: /node_modules/
    }, {
      test: /\.md$/,
      use: ['babel-loader', '@mdx-js/loader']
    }]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Knowledge Management',
      template: './public/index.html',
      favicon: './public/favicon.png'  // todo 好像只能用png格式的？
    })
  ],
};