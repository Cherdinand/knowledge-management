import flux from 'markdown/images/flux.png';
import mvc from 'markdown/images/mvc.png';
import middleware from 'markdown/images/middleware.png';
import MiddlewarePipe from 'markdown/images/middleware-pipe.png';
import MiddlewareAction from 'markdown/images/middleware-action.jpg';

```angular2html
// todo JSX是在哪里被解析成DOM tree的？ ReactDOM.render()?
```

### 布偶猫贴吧关于判断猫舍的视频

http://m.bilibili.com/video/av12198097.html?bsource=weibo

### 第一章

React只支持IE8及以上版本的浏览器。

`在使用JSX的范围内必须要有React。`在使用JSX的代码文件中，即使代码中没有直接使用React，也一定要导入这个React，这是因为JSX最终会被转译成依赖于React的表达式。

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

这个时候没有任何渲染出来的结果，即使调用this.setState修改状态也不会引发重新绘制。也就是说，所有可以在这个componentWillMount中做的事情，都可以提前到constructor里去做。

_componentDidMount_

render函数被调用完之后，componentDidMount函数并不是会被立刻调用，componentDidMount被调用的时候，render函数返回的东西已经引发了渲染，组件已经被“装载”到了DOM树上。`这也是在componentDidMount生命周期中可以获取到DOM节点的原因。`

componentWilIMount和componentDidMount这对兄弟函数还有一个区别，就是componentWillMount可以在服务器端被调用，也可以在浏览器端被调用；`而componentDidMount只能在浏览器端被调用，在服务器端使用React 的时候不会被调用。因为在服务器端不存在组件被挂载到DOM tree的可能。`

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

### 第三章--从Flux到Redux

_MVC_

<img src={mvc} alt="MVC" title="MVC框架"/>

MVC最大的问题就是无法禁绝View和Model之间的直接对话。

_Flux_

<img src={flux} alt="Flux" title="Flux的单向数据流"/>

Flux 的基本原则是“单向数据流”。

如果非要把Flux和MVC做一个结构对比，那么，Flux的Dispatcher相当于MVC的Controller，Flux的Store相当于MVC的Model，Flux的View当然就对应MVC的View了，至于多出来的这个Action，可以理解为对应给MVC框架的用户请求。

1. Dispatcher ，处理动作分发，维持Store 之间的依赖关系。

2. Store ，负责存储数据和处理数据相关逻辑。

3. Action ，驱动Dispatcher 的JavaScript 对象。

4. View ，视图部分，负责显示用户界面。

_Redux_

Flux 的基本原则是“单向数据流”， Redux 在此基础上强调三个基本原则：

1. 唯一数据源（ Single Source of Truth)。

2. 保持状态只读（ State is read-only)。

3. 数据改变只能通过纯函数完成（ Changes are made with pure functions ） 。

### 第四章--模块化

_代码文件的组织方式_

1. 按角色组织。把所有相同功能的文件放在同一个文件夹中。如本项目代码中所有markdown文件都放在/markdown文件夹中。

2. 按功能组织。把专门负责某个模块的功能的文件放在同一个文件夹中。如一个组件中包含的sass文件只服务于当前组件，或者redux中把一个模块的action、reducer、view、reselect等放在同一个文件夹中。

不同功能模块之间的依赖关系应该简单而且清晰，也就是所谓的保持模块之间`低耦合性`。

一个模块应该把自己的功能封装得很好，让外界不要太依赖与自己内部的结构，这样不会因为内部的变化而影响外部模块的功能，这就是所谓`高内聚性`。

依赖模块的两种方式：
```js
// 第一种方式
export {
  name: "xinxin",
  age: 11
}
import { name, age } from 'path'; 

// 第二种方式 default
export default {
  name: "xinxin",
  age: 11
}

import obj from 'path';
const { name, age } = obj
```

_三款Chrome 扩展包_

1. React Devtools ，可以检视React组件的树形结构。

2. Redux Devtools ，可以检视Redux数据流，可以将Store状态跳跃到任何一个历史状态，也就是所谓的“时间旅行”功能。

3. React Perf ，可以发现React组件渲染的性能问题。

### 第五章--性能优化

在装载过程中， React 通过render 方法在内存中产生了一个树形的结构，树上每一个节点代表一个React 组件或者原生的DOM 元素，这个树形结构就是所谓的Virtual DOM 。

在更新过程中， React 依然通过render 方法获得一个新的树形结构Virtual DOM。

然后，React通过对比原有的Virtual DOM 和新生成的Virtual DOM，找出两者的不同之处，根据不同来修改DOM 树，这样只需做最小的必要改动。这个“找不同”的过程就叫做Reconciliation （调和） 。

