`Route组件和withRouter()过的组件，其祖先组件中必须有一个是Router来进行包裹，否则会报错。`

### location
``` js
http:\/\/www.example.com/my-projects/one?extra=false#trending

location = {
  protocol: "http:",
  hostname: "www.example.com",
  pathname: "my-projects/one",
  seatch: "?extra=false",
  hash: "#trending",
}
```

### Path-to-RegExp
`将一个path例如'/user/:name'转换成一个reg正则表达式。`

### Route
``` js
<Route path='/' component={Home} /> 这个路由将会匹配到所有的路由
<Route exact path='/' component={Home} /> 如果想让其精确匹配，可以加exact属性
```
通常还有另一种做法：`因为react-router是从上匹配，匹配到就re-render并且停止往下匹配的原因`，我们可以把它放在最后。
``` js
<Route path='/profile' component={Profile} />
<Route path='/login' component={Login} />
<Route path='/' component={Home} />
```
你会发现exact属性很常用，且在react-router v5的版本，exact属性很可能默认为true。

在匹配path的时候，react-router会用Path-to-RegExp将path属性的值转换成正则表达式，然后去匹配当前的location.pathname，如果能匹配的上，就会渲染component或者触发render()。

当pathname匹配到对应的path的正则的时候，会创建一个match对象，也就是我们经常用的this.props.match。

注意：根据实践结果看，`当对某个组件使用withRouter的时候，这个match对象是由其ancestor Route组件传入的。`
``` js
match = {
  url: "/es6",           // 当前匹配到的location.pathname
  path: "/:moduleName",  // 当前匹配的Route组件的path的值
  isExact: false,        // path === pathname  
  params : {             //  an object containing values from the pathname that were captured by path-to-regexp
    moduleName: "es6"
  },                
}
```
每一个和当前pathname match到的Route所渲染的组件都会被传入match，location，history对象，用withRouter装饰的组件也会传入此三个属性对象。

### Switch
用Switch组件来包裹Route组件，Switch组件会遍历Route组件并且只渲染match到的第一个Route组件

在Switch里面，除了可以有Route组件之外，还可以有Redirect组件，将Redirect组件放在最后，那么当没有path匹配到的时候，就会触发Redirect。这个在本项目中的AppContainer中有实际应用。
``` js
<Switch>
  <!-- moduleName为一级路由的pathname，根据RouterConfig[moduleName]遍历生成Route -->
  {
    RouterConfig[moduleName].map((route) => {
      return <Route path={match.url + '/' + route.path} component={route.component} key={route.path}/>
    })
  }

  <!-- 根据RouterConfig[moduleName]遍历生成一个Redirect，当没有path匹配到的时候，会自动Redirect到RouterConfig对应一级路由下的第一个二级路由 -->
  {
    RouterConfig[moduleName].map((route) => {
      if(route.redirectTo){
        return <Redirect key={route.path} to={match.url + '/' + route.path}/>
      }
    })
  }
</Switch>
```

export const ReactRouter4Meta = {
  anchors: [
    'location',
    'Path-to-RegExp',
    'Route',
    'Switch',
  ]
}