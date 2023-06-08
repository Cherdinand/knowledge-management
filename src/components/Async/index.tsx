import React, { Component, ReactElement } from 'react';
import Alert from '@/common/components/Alert/index';

type Props = {
  children: ReactElement;
};

export default class AsyncAwait extends Component<Props> {
  UNSAFE_componentWillMount() {
    this.hiking().then((r) => {
      console.log('r', r);
    });
  }

  async hiking() {
    console.log(1);
    await this.animation(); // 2、否则这里会一直处于等待状态
    console.log(4);
    return 'result';
  }

  async animation() {
    console.log(2);
    await new Promise((resolve, reject) => {
      setTimeout(
        (arg: unknown) => {
          console.log(3, arg);
          resolve(arg); // 1、这里还必须要返回一个Promise的状态
        },
        1000,
        'resolve'
      );
    });
  }

  render() {
    return (
      <div>
        <Alert message="结合Container的代码打开控制台看看输出！" type="warning" />
        {this.props.children}
      </div>
    );
  }
}
