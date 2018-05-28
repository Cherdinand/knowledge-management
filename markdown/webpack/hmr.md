import compilation from 'markdown/images/compilation.png';
import hot from 'markdown/images/hot.png';
import websocket from 'markdown/images/websocket.png';

### 版本
```js
"webpack": "~4.6.0",
"webpack-dev-server": "^3.1.4",
"react-hot-loader": "^4.2.0",
```

### 使用步骤
1、Add react-hot-loader/babel to your .babelrc:

``` js
// .babelrc
{
  "plugins": ["react-hot-loader/babel"]
}

```

2、Mark your root component as hot-exported:

```js
import { hot } from 'react-hot-loader'
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'common/components/Home';
import BasicLayout from "common/components/BasicLayout";

@hot(module)
export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          {/*<Route exact path='/' render={() => {
            return <Redirect to="es6" />
          }}/>*/}
          <Route exact path='/' component={Home}/>
          <Route path="/:moduleName" component={BasicLayout} />
        </Switch>
      </BrowserRouter>
    )
  }
}
```

> info

> 注意到这里我们只给根组件添加了热替换的高阶组件，而我们在任意子孙组件中的更改都可以触发HMR，其原因是因为HMR具有冒泡性，当在一个子组件中发生改变，而没有HMR代码来处理这一改变的时候，就会向上冒泡到引用了此子组件的父组件上，如此循环，直到找到根组件也没有@hot(module)()的话，就会刷新浏览器页面（inline）。

> 因此，我们只需要在根组件使用HMR代码，就可以在开发阶段对整个app使用HMR。

3、Run Webpack with Hot Module Replacement:

```js
// webpack.confi.js

devServer: {
  hot: true,
},
plugins: [
  new webpack.HotModuleReplacementPlugin()
],
```

or 

```js
// package.json

"scripts": {
  "start": "webpack-dev-server --mode=development --hot",
}
```

> warning

> 第三步可以选择两种方案中的任意一种，但不能两种都使用，两种都使用的时候会无法正常使用HMR。

> webpack.HotModuleReplacementPlugin是用来使HMR生效的，如果在 package.json 中 webpack 或者 webpack-dev-server 配置了 --hot 选项，HotModuleReplacementPlugin会被自动添加

> 所以此时在 webpack.config.js 中也就不必添加 HotModuleReplacementPlugin 插件。还有一点要注意，HotModuleReplacementPlugin 插件需要搭配 devServer: { hot: true, } 使用。

### HMR原理

_webpack-dev-server_

webpack-dev-server主要是处理我们的构建静态资源任务，同时它还会作为一个静态文件服务器提供我们最新打包成的静态文件供本地开发使用。

webpack-dev-server与我们平时开发用的静态文件服务器的不同之处在于，它知道新的文件在何时被打包了出来，以及究竟是哪个文件发生了改变。这个基础之上，webpack-dev-server可以和浏览器之间建立一个web socket进行通信，一旦新文件被打包出来，webpack-dev-server就告诉浏览器这个消息，这时浏览器就可以自动刷新页面（inline）或者进行热替换操作（hot），而不用等到开发者手动刷新。

当我对一个文件进行改动过后，webpack会生成一份manifest文件 \<previousHash\>.hot-update.json 和一分具体更新内容的文件 \<cunkNumber\>.\<previousHash\>.hot-update.js。

`以下就是一次内容变更触发的一次HMR流程`


_previousHash_

`previousHash就是一个hash值，当页面第一次加载时生成的，每次有文件发生变更时，这个值就用来加载新变更的文件，同时会生成一份新的hash值留着给后面的更新文件使用。如此这样循环下去。`

_websocket_

webpack-dev-server通过websocket与浏览器间通信。

<img src={websocket} alt="websocket" title="websocket"/>

_浏览器通过ws中获取的hash值来加载对应的变更文件_

<img src={hot} alt="hot" title="hot"/>

_webpack编译过程_

<img src={compilation} alt="compilation" title="compilation"/>


export const HmrMeta = {
  anchors: [
    '版本',
    '使用步骤',
    'HMR原理',
  ]
}


