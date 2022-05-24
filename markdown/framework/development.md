### 开发效率

开发效率会涉及到在项目启动时如何选择和配置自定义脚手架、如何配置我们的开发联调环境等效率优化细节。

### 浏览器的热更新

浏览器的热更新，指的是我们在本地开发的同时打开浏览器进行预览，当代码文件发生变化时，浏览器自动更新页面内容的技术。这里的自动更新，表现上又分为自动刷新整个页面，以及页面整体无刷新而只更新页面的部分内容。

_热更新的原理_

1. 监听。对本地源代码文件内容变更的监控（基于Node.js提供的文件模块fs.watch来实现对文件和文件夹的监控）
1. 浏览器网页端与本地服务器端的Websocket通信（sockjs-node 或 socket.io 来实现Websocket的通信）
1. webpack提供的最核心的`模块解析与替换功能` （通过webpack插件HotModuleReplacementPlugin实现）

_module.hot.accept_

HotModuleReplacementPlugin中的API方法会导出到module.hot中。而其中的module.hot.accept方法是热更新的核心方法

module.hot.accept方法传入依赖模块名称和回调方法，当依赖模块发生更新时，其回调方法就会被执行，而开发者就可以在回调中实现对应的替换逻辑，即下面的用更新的样式替换原标签中的样式。

``` js
//为了清晰期间，我们将模块名称注释以及与热更新无关的逻辑省略，并将 css 内容模块路径赋值为变量 cssContentPath 以便多处引用，实际代码可从示例运行时中查看 

var cssContentPath = "./node_modules/css-loader/dist/cjs.js!./src/style.css" 

var api = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"); 

var content = __webpack_require__(cssContentPath); 

... 

var update = api(content, options); 

... 

module.hot.accept( 
  cssContentPath, 
  function(){ 
    content = __webpack_require__(cssContentPath); 
    ... 
    update(content); 
  } 
) 

module.hot.dispose(function() { 
  update(); 
});
```

### sourceMap

`首先sourceMap是作用于开发环境的。`

在前端开发过程中，通常我们编写的源代码会经过多重处理（编译、封装、压缩等），最终形成产物代码。于是在浏览器中调试产物代码时，我们往往会发现代码变得面目全非（一行的压缩后的代码），非常难以阅读，何况调试。

所以，sourceMap就是用来解决这个问题的。`sourceMap 可以在编译处理的过程中，在生成产物代码的同时生成产物代码中被转换的部分与源代码中相应部分的映射关系表。`然后我们就可以通过打开Chrome控制台中的 "Enable Javascript source map" 来实现调试时的显示与定位源代码功能。

_开发环境与生产环境_

`在开发环境，通常我们关注的是初次构建与rebuild速度快，显示的源代码质量高。`而不关注生成文件的大小和访问方式。此时选择 eval-cheap-module-source-map 是很好的选择

在生产环境，通常我们并不需要开启sourceMap。

_关键字_

`eval` 用eval关键字包裹模块代码，可以提升构建速度，在开发模式下必选。

`module` 传true的时候为 loader 也生成 sourceMap，这样我们就可以看到真正的源代码，而不是经过loader转译后的代码，开发模式必选。

`cheap` 传true的时候生成的 sourceMap 只包含行信息不包含列信息，这样在开发模式下代码报错的时候可以定位到行而定位不到列。但通常我们也无需定位到列，所以开发模式传true可以加快构建速度。也是必选。

### mock

### 预处理语言

使用预处理语言，我们可以在开发的时候用精简的语法糖去完成复杂的内容。例如less ==> css 相当于从 es6 ==> js。然后在编译的时候再使用对应的预处理器（less-loader、babel-loader）去转译代码。

预处理语言有css的（Sass、Less、Stylus），html的（Pug）。但是通常我们只使用css的。

_Sass/Less/Stylus的区别_

在实现的功能方面：这三种 CSS 的预处理语言都实现了变量（Variables）、嵌套（Nesting）、混合 （Mixins）、运算（Operators）、父选择器引用（Parent Reference）、扩展（Extend）和大量内建函数（Build-in Functions）。但是与另外两种语言相比，Less 缺少自定义函数的功能（可以使用 Mixins 结合 Guard 实现类似效果），而 Stylus 提供了超过 60 个内建函数，更有利于编写复杂的计算函数。

在语法方面：Sass 支持 .scss 与 .sass 两种文件格式。差异点是 .scss 在语法上更接近 CSS，需要括号、分号等标识符，而 Sass 相比之下，在语法上做了简化，去掉了 CSS 规则的括号分号等 （增加对应标识符会导致报错） 。Less 的整体语法更接近 .scss。Stylus 则同时支持类似 .sass 的精简语法和普通 CSS 语法。语法细节上也各不相同。

``` js
//scss
$red: '#900';

div {
  color: $red;
}

//sass
$red: '#900'

div
  color: $red

//less
@green: '#090';

div {
  color: @green;
}

//stylus
$blue = '#009'

div
  color: $blue
```

### keyword

1. babel-loader缓存优化
1. customize-cra可以在create-react-app中添加新处理模块

export const DevelopmentMeta = {
  anchors: [
    '开发效率',
    '浏览器的热更新',
    'sourceMap',
    'mock',
    'keyword',
  ]
}
