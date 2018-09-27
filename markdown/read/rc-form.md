Github： [rc-form源码阅读](https://github.com/Cherdinand/read-rc-form)

rc-form版本为2.2.1

### antd

antd提供的Form组件底层引用了这个库。

antd的Form组件返回的依然是html的form。

但给这个Form组件提供了一个静态函数create，也就是我们常见的Form.create()。

而这个Form.create()方法底层就是引用了这个rc-form。

### 别人的笔记

代码最底部创建了一个form，通过语句createForm(configObj)(wrappedComp)。

组件在componentWillMount时候，通过props.form获得被包装上的方法getFieldDecorator，这个方法返回一个函数，该函数接受一个待修饰的组件，本例子中是input。

render部分会调用该函数，该函数内部最终会生成一个inputProps，并在最后通过React.cloneElement(input, {...inputProps})返回被包装的元素。

其中inputProps包含一个内部处理过的onChange事件和一个value属性用来显示文本框的值，作用于该被包装元素input上，当input输入值时候，则会调用内部的onChange事件，触发getFieldDecorator中配置的校验规则，校验输入，并在更新结果后，通过this.forceUpdate方法更新组件，重新触发render，走render内部的流程，这样一来，就形成了所谓的双向数据绑定。

### 个人理解

我们都知道每个表单项（表单组件）都会用getFieldDecorator进行包装，而getFieldDecorator包装表单组件返回一个新的组件。

在调用getFieldDecorator的时候，会调用到getFieldProps函数。

getFieldProps函数当前这个表单项的field进行set和get，可以看作是field的初始化。这样rc-form里的manager，也就是this.fieldStore.fields里对应的field就会被初始化值，并会被绑定上value，onChange，ref等属性。

这样，当前表单项发生变化的时候会触发onChange绑定的回调，然后会改动this.fieldStore.fields里对应field的值。

最后，当我们需要获取到这个表单里所有的值的时候，再通过validateFields方法拿到表单的值，进行接口的调用。

### 抽象理解

看完这个库，突然发现，通过高阶组件和创建内部manager的组件开发模式。

创建内部manager可以管理组件内部的数据。

而高阶组件可以做到api注入，即通过props将api提供给被包裹的组件使用。

两者结合的时候可以做到通过api操作内部manager，从而进行数据的get，set，update等操作。

export const RcFormMeta = {
  anchors: [
    'antd',
    '别人的笔记',
    '个人理解',
    '抽象理解',
  ]
}