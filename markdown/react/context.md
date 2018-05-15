使用getChildContext方法将属性传递给子组件，并使用childContextTypes声明传递数据类型，子组件中需要显式地使用contextTypes声明需要用到的属性的数据类型。

### contextTypes
子组件使用。当需要在当前组件使用从上级组件传入的context的属性时，需要为用到的属性声明数据类型。

### childContextTypes
声明传递给子组件的属性的数据类型。

### getChildContext
getChildContext可以指定传递给子组件的属性。

和访问context的属性是需要通过contextTypes指定可访问的元素一样。getChildContext 指定的传递给子组件的属性需要先通过childContextTypes来指定，不然会产生错误。

`getChildContext函数将会在每次state或者props改变时调用`。为了更新context中的数据，使用this.setState触发本地状态的更新。这将触发getChildContext的逻辑生成一个新的context并且数据的改变可以被子元素收到。

### 使用试例
``` js
const PropTypes = require('prop-types');

class Button extends React.Component {
  static contextTypes = {
    color: PropTypes.string
  };
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  static childContextTypes = {
    color: PropTypes.string
  }

  getChildContext() {
    // 每次MessageList的props或者state发生变化都会调用getChildContext函数
    // 所以这里做的复杂一点可以根据props或者state来return不同的color值
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}
```

export const ContextMeta = {
  anchors: [
    'contextTypes',
    'childContextTypes',
    'getChildContext',
    '使用试例',
  ]
}