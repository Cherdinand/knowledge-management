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

### Webpack的生命周期

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

### webpack优化的空间在哪

``` js
// compiler源码
class Compiler {
  compile(callback) {
		const params = this.newCompilationParams();  // 生成编译过程实例Compilation参数
		this.hooks.beforeCompile.callAsync(params, err => {  // 触发beforeCompile生命周期
			if (err) return callback(err);

			this.hooks.compile.call(params);

			const compilation = this.newCompilation(params);  // 生成编译过程实例Compilation

			this.hooks.make.callAsync(compilation, err => { // 触发make生命周期
				if (err) return callback(err); 

				compilation.finish();  // 完成编译过程

				compilation.seal(err => {
					if (err) return callback(err);

					this.hooks.afterCompile.callAsync(compilation, err => {  // 触发afterCompile生命周期
						if (err) return callback(err);

						return callback(null, compilation);
					});
				});
			});
		});
	}
}
```

`对于Compiler实例而言，耗时最长的显然是生成编译过程实例Compilation后的make阶段，这阶段编译过程实例Compilation会执行模块编译到优化的完整过程。`

`可以看出，真正影响整个构建效率的还是编译过程实例Compilation的处理过程，这一过程可以分为两个阶段：编译模块和优化处理。`

_Compilation Hooks_

构建阶段：

1. addEntry、failedEntry、succeedEntry：在添加入口和添加入口结束时触发（Webpack 5 中移除）。
1. buildModule、rebuildModule、finishRebuildingModule、failedModule、succeedModule：在构建单个模块时触发。
1. finishModules：在所有模块构建完成后触发。

优化阶段：

1. seal、needAdditionalSeal、unseal、afterSeal：分别在 seal 函数的起始和结束的位置触发。
1. optimizeDependencies、afterOptimizeDependencies：触发优化依赖的插件执行，例如FlagDependencyUsagePlugin。
1. beforeChunks、afterChunks：分别在生成 Chunks 的过程的前后触发。
1. optimize：在生成 chunks 之后，开始执行优化处理的阶段触发。
1. optimizeModule、afterOptimizeModule：在优化模块过程的前后触发。
1. optimizeChunks、afterOptimizeChunks：在优化 Chunk 过程的前后触发，用于 Tree Shaking。
1. optimizeTree、afterOptimizeTree：在优化模块和 Chunk 树过程的前后触发。
1. optimizeChunkModules、afterOptimizeChunkModules：在优化 ChunkModules 的过程前后触发，例如 ModuleConcatenationPlugin，利用这一 Hook 来做Scope Hoisting的优化。
1. shouldRecord、recordModules、recordChunks、recordHash：在 shouldRecord 返回为 true 的情况下，依次触发 recordModules、 recordChunks、recordHash。
1. reviveModules、beforeModuleIds、moduleIds、optimizeModuleIds、afterOptimizeModuleIds：在生成模块 Id 过程的前后触发。
1. reviveChunks、beforeChunkIds、optimizeChunkIds、afterOptimizeChunkIds：在生成 Chunk id 过程的前后触发。
1. beforeHash、afterHash：在生成模块与 Chunk 的 hash 过程的前后触发。
1. beforeModuleAssets、moduleAsset：在生成模块产物数据过程的前后触发。
1. shouldGenerateChunkAssets、beforeChunkAssets、chunkAsset：在创建 Chunk 产物数据过程的前后触发。
1. additionalAssets、optimizeChunkAssets、afterOptimizeChunkAssets、optimizeAssets、afterOptimizeAssets：在优化产物过程的前后触发，例如在 TerserPlugin 的压缩代码插件的执行过程中，就用到了 optimizeChunkAssets。

### 编译阶段提速

编译模块阶段所耗的时间是从单个入口点开始，编译每个模块的时间的总和。要提升这一阶段的构建效率，可以从三个方向入手：

1. 减少需要执行编译的模块
1. 提升单个模块构建的速度
1. 并行构建以提升总体效率

_1. 减少需要执行编译的模块_