其实React 的Reconciliation 算法并不复杂，当React 要对比两个Virtual DOM 的树形结构的时候，从根节点开始递归往下比对，在树形结构上，每个节点都可以看作一个这个节点以下部分子树的根节点。所以其实这个对比算法可以从Virtual DOM 上任何一个节点开始执行。

_reselect库的工作原理_

`只要相关状态没有改变，那就直接使用上一次的缓存结果。这样就可以避免一次重复计算的过程`

reselect 认为一个选择器的工作可以分为两个部分，把一个计算过程分为两个步骤：

1. 从输入参数state 抽取第一层结果，将这第一层结果和之前抽取的第一层结果做比较，如果发现完全相同，就没有必要进行第二部分运算了，选择器直接把之前第二部分的运算结果返回就可以了。注意，这一部分做的“比较”，就是JavaScript 的＝＝＝操作符比较，如果第一层结果是对象的话，只有是同一对象才会被认为是相同。

2. 根据第一层结果计算出选择器需要返回的最终结果。

```js
reselect的记忆功能实际上就是利用闭包，我们把问题简单化，让createSelector就固定接受3个参数，代码差不多就是下面这样。这只是最简单的实现方式。

const createSelector = (selector1, selector2, resultSelector) {
  let selectorCache1,  // selector1的结果记忆
      selectorCache2,  // selector2的结果记忆
      resultCache;     // resultSelector的结果记忆
  return (state) => {
     const subState1 = selector1(state);
     const subState2 = selector2(state);

     if (selectorCache1 === subState1 && selectorCache2 === subState2) {
       return resultCache;
     }
     selectorCache1 = subState1;
     selectorCache2 = subState2;     
     resultCache = resultSelector(selectorCache1, selectorCache2);
     return resultCache;
  };
}
```

_关系型数据库_

关系型数据库的强项能是保持一致，但是应用需要的数据形式往往是多个表join 之后的结果，而join的过程往往耗时而且在分布式系统中难以应用。

_范式化_

范式化就是遵照关系型数据库的设计原则，减少冗余数据。

_反范式化_

反范式化是利用数据冗余来换取读写效率，因为关系型数据库的强项虽然是保持一致，但是应用需要的数据形式往往是多个表join 之后的结果，而join的过程往往耗时而且在分布式系统中难以应用。

假设我们给Todo 应用做一个更大的改进，增加一个Type 的概念，可以把某个Todoltem 归为某一个Type ，而且一个Type 有特有的名称和颜色信息，在界面上，用户可以看到Todoltem 显示为自己所属Type 对应的颜色， Todoltem 和Type 当然是多对多的关系。

```js
反范式化的state设计会是类似下面的对象：

{
  id: 1,              
  text: "待办事项1",   
  completed: false,  
  type: {            
    name: "紧急",     
    color: "red"     
  }
}

这样我们在使用的时候可以很轻松的获取到其特有的名称和颜色信息，但是如果我们要对某种类型的名称和颜色进行修改时，不得不遍历所有Todoltem 数据来完成改变。

反范式化数据结构的特点就是读取容易，修改比较麻烦。
```

```js
范式化的state设计会是类似下面的对象：

{
  id: 1,              
  text: "待办事项1",   
  completed: false,  
  typeId: 1,
}

由于state给到我的数据只有typeId，并没有特有的名称和颜色信息，所以就需要开发者编写一个对应规则，例如：

{
  id: 1,       
  name: "紧急", 
  color: "red",
}

通过这样的操作来让某个typeId对应其特有的名称和颜色信息。

这种范式化的state设计在使用的时候需要做一个类似关系型数据库的join 操作（较为繁琐），但是如果我们要对某种类型的名称和颜色进行修改时，却非常简单，只需要修改typeId即可。
```

对比反范式方式和范式方式的优劣，不难看出范式方式更合理。因为虽然join 数据需要花费计算时间，但是应用了reselect 之后，大部分情况下都会命中缓存，实际上也就没有花费很多计算时间了。

### 第六章--高阶组件

当多个组件都需要某个功能，但这个功能和界面并没有关系的时候，是不能直接抽取成一个新的组件的。然而如果将这个功能的逻辑代码在各个组件里实现的话，又会造成很多重复代码，这当然不是我们想看到的，这个时候就可以使用高阶组件。

> info

> 实际上：函数返回的结果才应该叫“高阶组件”，而这个函数本身应该叫做“高阶组件工厂函数”，这样的定义会比较严谨。但是我们一般说的高阶组件其实就是这个函数。

根据返回的新组件和传人组件参数的关系，高阶组件的实现方式可以分为两大类：

1. 代理方式的高阶组件。

2. 继承方式的高阶组件。

_代理方式的高阶组件_

