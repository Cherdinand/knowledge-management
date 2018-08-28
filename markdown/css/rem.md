### 像素

_ppi_

Pixels Per Inch。指屏幕上每英寸可以显示的像素点的数量，即`屏幕像素密度。`

_设备像素和CSS像素_

1. 设备像素(device independent pixels): 设备屏幕的物理像素，任何设备的物理像素的数量都是固定的。

2. CSS像素(CSS pixels): 又称为逻辑像素，是为web开发者创造的，在CSS和javascript中使用的一个抽象的层。

3. 逻辑像素，也就是一个终端手机的css像素宽。如iphone6的逻辑像素为375px。

`css像素 === 逻辑像素`

`浏览器不是根据设备像素来工作的，而是根据css像素来工作的。实际宽度的1px对应CSS中的1px，而不是对应设备像素1px。如iphone6屏幕的实际宽度就是375px，对应css中的375px，而它的dpr为2，说明其设备像素为375*2=750px，而iphone6分辨率750 * 1334，`

_dpr_

Device Pixel Ratio。设备像素比DPR是默认缩放为100%的情况下，设备像素和CSS像素的比值

_公式演算：_

``` js
DPR = 设备像素 / CSS像素   (某一方向上)

举例iphone6： 2 = 750 / 375

而通常移动端设计稿给的尺寸是640、750等，在康爱多是750的设计稿，也就是以iphone6作为标准进行开发，然后通过rem自动适配其它尺寸。

比如在750设计稿里有一个button，测量结果宽度为300px。即：

稿宽 = 750

元素宽 = 300

那么我在iphone6的375的逻辑像素中会占据多少css像素，或者在iphone6s的414逻辑像素中会占多少css像素？根据这个问题可以得出一个公式：

元素宽 / 稿宽 = css像素 / 逻辑像素   ==>  300 / 750 = css像素 / (375 | 414 | 其它逻辑像素)

变形之后： 

css像素 = （元素宽 / 稿宽） * 逻辑像素

然后我们开始用rem来做适配。

逻辑像素部分我们用lib-flexible库来做到自动给<html>添加font-size。lib-flexible库内部的代码是默认将逻辑像素分为10rem的，也就是说对375逻辑像素的屏幕，会设置font-size: 37.5px，即1rem = 37.5px。

那么公式变为： 

css像素 = （元素宽 / 稿宽） * （逻辑像素 / 10） 

为了要使公式与之前相等，我们需要在设计稿这边乘以10，也就是说公式应该为：

css像素 = (（元素宽 / 稿宽） * 10) * （逻辑像素 / 10） 

再转变： 

css像素 = （元素宽 / （稿宽 / 10）） * （逻辑像素 / 10）

而稿宽 / 10所得的值就是我们将元素宽转变为rem的时候的基准值。

我们将元素宽转变为rem的时候使用了postcss-plugin-px2rem，这是postcss-loader里的一个插件，可以将我们在css写的css通过loader转换成rem，这样我们就可以用设计稿的测量到的元素尺寸（元素宽：300）来直接进行开发。

对于前面的例子：

在iphone6： css像素 = （300 / (750 / 10)） * (375  / 10) = (300 / 75) * 37.5 = 150px

在iphone6s： css像素 = （300 / (750 / 10)） * (414  / 10) = (300 / 75) * 41.4 = 165.5px

```

_相关库_

[lib-flexible](https://github.com/amfe/lib-flexible)

[postcss-plugin-px2rem](https://github.com/ant-tool/postcss-plugin-px2rem)

_相关文章_

[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)

[走向视网膜（Retina）的Web时代](http://www.w3cplus.com/css/towards-retina-web.html)






















export const RemMeta = {
  anchors: [
    '像素',
  ]
}







