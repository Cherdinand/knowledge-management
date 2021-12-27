### 介绍

> info

> The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

Other key features include the ability to pause, abort, or reuse work as new updates come in; the ability to assign priority to different types of updates; and new concurrency primitives.

fiber的出现是为了提高react在动画，布局，手势中的适应能力。其中最核心的概念就是`增量渲染`,就是将渲染工作分成块，在不同的帧里面执行渲染工作。

其他主要功能包括在新更新到来时暂停、中止或重新工作的能力；能够为不同类型的更新分配优先级；和新的并发功能。

为了使react渲染的过程中可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务，浏览器空闲后再恢复渲染。

对于计算量比较大的js计算或者dom计算，就不会显得特别卡顿。而是一帧一帧的有规律的执行任务。

约定一个合理的执行时间，当超过了这个执行时间，如果任务仍然没有执行完成，就中断当前任务，将控制权交还给浏览器。

已知浏览器一秒60帧， 1000ms/60 = 16ms。

_requestIdleCallback_

这个函数可以使浏览器在有空的时候执行我们的回调，这个回调会传入一个参数，表示浏览器有多少时间供我们执行任务。

timeout参数，假设为100ms，如果超过这个timeout后，回调还没被执行，那么会在下一帧强制执行回调。

``` js
16ms
16ms
16ms
...
16ms > 100ms
强制执行回调
```

但是也不是所有任务在timeout之后就一定会被执行，react里预定了5个优先级的等级。

1. Immediate 最高优先级，这个优先级的任务应该被马上执行不能中断
1. UserBlocking 这些任务一般是用户交互的结果，需要即使得到反馈
1. Normal 不需要用户立即就感受到的变化，比如网络请求
1. Low 这些任务可以延后，但是最终也需要执行
1. Idle 可以被无限期延后

_浏览器在一帧（16ms）内要做什么事情_

1. 处理用户输入事件
1. js的执行
1. requestAnimation 调用
1. 布局 layout
1. 绘制 paint

### 好文

[完全理解React Fiber](http://www.ayqy.net/blog/dive-into-react-fiber/)

export const FiberMeta = {
  anchors: [
    '介绍',
    '好文',
  ]
}
