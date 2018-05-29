### 像素

_ppi_

Pixels Per Inch。指屏幕上每英寸可以显示的像素点的数量，即`屏幕像素密度。`

_设备像素和CSS像素_

1. 设备像素(device independent pixels): 设备屏幕的物理像素，任何设备的物理像素的数量都是固定的。

2. CSS像素(CSS pixels): 又称为逻辑像素，是为web开发者创造的，在CSS和javascript中使用的一个抽象的层。

`浏览器不是根据设备像素来工作的，而是根据css像素来工作的。实际宽度的1px对应CSS中的1px，而不是对应设备像素1px。如iphone6屏幕的实际宽度就是375px，对应css中的375px，而它的dpr为2，说明其设备像素为375*2=750px，而iphone6分辨率750 * 1334，`

如

_dpr_

Device Pixel Ratio。设备像素比DPR是默认缩放为100%的情况下，设备像素和CSS像素的比值

```js
DPR = 设备像素 / CSS像素   (某一方向上)
```



















export const RemMeta = {
  anchors: [
    '像素',
  ]
}







