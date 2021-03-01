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

> 建议只对UI组件使用PureComponent。

### React.memo

React.memo 与 React.PureComponent 都是通过浅对比来进行性能优化的。

`区别在于 React.memo 是一个方法，而React.PureComponent是一个继承类。且 React.memo 只对 props 进行浅对比，而React.PureComponent 对 props 和state 进行浅对比。`

``` js

const items = new Array(10000).fill(1);

// React.memo 函数带两个参数，第二个参数是一个对比函数，类似于shouldComponentUpdate，只是当两比较值不相等的时候返回false，相等的时候返回true
// 传入第二个参数可以针对特定的某个 props 进行浅比较
const Block = React.memo(
  (props) => {
    console.log("render");

    return `${props.keys}_${props.num}_${props.otherKeys}`;
  },
  (prevProps, nextProps) => {
    if (prevProps.otherKeys !== nextProps.otherKeys) {
      return false;
    } else {
      return true;
    }
  }
);

export default function App() {
  const [keys, setKeys] = useState("app");
  const [otherKeys, setOtherKeys] = useState("hapi");

  function handleClick1() {
    setKeys("APP");
  }

  function handleClick2() {
    setOtherKeys("HAPI");
  }

  return (
    <div>
      <div onClick={handleClick1}>keys</div>
      <div onClick={handleClick2}>otherKeys</div>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Block num={index} keys={keys} otherKeys={otherKeys} />
          </div>
        );
      })}
    </div>
  );
}
```

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

### ReactDOM.createPortal

`Portal 可以将子节点渲染到存在于父组件以外的 DOM 节点。适合用于当需要子组件能够在视觉上“跳出”其容器时，例如，对话框、悬浮卡以及提示框。`

``` js
ReactDOM.createPortal(child, container); // 第一个参数是任何react子元素，container是一个DOM容器元素实例
```

export const ApiMeta = {
  anchors: [
    'React.PureComponent',
    'React.memo',
    'React.lazy',
    'ReactDOM.createPortal',
  ]
}