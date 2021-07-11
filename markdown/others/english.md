### 常用英文

``` js
monorepos 单一仓库 （多个项目的代码放在在同一存储库中的开发策略）
specifics 细节
identifier 标识符
conpatibility 兼容性
generic 通用的
precede 在...前面
high-level algorithm 高级算法
```

### 常用英文短语

``` js
in case 以防万一
make up 弥补
vice versa  反之亦然
```

### react hooks

可以在不写class组件的情况下，使用state和其他react特性。

### react fiber

为了使react渲染的过程中可以被中断，可以将控制权交还给浏览器，可以让位给高优先级的任务，浏览器空闲后再恢复渲染。

对于计算量比较大的js计算或者dom计算，就不会显得特别卡顿。而是一帧一帧的有规律的执行任务。

约定一个合理的执行时间，当超过了这个执行时间，如果任务仍然没有执行完成，就中断当前任务，将控制权交还给浏览器。

已知浏览器一秒60帧， 1000ms/60 = 16ms。

__requestIdleCallback__

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

__浏览器在一帧（16ms）内要做什么事情__

1. 处理用户输入事件
1. js的执行
1. requestAnimation 调用
1. 布局 layout
1. 绘制 paint








export const englishMeta = {
  anchors: [
    '常用英文',
    '常用英文短语',
  ]
}