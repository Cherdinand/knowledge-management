### React.PureComponent

React.PureComponent会在React.Component的基础上添加一个shouldComponentUpdate方法，对从父组件传进来的props和自身的state的值进行浅对比，如果发现无变化，那么就不对PureComponent组件进行re-render。

> warning

> 那么这里就有几个要注意的点。由于是进行浅对比，所以对于props或state的值是array或者object的情况，要注意引用（传址）的问题，即即使传入的array或者object的值改变了，却没有触发re-render，这就是因为nextProps和this.props都是指向同一个对象的原因。

> 要解决这个问题，可以在传值的时候创建新对象或新数组（[...]、assign、concat等）。

> 还有一点要注意！不要在render方法里派生数据！！！因为我们使用PureComponent的目的是为了减少re-render所带来的性能消耗，如果在render里生成数据并作为prop，那么传进PureComponent的props是一个全新的数据，如果数据类型是array或者object的话就总会触发re-render，即使是不需要re-render的情况。

`以下所有例子都是基于组件是PureComponent的前提之下。如果有以下的使用情况，会浪费PureComponent可以优化渲染的功能。`

``` js
//在onHover属性上传了一个匿名函数，导致每次当前组件re-render的时候，都会传进一个新的函数对象给FruitCard，导致FruitCard触发re-render，尽管此时FruitCard并不需要re-render。
<FruitCard title="Banana Card" onHover={() => { console.log('Hover =>') }} /> 
```

``` js
// 像这种如果每次传进一个新数组，即使是空数组，也会触发Entity的re-render，尽管此时并不需要re-render
<Entity values={this.props.values || []}/> 
```

``` js
// 在render里派生数据topTen并作为props，总会触发A的re-render，使PureComponent的作用失效。
render() {
  const { posts } = this.props
  const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
  return <A topTen={topTen} />
}
```

> info

> 建议只对展示组件使用PureComponent。

### React.lazy

React.lazy 函数配合Suspend组件能做到动态加载组件。

`基本原理是webpack 检测到 import() 语法会自动代码分割。`

``` js
const OtherComponent = React.lazy(() => import(/* webpackChunkName: "OtherComponent" */'./OtherComponent'));
const OtherComponentTwo = React.lazy(() => import(/* webpackChunkName: "OtherComponentTwo" */'./OtherComponentTwo'));

<Suspense fallback={<div>抱歉，请耐心等待 Loading...</div>} >
  <OtherComponent />
  <OtherComponentTwo />
</Suspense>
```


export const ApiMeta = {
  anchors: [
    'React.PureComponent',
    'React.lazy',
  ]
}