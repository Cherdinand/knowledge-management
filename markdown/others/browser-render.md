### 重点

通过阅读参考资料的文章，划出其中的重点。

1. js脚本在文档的什么地方插入，就在什么地方执行（当我们没有使用defer的时候）。
1. js的加载会阻塞DOM的构建。
1. 而因为js也可以修改CSSOM，而不完整的CSSOM是无法使用的，所以js在执行的时候必须得有完整的CSSOM。这意味着CSSOM的构建会阻塞js的执行，也就是CSSOM会阻塞DOM的构建。
1. `可以看出CSSOM 阻止任何东西渲染。在CSS没处理好之前所有东西都不会展示。`
1. 当CSSOM、DOM构建完和js执行完之后，我们获得了可以用于渲染的CSSOM和DOM。CSSOM + DOM 会生成一个渲染树，渲染树只会捕获页面上可见的元素，所以一些display: none的元素节点将不会在渲染树上。

### 优化策略

1. 减少关键资源的大小。 三大绝招：Minify，Compression和Cache（css，js文件涉及到网络请求）。

1. 我们知道CSSOM的构建会影响到js的执行，从而影响到DOM的构建。所以优化思路之一就是CSSOM的构建。在这里我们可以做的有: 

 1) 让css尽快加载（在Head中用link），让js延迟执行（在body底部用script）。
 
 2) 避免css选择符节点层级过多（三层以内），加快CSSOM的构建。
 
 3) 内联CSS样式，在header中使用style标签添加首屏渲染所需的css样式，减少http请求。
 
### 重绘和回流

Javascript动态修改了DOM属性或是CSS属性会触发浏览器的重绘或者回流。

1. 重绘是当节点需要更改外观而不会影响布局的，比如改变 color 就会触发重绘。
1. 回流是布局或者几何属性需要改变就会触发回流，回流会重新计算元素的布局。

看定义就可以知道，`回流的成本是大于重绘的。回流必定会发生重绘，而重绘不一定会引发回流。`

`任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流。`

常见引起回流属性和方法：

1. 添加或者删除可见的DOM元素；
1. 元素尺寸改变——边距、填充、边框、宽度和高度
1. 内容变化，比如用户在input框中输入文字
1. 浏览器窗口尺寸改变——resize事件发生时
1. 计算 offsetWidth 和 offsetHeight 属性
1. 设置 style 属性的值

### async与defer

引用js的script标签也是优化点之一。

 ![Defer and Async](DeferAsync.png "600px")
 
 _async与defer的区别_

从上图我们就可以看出，两者在加载的时候与DOM的构建是并行的，所以此时不会阻塞DOM的构建。区别在于：

1、 多个async脚本只要其中任意一个加载完成，就会立即执行，所以如果多个脚本之间具有依赖性是不适合用async的。而且async脚本在执行的时候会阻塞DOM的构建。

2、 多个defer脚本在加载和执行阶段都不会阻塞DOM的构建。defer脚本会等待DOM构建完毕时才按顺序执行，所以多个脚本之间如果具有依赖性，使用defer是最好的。

### 参考资料

[完整介绍了浏览器渲染机制和如何防止重绘回流造成的性能损耗](https://github.com/ljianshu/Blog/issues/51)

[完整介绍了浏览器渲染机制和优化首屏渲染](https://juejin.im/entry/5b34d673f265da59b37e8490)

export const browserRenderMeta = {
  anchors: [
    '重点',
    '优化策略',
    '重绘和回流',
    'async与defer',
    '参考资料',
  ]
}












