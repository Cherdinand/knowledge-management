### context
> info:

> context 有什么实际作用？官方文档的解释是使得你的配置独立于工程目录 「This makes your configuration independent from CWD (current working directory)」。怎么理解？举个例子，在分离开发生产配置文件时候，一般把 webpack.config 放到 build 文件夹下，此时 entry 却不用考虑相对于 build 目录来配置，仍然要相对于 context 来配置，这也就是所谓的独立于工程目录。

context是webpack编译时的基础目录，entry、html入口、loader解析时都会相对于此目录。context应该配置为绝对路径.

其默认值就是webpack运行所在的目录，也就是package.json所在目录

> warning:

> 需要注意的是，output 的配置项和 context 没有关系，但是有些插件的配置项和 context 有关，后面会说明。

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

这里的 hash 值是编译过程的 hash，如果被打包进来的内容改变了，那么 hash 值也会发生改变。这个可以用于版本回滚。你也可以配置为path.resolve(\`./dist/${Date.now()}/\`)方便做持续集成等。

_publicPath_

> info:

> ouput.publicPath会对打包后所有静态资源（img、font、js、css）的url引用添加公共路径，作用于开发环境（webpack-dev-server里打包后的文件保存在内存中也受ouput.publicPath的影响）和生产环境。

> This option tells it where on your server to load that bundle from.

> 静态资源最终访问路径 = output.publicPath + 资源loader或插件等配置路径

举例说明：
```js
output.publicPath = '/static/'

// 图片 url-loader 配置
{
    name: 'img/[name].[ext]'
}
// 那么图片最终的访问路径为
output.publicPath + 'img/[name].[ext]' = '/static/img/[name].[ext]'

// JS output.filename 配置
{
    filename: 'js/[name].js'
}
// 那么JS最终访问路径为 
output.publicPath + 'js/[name].js' = '/static/js/[name].js'

// CSS 
new ExtractTextPlugin("css/style.css")
// 那么最终CSS的访问路径为
output.publicPath + 'css/style.css' = '/static/css/style.css'
```

此项目相关配置：
``` js
output: {
  path: path.resolve('./dist/assets'),  // 说明打包后的资源放在哪个目录下
  filename: 'js/[name].js',             // js 打包后js的文件放在哪个目录下面  [name].js 打包后的js文件的文件名
  // chunkFilename: ""
  publicPath: "./assets/",             // 相对路径 ./assets/js/main.js  
  publicPath: "/assets/",              // 相对根路径 /assets/js/main.js  
  publicPath: "https://cdn.example.com/assets/", // 绝对路径 https://cdn.example.com/assets/js/main.js
}
```

warning: 一般情况下publicPath应该以'/'结尾，而其他loader或插件的配置不要以'/'开头

### webpack-dev-server

_publicPath_

这里的publicPath仅作用于开发环境，因此不会出现配置http地址的情况

webpack-dev-server 打包的内容是放在内存中，通过express匹配请求路径，然后读取对应的资源输出。这些资源对外的根目录就是publicPath，可以理解为和 outpu.path 的功能一样，将所有资源放在此目录下，在浏览器可以直接访问此目录下的资源。
 
`webpack-dev-server使用的是内存中的打包文件，并不是webpack命令打包后的路径（output.path）。`

`当你不配置devServer下的publicPath时，其会默认将包打到output.publicPath的路径下。`

`当你配置了devServer下的publicPath时，才会将包打开你指定的路径下。`

`所以一般情况下都要保证devServer中的publicPath与output.publicPath保持一致。`

_devServer.publicPath & devServer.contentBase_

devServer.contentBase 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。

devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。

### html-webpack-plugin

_template_

作用：用于定义模版文件的路径

相对于context设置的目录查找，webpack context的默认值为process.cwd()，即package.json文件所在目录

_filename_

作用：输出的HTML文件名，默认为index.html，可以直接配置带有子目录

`filename的路径是相对于output.path的，而在webpack-dev-server中，则是相对于webpack-dev-server配置的publicPath。`

如果webpack-dev-server的publicPath和output.publicPath不一致，在使用html-webpack-plugin可能会导致引用静态资源失败，因为在devServer中仍然以output.publicPath引用静态资源，和webpack-dev-server的提供的资源访问路径不一致，从而无法正常访问。

有一种情况除外，就是output.publicPath是相对路径，这时候可以访问本地资源

所以一般情况下都要保证devServer中的publicPath与output.publicPath保持一致。

``` js
new HtmlWebpackPlugin({
  title: 'Knowledge Management',
  template: './public/index.html',  // 相对于context设置的目录查找
  favicon: './public/favicon.png',  // 相对于context设置的目录查找 todo 好像只能用png格式的？
  filename: 'index.html',           // filename的路径是相对于 output.path，在 webpack-dev-server 中，则相对于 webpack-dev-server 配置的 publicPath。
})
```

http://www.qinshenxue.com/article/20170315092242.html

https://www.jianshu.com/p/cbe81be10d78

export const PathMeta = {
  anchors: [
    'context',
    'output',
    'webpack-dev-server',
    'html-webpack-plugin',
  ]
}