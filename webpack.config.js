const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const highlight = require('remark-highlight.js')
const html = require('remark-html');

module.exports = {
  entry: path.resolve(__dirname,'src/index.js'),
  
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  
  devtool: 'eval-source-map',
  
  devServer: {
    contentBase: './public', // 会在设置的目录下创建本地服务器，然后使用目录下的index.html文件
    inline: true,  // todo inline只能做到在更改代码的时候刷新整个页面，HMR可以做到不刷新页面，只刷新内容。所以后面还是要加上HMR，hot要搭配webpack插件使用
  },
  
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'common'),
      markdown: path.resolve(__dirname, 'markdown'), // 给一个路径使用别名代替，这样在引用的时候就可以省略../  如import Class from 'markdown/class';
    },
    
    extensions: [".js", ".json", ".jsx", ".css", ".md"],
  },
  
  module: {
    rules: [{
      test: /\.scss$/,  // 项目中使用的css预处理语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          modules: true, // 对sass文件开启css modules
          localIdentName: '[local]__[hash:base64:8]',
        }
      }, {
        loader: "sass-loader",
        options: {
          includePaths: [`${path.resolve(__dirname,'src')}`]
        }
      }]
    }, {
      test: /\.(less|css)$/,  // antd样式依赖使用的less语言
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "less-loader",
        options: {
          paths: [
            path.resolve(__dirname, 'node_modules')
          ],
          javascriptEnabled: true
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
      use: [
        'babel-loader',
        {
          loader: '@mdx-js/loader',
          options: {
            // mdPlugins: [highlight,html]
            // hastPlugins: [highlight,html]
          }
        }
      ],
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