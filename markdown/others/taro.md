### 简介

Taro是一套遵循 React 语法规范的多端开发解决方案。

现在市面上端的形态多种多样。Web、微信/百度/支付宝/字节跳动/QQ 小程序、H5、快应用以及 ReactNative 等端，当我们的一个项目需要在多端都有所展示的时候，针对不同的端去写多套代码的成本显然非常的高。

所以，Taro就是能让我们只写一套代码就可以适配多端的其中一个方案。

并且，Taro能让我们用React的形式去编写代码，Taro底层编译的时候会根据我们的需求，帮我们编译成适合不同端的代码。这就是Taro。

但在使用过程中，我发现，Taro并不能提供与React完全相同的代码形式，这可能是因为某些端的代码特性造成的，但已允许大部分的React形式，还是有部分的不一样，需要加以区分。

### 知识点

_this.$scope_

通常我们在组件中使用this可以获取到react组件的实例。但是由于我们最终是编译为小程序的，而我们调用一些API的时候需要传进去的是小程序的组件实例，而不是react组件的实例。这个时候我们就可以用this.$scope来获取到编译后小程序的组件的实例。

### 需要注意的坑及踩过的坑

由于微信小程序的WXML是字符串模板，在Taro将React的JSX语法转化为字符串模板的时候，会受到一些限制，Taro目前只支持大部分的JSX语法，但仍有一些JSX语法不支持使用。

1、 传入给子组件的函数，其属性名必须以on开头。

2、 不能使用除了Array.map之外的方法操作JSX数组。

3、 在1.3.0-beta.0之前不支持在render()之外定义JSX。

4、 在1.3.0-beta.0之前不能在JSX的属性参数中使用rest对象展开符。

5、 在1.3.0-beta.0之前不支持无状态组件。

6、 在微信小程序中，父组件传props给子组件是通过一个properties属性的。而在Taro中，则是通过react方式的this.props传递。但是在Taro的编译中，如果父组件传了props给子组件但是在子组件的任意地方都没有使用的话，这个props值将不会被编译到properties属性中，也就是相当于没传。所以我们在写自定义组件的时候给设置defaultProps可以避免很多异常情况的出现，因为defaultProps中的所有属性都会被设置到 properties 中初始化组件。

7、 不要在 state 与 props 上用同名的字段，因为这些字段在微信小程序中都会挂在 data 上。

8、 在 Taro 编译到小程序端后，组件的 constructor 与 render 默认会多调用一次，表现得与 React 不太一致。这是因为，Taro 的组件编译后就是小程序的自定义组件，而小程序的自定义组件的初始化时是可以指定 data 来让组件拥有初始化数据的。开发者一般会在组件的 constructor 中设置一些初始化的 state，同时也可能会在 render 中处理 state 与 props 产生新的数据，在 Taro 中多出的这一次提前调用，就是为了收集组件的初始化数据，给自定义组件提前生成 data ，以保证组件初始化时能带有数据，让组件初次渲染正常。所以，在编码时，需要在处理数据的时候做一些容错处理，这样可以避免在 constructor 与 render 提前调用时出现由于没有数据导致出错的情况。

9、 我们都知道在Taro的生命周期中可以通过this.$router.params获取到我们传给url中的search部分，而由于第八条的原因，在我们调用生命周期函数之前会先调用一次render函数进行组件的数据初始化，而在这个时候，如果我们是把this.$router.params的取值操作放在render函数中的话就会导致有一次获取不到值而导致的报错行为。所以我们一般将this.$router.params的取值行为放在componentWillMount函数中并setState，然后在render中通过state取值并设置相应的条件判断。

10、 在Taro中JS编码必须用单引号，双引号有可能会导致编译错误。

11、 必须显性地把 this.props.children 全部都写完整才能实现它的功能。不能把 this.props.children 分解为变量再使用。

12、 Taro 的生命周期/路由 和 setState（对应setData） 在小程序端其实是包装成 React API 的一层语法糖，我们把这层包装称之为 Taro 运行时框架。几乎所有 Taro 提供的 API 和语法糖最终都是通过小程序本身提供的 API 实现的，也就是说当 Taro 运行时框架出现问题时，你基本都能使用小程序本身提供的 API 达到同等的需求。

13、 微信小程序表单组件不是受控组件，当用户操作表单时视图会立即改变，但表单的 value 值还是没有变化。如果在表单 onChange、onInput 此类值改变回调中 setState value 为用户操作改变表单之前的值时，Taro 的 diff 逻辑会判断 setState 的 value 值和当前 data.value 一致，则放弃 setData，导致视图没有正确更新。解决办法：`在onChange、onInput 此类值改变回调中 setState value 为当前视图的值`。

14、 在微信小程序中从调用 Taro.navigateTo、Taro.redirectTo 或 Taro.switchTab 后，到页面触发 componentWillMount 会有一定延时。因此一些网络请求可以提前到发起跳转前一刻去请求。而Taro 提供的 componentWillPreload 钩子就是可以给我们用来预加载作小程序性能优化的。

```js
// 跳转后的页面
class Index extends Component {
  componentWillPreload (params) {
    // 在还没进入即将进入此页面的时候就会触发，params为跳转路由里的search部分。
    // 可以在这个地方做一些此页面的初始化操作。
    this.isFetching = true
    return new Promise((resolve) => {
      resolve({name: 'xinxin'});
    })
  }
  
  componentWillMount () {
    // this.$preloadData为componentWillPreload函数的Promise返回值，记住this.$preloadData必须是要Promise返回值才会有值。
    this.$preloadData.then(res => {
        console.log('res: ', res)
        this.isFetching = false
    })
  }
}
```

15、 Component is not found in path "xxx/xxx/xxx" 解决办法：


```js
1、检查有没有编译报错

2、检查编译后的文件是否正确

3、步骤 1 和 步骤 2 如果检查没有问题，重启开发者工具，否则跳到步骤 4

4、提供具体编译报错信息与编译后文件信息的截图
```

### 学到的新招数

_枚举条件渲染_

有时渲染的条件非常多，不管是 if-else 还是 switch-case 来做条件渲染都会显得太麻烦。这时我们可以使用「表驱动法」：枚举渲染。

```js
function Loading (props) {
  const { loadingText, LOADING_STATUS, loadingStatus, onRetry } = props
  return (
    <View className='loading-status'>
      {
        {
          'loading': loadingText,
          'fail': <View onClick={onRetry}> 加载失败, 点击重试 </View>,
          'no-more': '没有更多了'
        }[loadingStatus] /** loadingStatus 是 `loading`、`fail`、`no-more`  其中一种状态 **/
      }
    </View>
  )
}
```

### Useful Tutorial

[Taro官网](https://taro-docs.jd.com/taro/docs/README.html)

export const taroMeta = {
  anchors: [
    '简介',
    '知识点',
    '需要注意的坑及踩过的坑',
    '学到的新招数',
    'Useful Tutorial',
  ]
}