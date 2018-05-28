import flux from 'markdown/images/flux.png';
import mvc from 'markdown/images/mvc.png';

```angular2html
// todo JSX是在哪里被解析成DOM tree的？ ReactDOM.render()?
```

### 第一章

React只支持IE8及以上版本的浏览器。

`在使用JSX的范围内必须要有React。`在使用JSX的代码文件中，即使代码中没有直接使用React，也一定要导入这个React，这是因为JSX最终会被转译成以来与React的表达式。

在JSX中，React判断一个元素是HTML元素还是React组件的原则就是看第一个字母是否大写，`这也是React组件首字母必须大写的原因。`

_onclick & onClick_

在HTML的元素中直接添加onclick事件有如下缺点：

1. onclick添加的事件处理函数是在全局环境下执行的，这污染的全局环境，容易产生不可预料的后果。

2. 给DOM元素添加onclick事件，可能会影响网页的性能，毕竟，`网页需要的事件处理函数越多，性能就会越低。`

3. 对于使用onclick的DOM元素，如果要动态地从DOM树中删掉的话，需要把对应的时间处理器注销，加入忘了注销，就可能造成内存泄漏，这样的bug很难被发现。

而在JSX元素（组件）中添加了onClick属性中：

1. onClick挂载的每个函数，都可以控制在组件范围内，不会污染全局环境。

2. JSX组件中的onClick实际上使用了`事件委托`的方式处理点击事件，无论整个app中有多少个组件中使用了onCLick，其实最后都只在DOM树上添加了一个事件处理函数，挂在最顶层的DOM节点上。所有的点击事件都被这个事件处理函数捕获，然后根据具体组件分配给特定处理函数。

3. 因为React控制了组件的生命周期，在unmount的时候可以清除相关的所有事件处理函数，内存泄漏也不再是一个问题。

### 第二章

当props的类型不是字符串类型的时候，在JSX中必须用花括号{}把props值包住，所以style的值有两层花括号，外层花括号表示是JSX的语法，内层花括号表示这是一个对象常量。

`组件是绝不应该去修改传入的props对象值的。`因为当一个父组件包含多个子组件，然后把一个JS对象作为props值传给同时传给多个子组件，`注意这里子组件对于这个值为JS对象的props都存在对象引用。`而在某个子组件里改变了这个对象的内部值，那么由于对象引用的关系，导致所有子组件拿到的props值都发生了变化，就有可能会产生bug，这也是immutable的作用。

一个React组件至少需要包含一个render()，因为React组件继承的父类React.Component类对除render之外的生命周期函数都有默认实现。

_componentWillMount_

这个时候没有任何渲染出来的结果，即使调用this.setState修改状态也不会引发重新绘制。也就是说，所有可以在这个componentWillMount中做的事情，都可以提前到constructor中间去做。

_componentDidMount_

render函数被调用完之后，componentDidMount函数并不是会被立刻调用，componentDidMount被调用的时候，render函数返回的东西已经引发了渲染，组件已经被“装载”到了DOM树上。`这也是在componentDidMount生命周期中可以获取到DOM节点的原因。`

componentWilIMount和componentDidMount这对兄弟函数还有一个区别，就是componentWillMount可以在服务器端被调用，也可以在浏览器端被调用；`而component-DidMount只能在浏览器端被调用，在服务器端使用React 的时候不会被调用。`

_componentWillReceiveProps(`nextProps`)_

只要是父组件的render函数被调用，在render函数里面被谊染的子组件就会经历更新过程，不管父组件传给子组件的props有没有改变，都会触发子组件的componentWillReceiveProps函数。

> warning

> 通过this.setState方法触发的更新过程不会调用这个函数，这是因为这个函数适合根据新的props值（也就是参数nextProps）来计算出是不是要调用this.setState更新内部状态state。如果this.setState的调用导致componentWillReceiveProps再一次被调用，那就是一个死循环了。

> 由于不管父组件传给子组件的props 有没有改变，都会触发子组件的componentWillReceiveProps函数。所以这个函数有必要把传入参数nextProps 和this.props 作必要对比。nextProps 代表的是这一次渲染传入的props 值， this.props 代表的上一次渲染时的props 值，只有两者有变化的时候才有必要调用this.setState 更新内部状态。

_shouldComponentUpdate(`nextProps, nextState`)_

nextProps代表的是这一次渲染传入的props值，nextState代表的是这一次渲染传入的state值，this.props代表的上一次渲染时的props值，this.state代表的上一次渲染时的state值。

_componentWillUpdate(`nextProps, nextState`)_

nextProps代表的是这一次渲染传入的props值，nextState代表的是这一次渲染传入的state值，this.props代表的上一次渲染时的props值，this.state代表的上一次渲染时的state值。

_componentDidUpdate(`prevProps, prevState`)_

因为componentDidUpdate已经完成了re-render，所以prevProps代表的也是这一次渲染传入的props值，prevState代表的也是这一次渲染传入的state值，

### 第三章

_MVC_

<img src={mvc} alt="MVC" title="MVC框架"/>

MVC最大的问题就是无法禁绝View和Model之间的直接对话。

_Flux_

<img src={flux} alt="Flux" title="Flux的单向数据流"/>

Flux 的基本原则是“单向数据流”。

如果非要把Flux和MVC做一个结构对比，那么，Flux的Dispatcher相当于MVC的Controller，Flux的Store相当于MVC的Model，Flux的View当然就对应MVC的View了，至于多出来的这个Action，可以理解为对应给MVC框架的用户请求。

1. Dispatcher ，处理动作分发，维持Store 之间的依赖关系；

2. Store ，负责存储数据和处理数据相关逻辑；

3. Action ，驱动Dispatcher 的JavaScript 对象；

4. View ，视图部分，负责显示用户界面。

_Redux_

Flux 的基本原则是“单向数据流”， Redux 在此基础上强调三个基本原则：

1. 唯一数据源（ Single Source of Truth);

2. 保持状态只读（ State is read-only);

3. 数据改变只能通过纯函数完成（ Changes are made with pure functions ） 。

### 第四章






export const ReactReduxMeta = {
  anchors: [
    '第一章',
    '第二章',
    '第三章',
    '第四章',
  ]
} 