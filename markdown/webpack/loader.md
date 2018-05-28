loader就是一个export出来的function，这个函数接受的参数是源文件的字符串，返回经过“翻译”后的字符串。

这个过程可以是异步的。

在函数内部，可以通过this获得loader API上的内容。

调用this.callback()之后需要return undefined ， 也可以直接return this.callback() 因为this.callback()返回的就是undefined。

异步loader如下：
``` js
module.exports = function(content) {
    var callback = this.async();  // 需要先获得异步callback
    someAsyncOperation(content, function(err, result) {
        if(err) return callback(err);
        callback(null, result);  // 在异步操作之后调取此异步callback
    });
};
```

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

export const LoaderMeta = {
  anchors: [
    'loader链式调用'
  ]
}