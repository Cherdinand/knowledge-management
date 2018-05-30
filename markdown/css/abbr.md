### background

在CSS2.1里，background属性的简写方式包含五种属性值，从CSS3开始，又增加了3个新的属性值，加起来一共8个。

CSS2.1

1. background-color 使用的背景颜色。

2. background-image 使用的背景图像。

3. background-repeat 如何重复背景图像。

4. background-attachment 背景图像是否固定或者随着页面的其余部分滚动。

5. background-position 背景图像的位置。

CSS3

6. background-size 背景图片的尺寸。

7. background-origin 背景图片的定位区域。

8. background-clip 背景的绘制区域。

```js
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];

background: `#F8F3E8 url("${introduce && introduce.adBackUrl}") left top / 100% 550px no-repeat`,

需要注意的是里面的/，它和font以及border-radius里简写方式使用的/用法相似。/可以在支持这种写法的浏览器里在background-position后面接着写background-size。
```

export const AbbrMeta = {
  anchors: [
    'background',
  ]
}







