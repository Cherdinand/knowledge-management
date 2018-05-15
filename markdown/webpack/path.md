### context
context是webpack编译时的基础目录，entry、html入口、loader解析时都会相对于此目录。context应该配置为绝对路径.

其默认值就是webpack运行所在的目录，也就是package.json所在目录

info: context 有什么实际作用？官方文档的解释是使得你的配置独立于工程目录 「This makes your configuration independent from CWD (current working directory)」。怎么理解？举个例子，在分离开发生产配置文件时候，一般把 webpack.config 放到 build 文件夹下，此时 entry 却不用考虑相对于 build 目录来配置，仍然要相对于 context 来配置，这也就是所谓的独立于工程目录。

warning: 需要注意的是，output 的配置项和 context 没有关系，但是有些插件的配置项和 context 有关，后面会说明。

### entry
基本准则：`一个入口一个html页面`。SPA: one entry point, MPA: multiple entry points.
```js
entry: './src/index.js'  // SPA 单页面应用

// MPA  多页面应用
entry: {   
  home: "./home.js",
  about: "./about.js",
  contact: "./contact.js"
}
```

### output 
_path_

打包文件输出的目录，建议配置为绝对路径（相对路径不会报错），默认值和context的默认值一样，都是process.cwd()。

除了常规的配置方式，还可以在path中用使用 [hash] 模板，比如配置：

```js
output: {
    path: path.resolve('./dist/[hash:8]/'),
    filename: '[name].js'
}
```

这里的 hash 值是编译过程的 hash，如果被打包进来的内容改变了，那么 hash 值也会发生改变。这个可以用于版本回滚。你也可以配置为path.resolve(`./dist/${Date.now()}/`)方便做持续集成等。

_publicPath_






### html-webpack-plugin
``` js
new HtmlWebpackPlugin({
  title: 'Knowledge Management',
  template: './public/index.html',  // 相对于context设置的目录查找
  favicon: './public/favicon.png',  // 相对于context设置的目录查找 todo 好像只能用png格式的？
  filename: 'index.html',           // filename的路径是相对于 output.path
  alwaysWriteToDisk: true,
})
```




export const PathMeta = {
  anchors: [
    'context',
    'output',
  ]
}