### 项目的属性

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。`如果主轴空间大于basis值，则大于的部分会按flex-grow的比例进行放大；如果主轴空间小于basis值，则小于部分会按flex-shrink的比例进行缩小`

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
``` js
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```