如果一个项目每次构建都需要编译1000个模块，但是通过分析后发现其中有500个都不需要编译，显而易见，经过优化后，构建效率可以大幅提升。当然，前提是我们能找到不需要编译的模块。

_IgnorePlugin_

有的依赖包，除了项目所需的模块内容外，还会附带一些多余的模块。典型的例子是moment这个包，一般情况下在构建时会自动引入其locale目录下的多国语言包。然而大多数情况下，我们项目中只需要引入本国语言包即可。

IgnorePlugin 即可在构建模块时直接提出那些需要被排除的模块，从而提升构建模块的速度，并减少产物体积。

_按需引入类库模块_

对于一些工具类库性质的依赖包的优化，例如lodash、antd。通常我们在项目中只会用到少数几个lodash的方法，或者几个antd的组件，但是在构建时却发现引入了整个依赖包。

`经过实验，要解决这个问题，效果最佳的方式实在导入声明时只导入依赖包内的特定模块，这样就可以大大减少构建时间，以及产物的体积。`

``` js
// 直接导入依赖包内的特定模块，这是最快的方式。但是直接导入依赖包内的特定模块，会导致我们项目文件的import代码行数过多。
import isArrayLike from 'lodash/isArrayLike' 

console.log(isArrayLike([]))
```

``` js
// 会引入整个依赖包，这是最慢的方式
import {isArrayLike} from 'lodash' 

console.log(isArrayLike([]))
```

通常，如果我们直接导入依赖包内的特定模块，会导致我们项目文件的import代码行数过多。这样我们可以使用 babel-loader 的 babel-plugin-import 插件来做到同样的效果。

``` js
// 会引入整个依赖包，这是折中的方式，能达到按需导入的效果，但是速度没有直接导入快
// a.js
import {isArrayLike} from 'lodash' 

console.log(isArrayLike([]))

// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['import', { libraryName: 'antd', style: true }, 'antd'],
              ['import', { libraryName: 'lodash', libraryDirectory: '', camel2DashComponentName: false }, 'lodash'],
            ],
          },
        },
        exclude: /(node_modules)/,
      },
    ]
  } 
}
```

_DllPlugin_

DllPlugin的核心思想是将项目依赖的第三方框架等模块单独构建打包，与普通的构建流程区分开。通常我们可以将体积大、构建耗时长、版本稳定不常升级的包放进DllPlugin中构建（`注意一旦版本发生更改需要手动重新构建一遍DllPlugin`）。

``` js
module.exports = {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  // 输出打包后的第三方库文件
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dll'),
    publicPath: '/dll',
    library: '[name]_dll',
  },
  plugins: [
    // 输出映射表manifest.json
    new webpack.DllPlugin({
      context: __dirname,
      name: '[name]_dll',   // name === output.library 这两个值要相等
      path: path.join(__dirname, 'dll' + '/[name]_manifest.json'),
    }),
  ],
}
```

``` js
module.exports = {
  entry: {
    'example-dll': './src/example.js',
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor_manifest.json'), // 链接dll文件，告诉webpack可以命中的dll文件
    }),
  ],
}
```

_Externals_

Webpack配置中的 externals 和 DllPlugin 解决的是同一类问题：将以来的框架等模块从构建过程中移除。它们的区别在于：

1. 在Webpack的配置方面，externals更简单，而DllPlugin需要额外的配置文件。
1. DllPlugin包含了依赖包的独立构建流程，而externals配置中不包含以来框架的生成方式，通常使用已传入CDN的依赖包
1. externals配置的依赖包需要单独指定依赖模块的加载方式：全局对象、CommonJS、AMD等
1. 在引用依赖包的子模块时，DllPlugin无需更改，而externals则会将子模块打入项目包中。



export const BuildMeta = {
  anchors: [
    '构建效率',
    '运行Webpack的两种方式',
    'Webpack的基本工作流程',
    'Webpack的生命周期',
    'webpack优化的空间在哪',
    '编译阶段提速',
  ]
}




