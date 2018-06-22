### 浏览器解析Html和Css

![浏览器webkit内核渲染html和css的流程图](CssWithHtml.png)

从图中可以看到，浏览器对css和html都有一个专门的解析器，用来解析html和css文件。分别解析完成之后会通过类名和选择器将css与html结合，形成渲染对象树，生成web页面的布局（position、float、margin、padding等），画出页面内容（color、background、font等），最后才是展示在我们面前的web页面。

### 样式的来源

`样式的五个来源中优先级从上往下。`

![样式的五个来源](StyleSource.png)

_第一层是浏览器的默认样式表_

不同浏览器的默认样式表是不一样的。所以我们的项目通常会引用一个reset.css的样式表用来统一不同浏览器的默认样式。

_第二层是用户样式表_

这些是给一些有视觉障碍的人用的，如下图是Chrome浏览器中我们可以设置字号和字体。

![用户样式表](UserStyle.png)


export const CssMeta = {
  anchors: [
    '浏览器解析Html和Css',
    '样式的来源',
  ]
}