代理方式的高阶组件的特点是返回的新组件类直接继承自React.Component 类。新组件扮演的角色是传入参数组件的一个“代理”，在新组件的render 函数中，把被包裹组件渲染出来，除了高阶组件自己要做的工作，其余功能全都转手给了被包裹的组件。

```js
操作props，我们完全可以利用高阶函数来增删改传入组件的props。

const addProps = (newProps) => {
  return (Component) => {
    class WrappedComponent extends React.Component {
      render(){
        return <Component {...this.props} {...newProps}/>
      }
    }
    return WrappedComponent;
  }
}
```

```js
访问ref

const manipulateRef = (Component) => {
  class WrappedComponent extends React.Component {
    componentDidMount(){
      console.log('component', this.component);
    }
    render(){
      const  { user, ...otherProps } = this.props;
      return <Component ref={ele => this.component = ele} {...otherProps}/>
    }
  }
  return WrappedComponent;
}
```

```js
抽取状态。
在傻瓜组件和容器组件的关系中，通常让傻瓜组件不要管理自己的状态，只要做一个无状态的组件就好，所有状态的管理都交给外面的容器组件，这个模式就是“抽取状态” 。
而在高阶组件中，高阶组件就相当于父组件，被包裹的组件就相当于子组件。也就是可以利用高阶组件来管理我们组件的state状态。

以下是模拟react-redux中connect函数的实现，这里只实现了部分功能。

const connect = (mapStateToProps, mapDispatchToProps) => {
  return (Component) => {
    class WrappedComponent extends React.Component {
      componentDidMount(){
        this.context.store.subscribe(this.reRender)  // 调用store的订阅，这样在redux中的store发生变化的时候，都会触发reRender函数
      }
      componentWillMount(){
        this.context.store.unsubscribe(this.reRender)
      }
      reRender = () => {
        this.setState({})  // 触发重新渲染
      }
      render(){
        const { store } = this.context;
        const newProps = {
          ...this.props,
          ...mapStateToProps(store.getState()),
          ...mapDispatchToProps(store.dispatch)
        }
        return <Component {...newProps}/>
      }
    }
    // 因为Provider向子辈组件传递了store为context，这里我们可以获取到this.context.store
    WrappedComponent.contextTypes = { 
      store: React.PropTypes.object
    }
    return WrappedComponent;
  }
}
```

_继承方式的高阶组件_

继承方式的高阶组件采用继承关系关联作为参数的组件和返回的组件，假如传入的组件参数是WrappedComponent ，那么返回的组件就直接继承自WrappedComponent 。

```js
操作props。

需要注意，在代理方式下WrappedComponent 经历了一个完整的生命周期，但在继承方式下super.render 只是一个生命周期中的一个函数而已。
在代理方式下产生的新组件和参数组件是两个不同的组件，一次渲染，两个组件都要经历各自的生命周期，在继承方式下两者合二为一，只有一个生命周期。

const addProps = (newProps) => {
  return (WrappedComponent) => {
    class Component extends WrappedComponent {
      render(){
        const elements = super.render(); // 因为是类继承关系，super作为对象在普通函数中使用的时候指向父类的prototype，所以可以直接调用父类的render函数。
        const props = {...this.props, ...newProps };
        return React.cloneElement(elements, props, elements.props.children);
      }
    }
    return Component;
  }
}

虽然这样可行，但是过程实在非常复杂，唯一用得上的场景就是高阶组件需要根据参数组件Wrapped Component 渲染结果来决定如何修改props 。
```

_以函数为子组件_

缘由：高阶组件的缺点就是对原组件的props 有了固化的要求。也就是说，能不能把一个高阶组件作用于某个组件X ，要先看一下这个组件X 是不是能够接受高阶组件传过来的props ，如果组件X 并不支持这些props ，或者对这些props 的命名有不同，或者使用方式不是预期的方式，那也就没有办法应用这个高阶组件。`通俗来讲就是高阶组件传了个名为a的props给子组件，那么子组件就必须使用a才能用到高阶组件的功能，如果用的是b，就没有效果。`而以函数为子组件就是为了克服高阶组件的这种局限而生的。

