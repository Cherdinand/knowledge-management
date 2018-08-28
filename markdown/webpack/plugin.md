### plugin个人理解

> info

> 如我所知，loader是在webpack的编译阶段发挥作用的，可以将指定文件按照某个规则进行翻译。而plugin则在整个webpack流程中（参数初始化、编译、输出文件）都可以发挥作用，通过监听webpack广播的不同事件来执行不同的回调。

### 常用场景

1. 读取输出资源、代码块、模块及其依赖。
1. 监听文件的变化。
1. 修改输出资源。
1. 判断Webpack 使用了哪些插件。

### 最简单的plugin

Webpack 启动后，在读取配置的过程中会先执行new SimplestPlugin(options），初始化一个BasicPlugin 并获得其实例。在初始化compiler 对象后，再调用SimplestPlugin.apply(compiler）为插件实例传入compiler 对象。插件实例在获取到compiler 对象后，就可以通过compiler.plugin（事件名称，回调函数）监听到Webpack 广播的事件，并且可以通过compiler 对象去操作Webpack。

``` js
class SimplestPlugin {
  constructor(options){
    // 在构造函数中获取用户为该插件传入的配置options
  }
  
  apply(compiler){
    // webpack会调用SimplestPlugin实例的apply()来为插件实例传入compiler对象
    // 然后通过调用compiler.plugin()来监听webpack广播的事件
    compiler.plugin('compilation', function(compilation){
      // 监听到事件之后的回调，plugin真正干活的地方
    })
  }
}
module.exports = SimplestPlugin;  // 最后导出这个插件
```

### compiler和compilation

1. Compiler 对象包含了Webpack 环境的所有配置信息，包含options 、loaders 、plugins等信息。这个对象在Webpack 启动时被实例化，它是全局唯一的，可以简单地将它理解为Webpack 实例。
1. Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当Webpack以开发模式运行时，每当检测到一个文件发生变化，便有一次新的Compilation 被创建。Compilation 对象也提供了很多事件回调供插件进行扩展。通过Compilation也能读取到Compiler 对象。

`Compiler 和Compilation 的区别在于： Compiler 代表了整个Webpack 从启动到关闭的生命周期，而Compilation 只代表一次新的编译。`

### 注意事项

1. 只要能拿到Compiler 或Compilation 对象，就能广播新的事件，所以在新开发的插件中也能广播事件，为其他插件监听使用。
1. 传给每个插件的Compiler 和Compilation 对象都是同一个引用。也就是说，若在一个插件中修改了Compiler或Compilation 对象上的属性，就会影响到后面的插件。
1. 有些事件是异步的，这些异步的事件会附带两个参数，第2 个参数为回调函数，在插件处理完任务时需要调用回调函数通知Webpack,才会进入下一个处理流程。

``` js
compiler.plugin('emit', function(compilation, callback) {
  // 支持处理逻辑
  // 处理完毕后执行callback 以通知Webpack，如果不执行callback，运行流程将会一直卡在这里而不往后执行。
  callback();
});
```

export const PluginMeta = {
  anchors: [
    'plugin个人理解',
    '常用场景',
    '最简单的plugin',
    'compiler和compilation',
    '注意事项',
  ]
}