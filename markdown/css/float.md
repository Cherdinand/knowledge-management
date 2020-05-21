### table的一些特性与表现形式

_table标签（display:table）_

1. table可设置宽高、margin、border、padding等属性。属性值的单位可以使用px，百分比值。
1. `table的宽度默认由内容的宽高撑开，如果table设置了宽度，宽度默认被它里面的td平均分，如果给某一个td设置宽度，那么table剩余的宽度会被其他的td平均分（有点类似flex布局）。`
1. 给table设置的高度起到的作用只是min-height的作用，当内容的高度高于设置的高度时，table的高度会被撑高。

_tr标签（display:table-row）_

1. 给tr设置高度只起到min-height的作用，默认会平分table的高度。
1. tr中的td默认高度会继承tr的高度，若给任一td设置了高度，其他td的高度也同样变高。适合多列等高布局。
1. 设置宽度、margin、都不起作用。

_td标签（display:table-cell）_

1. td默认继承tr的高度，且平分table的宽度。
1. 若table（display:table）不存在，给td设置的宽高不能用百分比只能用准确的数值。
1. `给td设置vertical-align: middle; td元素里面(除float、position:absolute)所有的块级、非块级元素都会相对于td垂直居中。`
1. `给td设置text-align: center; td元素里面所有非block元素(除float、position:absolute)都会相对于td水平居中，虽然block元素不居中，但其中的文字或inline元素会水平居中。`

### table可用的垂直居中方式

``` js
.father {
  width: 100%;
  height: 100%;
  display: table;
}

.son {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

export const FloatMeta = {
  anchors: [
    'table的一些特性与表现形式',
    'table可用的垂直居中方式',
  ]
}







