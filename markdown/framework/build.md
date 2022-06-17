### 构建效率

如果说开发是我们日常投入最多的工作，那么等待构建结果就是日常耗费最多的非开发时间了。这篇文章会列出影响到 webpack 构建时间的关键因素.并详细分析对应的解决方案和工具.

### 运行Webpack的两种方式

通常，在项目中有两种运行 Webpack 的方式：基于命令行的方式或基于代码的方式。

``` js
// 第一种：基于命令行的方式

webpack --config webpack.config.js

// 第二种：基于代码的方式
// 创建一个webpack.js文件
var webpack = require('webpack')

var config = require('./webpack.config')

webpack(config, (err, stats) => {})

// 然后在命令行
node webpack.js
```

### Webpack的基本工作流程

无论是基于命令行的方式还是基于代码的方式，背后都是调用了webpack.js中的 Webpack 函数。

``` js
// Webpack函数
const webpack = (options, callback) => {
  options = ... //处理options默认值
  let compiler = new Compiler(options.context) // 创建了一个compiler实例
  ... //处理参数中的插件等
  compiler.options = new WebpackOptionsApply().process(options, compiler); //分析参数，加载各内部插件
  ...
  if (callback) {
    ... 
    compiler.run(callback)  // compiler.run函数里面会实例化一个Compilation实例
  }
  return compiler
}
```

_Compiler.js 中的基本流程_

compiler.run(callback) 中的执行逻辑较为复杂，我们把它按流程抽象一下。抽象后的执行流程如下：

1. readRecords：读取构建记录，用于分包缓存优化，在未设置 recordsPath 时直接返回。
1. compile 的主要构建过程，涉及以下3 - 6环节：
1. newCompilationParams：创建 NormalModule 和 ContextModule 的工厂实例，用于创建后续模块实例。
1. newCompilation：创建编译过程 Compilation 实例，传入上一步的两个工厂实例作为参数。
compiler.hooks.make.callAsync：触发 make 的 Hook，执行所有监听 make 的插件（例如 SingleEntryPlugin.js 中，会在相应的监听中触发 compilation 的 addEntry 方法）。其中，Hook 的作用，以及其他 Hook 会在下面的小节中再谈到。
1. compilation.finish：编译过程实例的 finish 方法，触发相应的 Hook 并报告构建模块的错误和警告。
1. compilation.seal：编译过程的 seal 方法，下一节中我会进一步分析。
1. emitAssets：调用 compilation.getAssets()，将产物内容写入输出文件中。
1. emitRecords：对应第一步的 readRecords，用于写入构建记录，在未设置 recordsPath 时直接返回。
在编译器运行的流程里，核心过程是第二步编译。具体流程在生成的 Compilation 实例中进行，接下来我们再来看下这部分的源码逻辑。

_Compilation.js 中的基本流程_

这部分的源码位于 Compilation.js 中。其中，在编译执行过程中，我们主要从外部调用的是两个方法：

1. addEntry：从 entry 开始递归添加和构建模块。
1. seal：冻结模块，进行一系列优化，以及触发各优化阶段的 Hooks。

_总结一下Webpack构建时的基本流程_

1. 创建编译器 Compiler 实例。
1. 根据 Webpack 参数加载参数中的插件，以及程序内置插件。
1. 执行编译流程：创建编译过程 Compilation 实例，从入口递归添加与构建模块，模块构建完成后冻结模块，并进行优化。
1. 构建与优化过程结束后提交产物，将产物内容写到输出文件中。

### Webpack 的生命周期

Webpack工作流程中最核心的两个模块： Compiler 和 Compilation 都扩展自 Tapable 类， 用于实现工作流程中的生命周期划分，以便在不同的生命周期节点上注册和调用 plugin。 其中所暴露出来的生命周期节点称为 Hook。

_Hook的使用方式_

Hook的使用分为四步： 

1. 在构造函数中定义 Hook 类型和参数，生成Hook对象
1. 在 plugin 中注册Hook，添加对应Hook触发时的执行函数（即回调）
1. 生成插件实例，运行apply方法
1. 在webpack运行到对应生命周期节点时调用Hook，执行注册过的插件的回调函数

``` js
// lib/Compiler.js webpack内部执行
this.hooks = {
  ...
  make: new SyncHook(['compilation', 'params']), //1. 定义Hook
  ...
}
...
this.hooks.compilation.call(compilation, params); //4. 调用Hook
...

// lib/dependencies/CommonJsPlugin.js
//2. 在插件中注册Hook，如果我们需要自己写plugin，通常就是写这一部分，在plugin中注册Hook并添加Hook触发时的回调函数
compiler.hooks.compilation.tap("CommonJSPlugin", (compilation, { contextModuleFactory, normalModuleFactory }) => {
  ...
})

// lib/WebpackOptionsApply.js
//3. 生成插件实例，运行apply方法
new CommonJsPlugin(options.module).apply(compiler);
```

_plugin_

插件就是在webpack的某个或多个生命周期，对构建流程的某个方面进行处理的函数。

`一个plugin是一个包含apply方法的类。这个apply方法的执行逻辑，通常是注册Webpack工作流程中的一个或多个生命周期Hook，并添加对应Hook中该插件的实际处理函数`

``` js
// 一个简单的plugin例子，可以打印出hook从构建到触发的用时
class XinxinPlugin {
  apply(compiler) {
    var start = Date.now()
    var statsHooks = ['environment', 'entryOption', 'afterPlugins', 'compile']

    statsHooks.forEach((hookName) => {
      compiler.hooks[hookName].tap('Sample Plugin', () => {
        console.log("hook make （触发时间 - 注册时间）：", Date.now() - startTime)
      })
    })
    ...
  }
}
```

export const BuildMeta = {
  anchors: [
    '开发效率',
    '浏览器的热更新',
    'sourceMap',
    'mock',
    '预处理语言',
    'keyword',
  ]
}
