### 基本知识

1、 小程序的开发过程需要面对Android和IOS两大操作系统，以及用于辅助开发的小程序开发者工具。

2、 小程序的逻辑层和渲染层是分开的，逻辑层运行在 JSCore 中，并没有一个完整浏览器对象，因而缺少相关的DOM API和BOM API。

| 运行环境	| 逻辑层	| 渲染层 |
| ------------ | ---- | --- |
| iOS	| JavaScriptCore | WKWebView |
| 安卓	| V8 | chromium定制内核 |
| 小程序开发者工具	| NWJS | Chrome WebView |

3、 小程序的开发需要经过申请小程序帐号（获取到appId）、安装小程序开发者工具（开发工具，功能相当于开发网页是chrome的作用，有很多坑）、配置项目（填写appId）等等过程方可完成

### 代码构成

_app.json_

全局配置文件。包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等。

_page.json_

具体页面的配置文件。可覆盖全局配置，当程序中的某个页面需要不同于全局配置的时候可以用。

_project.config.json_

项目配置文件。用于多个开发成员共享一套项目的个性化配置，其中会包括编辑器的颜色、代码上传时自动压缩等等一系列选项。

_WXML_

类似于HTML的微信小程序专属的模板语言。

_WXSS_

类似于CSS的微信小程序专属的样式语言。

1、 新增了尺寸单位rpx。WXSS 在底层支持新的尺寸单位 rpx ，开发者可以免去换算的烦恼，只要交给小程序底层来换算即可。

2、 提供了全局的样式和局部样式。和前边 app.json, page.json 的概念相同，你可以写一个 app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。

_JS_

逻辑交互还是我们的JS。

小程序提供了丰富的 API，利用这些 API 可以很方便的调起微信提供的能力，例如获取用户信息、本地存储、微信支付等。

### 宿主环境

微信客户端即为小程序的宿主环境。小程序可以使用很多微信客户端提供的功能。

_渲染层和逻辑层_

与Web网页端单线程模型不同的是，小程序是多线程的。

小程序的运行环境分成渲染层和逻辑层，其中 WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。

而由于一个小程序具有多个页面，所以渲染层存在多个WebView线程。这两个线程的通信会经由微信客户端（下文中也会采用Native来代指微信客户端）做中转，逻辑层发送网络请求也经由Native转发。

![小程序的通信模型](Tongxinmoxing.png "600px")

### Useful Tutorial

[小程序开发指南](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=0006a2289c8bb0bb0086ee8c056c0a)
[微信小程序技术原理分析](https://zhaomenghuan.js.org/blog/wechat-miniprogram-principle-analysis.html)

export const xiaochengxuMeta = {
  anchors: [
    '基本知识',
    '代码构成',
    '宿主环境',
    'Useful Tutorial',
  ]
}