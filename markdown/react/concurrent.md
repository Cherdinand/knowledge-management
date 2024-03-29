
### Concurrent

React18提供的是渐进式的特性，也就是说如果不适用concurrent特性，就会保持之前版本的渲染机制，在使用了React18提供的特性的地方就会用React18的渲染机制。这保证了我们的应用可以渐进的升级为18版本。

Concurrent 并发 是 React18 核心渲染模型的基础性更新，也就是 React18 的新特性都是基于Concurrent实现。

Concurrent 可以看作是一个机制，而这个底层机制允许React在同一时间准备多个版本的UI。React内部用了很多复杂的技术来实现Concurrent，例如优先队列和多重缓冲。

### 核心特性

_可中断_

在使用Concurrent特性之前，React的渲染是一个单一的，不可中断的，同步的。这说明一旦React开始渲染，直到React结束渲染，中间是持续的，不可中断的，不可执行其他代码的。一旦某次渲染比较复杂，耗时较长，就会出现卡顿的感觉。

而通过使用Concurrent特性，React的渲染过程变得可中断，中断后也可恢复渲染，当然也可以直接放弃渲染。

_state可重用_

React18 提供了一个组件 OffScreen 使我们可以做到在离开当前视图并在之后返回这个视图时可以恢复离开时的状态，即保存状态并在回来时可重用这份状态

### StrictMode

`其实就是帮助渐进使用React18的一个组件。`

你可以在代码中使用到React18的特性的地方用 StrictMode 组件包一层，这会在开发环境中发现与Concurrent相关的错误并打印出额外的warning，并且不会打包到生产包中。

### Suspense

处理异步操作

### Server Components

Server Components 是一个在18.x版本即将到来的特性，允许开发者构建跨服务器和客户端的应用程序，将客户端应用程序的丰富交互性与传统服务器渲染的改进性能相结合。

### 新特性

_自动批处理_

自动批处理是React将多个state更新分组到一次重渲染中以获取更好的性能。

``` js
// Before: only React events were batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will render twice, once for each state update (no batching)
}, 1000);

// After: updates inside of timeouts, promises,
// native event handlers or any other event are batched.
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React will only re-render once at the end (that's batching!)
}, 1000);
```

_transition_

startTransition 用在类组件中
useTransition   用在函数组件中

看完给我的感觉就是这玩意会给所包裹的逻辑设置一个优先级较低执行。也就是在concurrent模式下，react的渲染变为可中断之后，react优先渲染优先级高的逻辑，在有空闲的时候可以再去执行transition中的逻辑。

`还有一点很重要的就是，当transition中的代码被一直阻塞，比如说用户一直在input组件进行输入操作，那么那些多次触发的transition中的未执行的逻辑将被丢弃并只执行最后一次的更新。`

_Suspense_

在React18之前react就提供了一个限制版的Suspense组件，那个版本的Suspense组件只能用于和React.lazy一起做代码分割。

在React18中的Suspense目标是处理各种异步操作。而且Suspense与transition API 一起使用最佳。

export const ConcurrentMeta = {
  anchors: [
    'Concurrent',
    '核心特性',
    'StrictMode',
    'Suspense',
    'Server Components',
    '新特性',
  ]
}