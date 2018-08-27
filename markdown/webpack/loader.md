loader就是一个export出来的function，这个函数接受的参数是源文件的字符串，返回经过“翻译”后的字符串。

这个过程可以是异步的。

在函数内部，可以通过this获得loader API上的内容。

调用this.callback()之后需要return undefined ， 也可以直接return this.callback() 因为this.callback()返回的就是undefined。

### webpack提供给loader的常用API

1. 获得loader的options

```js
const loaderUtils =require (’ loader-utils ’);
module.exports = function(source){
  const options = loaderUtils.getOptions(this);  
  return source;
}
```

2. 返回除了转换后的内容之外的其他数据

```js
module. exports = function (source) {
  // 通过this.callback 告诉Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当我们使用this.callback 返回内容时，该Loader 必须返回undefined,
  // 以让Webpack 知道该Loader 返回的结果在this.callback 中，而不是return 中
  return;
}
```

3. 存在异步操作的loader

``` js
module.exports = function(content) {
    var callback = this.async();  // 告诉Webpack 本次转换是异步的， Loader 会在callback 中回调结果
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);  // 通过callback 返回异步执行后的结果
    });
};
```

4. 缰存加速

在某些情况下，有些转换操作需要大量的计算，非常耗时，如果每次构建都重新执行重复的转换操作，则构建将会变得非常缓慢。为此， Webpack 会默认缓存所有Loader 的处理结果，也就是说在需要被处理的文件或者其依赖的文件没有发生变化时，是不会重新调用对应的Loader 去执行转换操作的。

如果我们想不让webpack缓存该loader处理的结果，可以这么做：

```js
module.exports = function(source) {
  // 关闭该Loader 的缓存功能
  this. cacheable(false);
  return source;
}
```

### 其他loader API

1. this.context ： 当前处理的文件所在的目录，假如当前Loader 处理的文件是/src/main.js ，则this.context 等于/src 。
1. this.resource ：当前处理的文件的完整请求路径，包括querystring，例如/src/main.js?name=1。
1. this.resourcePath ：当前处理的文件的路径，例如/src/main.js。
1. this.resourceQuery ：当前处理的文件的querystring。
1. this.target ：等于Webpack 配置中的Target ，具体内容请参见2.7 节。
1. this.loadModule ：但Loader 在处理一个文件时，如果依赖其他文件的处理结果才能得出当前文件的结果，就可以通过this.loadModule(request: string, callback: function(err, source, sourceMap, module))去获取request对应的文件的处理结果。
1. this.resolve ：像require 语句一样获得指定文件的完整路径，使用方法为resolve(context : string , request: string, callback : function(err, result: string))。
1. this.addDependency ：为当前处理的文件添加其依赖的文件，以便其依赖的文件发生发生变化时，重新调用Loader 处理该文件。使用方法为addDependency (file:string)。
1. this.addContextDependency ：和addDependency 类似，但addContextDependency 是将整个目录加入当前正在处理的文件的依赖中。使用方法为addContextDependency (directory : string)。
1. this.clearDependencies ：清除当前正在处理的文件的所有依赖，使用方法为clearDependencies()。
1. this.emitFile ：输出一个文件，使用方法为emitFile(name: string ,content: Buffer | string , sourceMap: {...})。

### loader链式调用

当链式调用多个 loader 的时候，请记住它们会以相反的顺序执行。取决于数组写法格式，从右向左或者从下向上执行。
 
1. 最后的 loader 最早调用，将会传入原始资源内容。

2. 第一个 loader 最后调用，期望值是传出 JavaScript 和 source map（可选）。

3. 中间的 loader 执行时，会传入前一个 loader 传出的结果。

``` js 
{
  test: /\.scss$/,  
  use: [{
    loader: "style-loader"  // 最后调用。拿到css-loader编译之后的css内容字符串
  }, {
    loader: "css-loader",  // 拿到sass-loader编译之后的css内容字符串
    options: {
      modules: true, 
      localIdentName: '[local]__[hash:base64:8]',
    }
  }, {
    loader: "sass-loader",  // 最早调用。传入scss文件的原始内容的字符串
    options: {
      includePaths: [`${path.resolve(__dirname,'src')}`]
    }
  }]
}
```

`loader 可以被链式调用意味着不一定要输出 JavaScript。只要下一个 loader 可以处理这个输出，这个 loader 就可以返回任意类型的模块。`

如果一个 loader 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 loaders 无效，以及在观察模式(watch mode)下重编译。下面是一个简单示例，说明如何使用 addDependency 方法实现上述声明：  
```js 
import path from 'path';

export default function(source) {
  var callback = this.async();
  var headerPath = path.resolve('header.js');

  this.addDependency(headerPath);  // 将外部资源的路径传入

  fs.readFile(headerPath, 'utf-8', function(err, header) {
    if(err) return callback(err);
    callback(null, header + "\n" + source);
  });
};
```

### 加载本地loader

情景： 如果我们在本地开发一个loader，想在项目中测试一下效果。

我们平常使用别人写好的loader时，使用的Loader 都是通过Npm 安装的，在使用Loader 时会直接使用Loader 的名称。

因为我们需要确保编写的Loader 的源码在node modules 目录下。为此需要先将编写的Loader 发布到Npm 仓库， 再安装到本地项目中使用。

很明显，这对于本地开发loader并测试效果的时候很不方便，因为我们的loader可能需要多次修改，这意味着可能需要多次发布到npm仓库。

所以，我们有以下两种方法：

1. npm link

对loader新开一个项目，然后通过npm link的方式引入。由于npm link是软链接，我们对loader项目的代码更改可以直接使用。

2. resolveLoader

这是webpack的一个配置项，用来告诉webpack如何寻找loader。默认情况下会在node_modules里寻找，我们可以在需要用到自己编写的loader的项目的根目录创建一个loaders文件夹，用来防止loader。然后在resolveLoader中添加此文件夹的路径。

```js
module .exports = {
  resolveLoader:{
    // 去哪些目录下寻找Loader ，有先后顺序之分。Webpack 会先去node_modules 项目下寻找Loader ，如果找不到，则再去./loaders/目录下寻找。
    modules :[’node_modules ’,’./loaders/’],
  }
}
```


export const LoaderMeta = {
  anchors: [
    'webpack提供给loader的常用API',
    '其他loader API',
    'loader链式调用',
    '加载本地loader'
  ]
}