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

### 浏览器默认样式 

`浏览器加载了html之后只为一件东西——dom树，`浏览器把html变为dom树结构，就完成了对html的结构化。至于后来对视图的渲染，p是block、br换行，那是整合了css之后的事情。而浏览器整合css又是另一个路线，和解析html是分开的。这里的“css”就包含了浏览器默认样式。

`浏览器将载入的html变为dom树，但是此时没有任何显示样式。所以显示的样式，都是css定义的，浏览器只会通过css来渲染视图样式。`

_display: list-item_

我们在使用display时，常用的值一般是：inline/block/inline-block，用不到list-item。display: list-item是列表ul、ol中li的显示方式。

_display: table_

在仅仅考虑容器尺寸，不考虑内容区别的前提下，div和table容器的区别是什么？

答案是——div宽度和父容器相同，table宽度根据内容而定——即table具有“包裹性”。

### 选择器

1. 选择一个祖先的所有子孙节点，例如 div p{…}

1. 选择一个父元素的所有直属节点，例如 div > p{…}

1. 匹配紧随span元素之后的第一个同级a元素，例如 span + a{…}

1. 匹配紧随span元素之后的所有同级a元素，例如 span ~ a{…}

如果让你在各个列表项li添加一个下底线，之前我都是向所有的li添加一个border-bottom，然后再把最后一个li的border-bottom设为none；但是现在我们可以如下设置：

``` js
<ul>
  <li className={styles.lii}>1</li>
  <li className={styles.lii}>2</li>
  <li className={styles.lii}>3</li>
</ul>

.lii ~ .lii {
  border-top: 1px solid red;
}
```

_UI伪类_

``` js
a:hover {}
a:active {}
a:link {}
a:visited {}
input:focus {}
```

_结构化伪类_

``` js
a:nth-child(2) {}  // 匹配其父元素下面的第二个元素且第二个标签类型为a元素的元素（必须是父元素下的第二个元素）
a:first-child {}
a:last-child {}
a:nth-of-type(2) {} // 匹配其父元素下面的第二个标签类型为a的元素（不一定是父元素下的第二个元素）
a:first-of-type {}
a:last-of-type {}
```

_伪元素_

``` js
a:before {}
a:after {}
```

export const CssMeta = {
  anchors: [
    '浏览器解析Html和Css',
    '样式的来源',
    '浏览器默认样式',
    '选择器',
  ]
}







