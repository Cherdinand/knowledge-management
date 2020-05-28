### Event Loop

`Js引擎本身不存在任何内建的异步概念。`那我们在编程中常见到的异步是谁提供的呢？

`我们知道JS引擎并不是运行在一个隔离的区域，而是运行在一个宿主环境中。`通常是浏览器，但是现在也可以包含nodeJs服务器、微信等等环境。而在所有的宿主环境中都会提供一个Event Loop机制。

`Event Loop机制为我们处理代码中的事件、请求等异步机制，然后通知JS引擎在某个时刻执行程序的一个单独的代码块。`没错，JS引擎仅仅是执行代码块而已。

### 宏队列和微队列

`注：这里只针对浏览器和NodeJS`

宏队列，macrotask，也叫tasks。 一些异步任务的回调会依次进入macrotask queue，等待后续被调用，这些异步任务包括：

setTimeout
setInterval
setImmediate (Node独有)
requestAnimationFrame (浏览器独有)
I/O
UI rendering (浏览器独有)

微队列，microtask，也叫jobs。 另一些异步任务的回调会依次进入microtask queue，等待后续被调用，这些异步任务包括：

process.nextTick (Node独有)
Promise
Object.observe
MutationObserver

### 浏览器的Event Loop

![事件循环](EventLoop.png "700px") 

这张图将浏览器的Event Loop完整的描述了出来，我来讲执行一个JavaScript代码的具体流程：

1. 执行全局Script代码，这些代码有一些是同步语句，有一些是异步语句（比如setTimeout等）；异步语句的回调会被放入 microtask queue 或 macrotask queue 中
1. 全局Script代码执行完毕后，调用栈Stack会清空；
1. 从微队列microtask queue中取出位于队首的回调任务，放入调用栈Stack中执行，执行完后microtask queue长度减1；
1. 继续取出位于microtask队首的任务，放入调用栈Stack中执行，以此类推，直到直到把microtask queue中的所有任务都执行完毕。`注意，如果在执行microtask的过程中，又产生了microtask，那么会加入到队列的末尾，也会在这个周期被调用执行；`
1. microtask queue中的所有任务都执行完毕，此时microtask queue为空队列，调用栈Stack也为空；
1. 取出宏队列macrotask queue中位于队首的任务，放入Stack中执行；
1. 执行完毕后，调用栈Stack为空；
1. 重复第3-7个步骤；
1. ......

可以看到，这就是浏览器的事件循环Event Loop。这里归纳3个重点：

1. 宏队列macrotask一次只从队列中取一个任务执行，执行完后就去执行微任务队列中的任务；
1. 微任务队列中所有的任务都会被依次取出来执行，直到microtask queue为空；
1. `图中没有画UI rendering的节点，因为这个是由浏览器自行判断决定的，但是只要执行UI rendering，它的节点是在执行完所有的microtask之后，下一个macrotask之前，紧跟着执行UI render。`

export const EventLoopMeta = {
  anchors: [
    'Event Loop',
    '宏队列和微队列',
    '浏览器的Event Loop',
  ]
}





















export const TypeTransferMeta = {
  anchors: [
    '基本规则',
    'falsy值',
    '按位取反操作符',
    'ToNumber',
    '||和&&操作符',
    '宽松等价与严格等价',
    'toPrimitive',
    'falsy值的比较',
    '宽松等价可行性',
    '一个大坑',
  ]
}