```js
class CountDown extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {count: this.props.startCount};
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count;
  }
  componentDidMount() {
    this.intervalHandle = setInterval(() => {
      const newCount = this.state.count - 1;
      if (newCount >= 0) {
        this.setState({count: newCount});
      } else {
        window.clearInterval(this.intervalHandle);
        this.intervalHandle = null;
      }
    }, 1000);
  }
  componentWillUnmount() {
    if (this.intervalHandle) {
      window.clearInterval(this.intervalHandle);
      this.intervalHandle = null;
    }
  }
  render() {
    return this.props.children(this.state.count);
  }
}
CountDown.propTypes = {
  children: React.PropTypes.func.isRequired,
  startCount: React.PropTypes.number.isRequired
}

一个简单的倒计时，当count为0的时候显示新年快乐
<CountDown startCount={lO)>
  {
    (count) => <div>{count > 0 ? count ： ’ 新年快乐’}</div>
  }
</CountDown>

把倒计时的数字直接交给Bomb组件
<CountDown startCount={lO)>
  {
    (count) => <Bomb countdown={count} />
  }
</CountDown>
```
从CountDown 的例子中我们看出一点端倪，这种“以函数为子组件”的模式非常适合于制作动画，类似CountDown 这样的例子决定动画每一帧什么时候绘制，给制的时候是什么样的数据，作为子组件的函数只要专注于使用参数来渲染就可以了。

### 第九章--扩展Redux

扩展Redux的途径有两条：

1. 中间件。

2. Store Enhancer。

_中间件middleware_

`一个action在被dispatch之后，会先经过中间件，才到达reducer。`

<img src={MiddlewarePipe} alt="MiddlewarePipe" title="MiddlewarePipe"/>

中间件的特点是：

1. 中间件是独立的函数。意思是每个中间件能够独立地完成某个特定功能而不需要依赖于其他中间件。

2. 中间件可以组合使用。

3. 中间件有一个统一的接口。所以中间件才可以组合使用。

<img src={middleware} alt="middleware" title="middleware"/>

```js
一个中间件函数：
function middleware{{dispatch, getState)) {
  return function {next) {
    return function {action) {
      // 对action进行操作
      // 1. 调用dispatch 派发出一个新action 对象；
      // 2. 调用getState 获得当前Redux Store 上的状态；
      // 3. 调用next 告诉Redux 当前中间件工作完毕，让Redux 调用下一个中间件；
      // 4. 访问action 对象action 上的所有数据。
      return next(action); // 调用下一个中间件对action进行下一步的操作
    }
  }
}

or

const middleware = ({dispatch, getState}) => (next) => (action) => {
  // 对action进行操作
  retur next(action)
}
```

`applyMiddleware (...middlewares)，返回一个新的函数，新的函数实际上是Store Enhancer。`

所以我们可以以Store Enhancer的方式使用中间件，createStore函数的第三个参数就是Store Enhancer。

```js
import {createStore, applyMiddleware, compose} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(thunkMiddleware),
    composeWithDevTools()
  )
);
```

> warning

> 一定要把applyMiddlware 的结果作为compose 的第一个参数，也就是要放在所有其他Store Enhancer 之前应用。这是因为增强器的顺序也就是它们处理action 对象的顺序， applyMiddleware 配合reduxthunk或者其他中间件要处理异步action 对象。如果不是优先把他们摆在前面的话，异步action 对象在被它们处理之前就会被其他Store Enhancer 处理，无法理解异步对象的增强器就会出错。

_中间件内处理action的原理_

<img src={MiddlewareAction} alt="MiddlewareAction" title="MiddlewareAction"/>

如图所示：调用next(action)就会让下一个中间件来处理action，而调用dispatch(action)的话就会从最外层中间件重新处理action对象。

> info

> 所以，一般我们在异步处理的时候会处理特殊的action对象，最后dispatch(一个redux认识的action对象)，让这个action对象重新接受所有中间件的处理。

_Store Enhancer_

中间件只能对dispatch方法起作用，其实就是对action对象的操作。但是Store Enhancer是对整个store对象的增强，enhancer函数可以修改dispatch，replaceReducer，getState，subscribe，也可以新增函数api挂在store对象上。

`虽然enhancer函数可以做很多修改，但是无论怎么修改，最后还是要用到store对象上原有提供的四个api。`

```js
每次dispatch之前先打印出action的enhancer：
export default () => {
  return (createStore) => (reducer, initialState, enhancer) => {
    const store = createStore(reducer, initialState, enhancer);
    const originDispatch = store.dispatch;  // 保存原有的dispatch函数
    
    store.dispatch = (action) => {
      console.log('dispatch action', action);  //  这一部分是对dispatch函数的修改内容
      originDispatch(action);  // 最终调用原有的dispatch函数
    }
    
    return store;
  }
}
增强器通常都使用这样的模式，将store 上某个函数的引用存下来，给这个函数一个新的实现，但是在完成增强功能之后，还是要调用原有的函数，保持原有的功能。
```






export const ReactReduxMeta = {
  anchors: [
    '布偶猫贴吧关于判断猫舍的视频',
    '第一章',
    '第二章',
    '第三章--从Flux到Redux',
    '第四章--模块化',
    '第五章--性能优化',
    '第六章--高阶组件',
    '第九章--扩展Redux',
  ]
}