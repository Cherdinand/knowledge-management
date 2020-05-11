### 容器的属性

flex-direction决定主轴的方向，默认水平，起点在左端

``` js
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

flex-wrap决定项目换不换行，如何换行

``` js
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

flex-flow: flex-direction flex-wrap; flex-direction和flex-wrap的简写。

justify-content属性定义了项目在主轴上的对齐方式。
``` js
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

align-items属性定义项目在副轴上如何对齐。
``` js
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

align-content属性定义了多根轴线的对齐方式（当用了flex-wrap:wrap;允许换行了之后就有多跟主轴线）。如果项目只有一根轴线，该属性不起作用。
``` js
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### 项目的属性

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。`如果主轴空间大于basis值，则大于的部分会按flex-grow的比例进行放大；如果主轴空间小于basis值，则小于部分会按flex-shrink的比例进行缩小`

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
``` js 
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

flex: flex-grow flex-shrink flex-basis; flex属性是三者的简写,默认值取分别的默认值是 0 1 auto；
``` js
flex: auto; <=> flex: 1 1 auto; 
flex: none; <=> flex: 0 0 auto; 
flex: 1; <=> flex: 1 1 0%;
```

flex-basis 规定的是子元素的基准值。所以是否溢出的计算与此属性息息相关。看以下的例子加以理解：

``` js
<div class="parent">
    <div class="item-1"></div>
    <div class="item-2"></div>
    <div class="item-3"></div>
</div>

<style type="text/css">
    .parent {
        display: flex;
        width: 600px;
    }
    .parent > div {
        height: 100px;
    }
    .item-1 {
        width: 140px;
        flex: 2 1 0%;
        background: blue;
    }
    .item-2 {
        width: 100px;
        flex: 2 1 auto;
        background: darkblue;
    }
    .item-3 {
        flex: 1 1 200px;
        background: lightblue;
    }
</style>
```
主轴上父容器总尺寸为 600px

子元素的总基准值是：0% + auto + 200px = 300px，其中

0% 即 0 宽度
auto 对应取主尺寸即 100px
故剩余空间为 600px - 300px = 300px

伸缩放大系数之和为： 2 + 2 + 1 = 5

剩余空间分配如下：

item-1 和 item-2 各分配 2/5，各得 120px
item-3 分配 1/5，得 60px
各项目最终宽度为：

item-1 = 0% + 120px = 120px
item-2 = auto + 120px = 220px
item-3 = 200px + 60px = 260px
`当 item-1 基准值取 0% 的时候，是把该项目视为零尺寸的，故即便声明其尺寸为 140px，也并没有什么用，形同虚设`

而 item-2 基准值取 auto 的时候，根据规则基准值使用值是主尺寸值即 100px，故这 100px 不会纳入剩余空间

export const FlexMeta = {
  anchors: [
    '容器的属性',
    '项目的属性'
  ]
}