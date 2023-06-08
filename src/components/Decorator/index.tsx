/* eslint-disable */

import React, { Component } from 'react';
import Alert from '@/common/components/Alert/index';

export default class Decorator extends Component {
  componentWillMount() {
    const mx = (t, n, descriptor) => {
      console.log('mx descriptor', descriptor.initializer);

      const o = {};

      descriptor.initializer = function () {
        return {
          x: '111',
          y: '222',
        };
      };

      descriptor.set = (v) => {
        o.v = v;
      };

      descriptor.get = () => {
        return o.v;
      };

      console.log('mx descriptor', descriptor.initializer);

      return descriptor;
    };
    const my = (t, n, descriptor) => {
      console.log('my descriptor', descriptor.initializer);

      descriptor.initializer = function () {
        return {
          x: '1111',
          y: '2222',
        };
      };
      console.log('my descriptor', descriptor.initializer);

      return descriptor;
    };

    class A {
      @mx
      @my
      money = { x: '11', y: '22' };

      m() {
        this.money = {
          x: '3333',
          y: '3333',
        };
      }

      d() {
        console.log('d ', this.money);
      }
    }

    const a = new A();
    console.log('aaa', a.money);

    a.m();
    a.d();
  }

  render() {
    return (
      <div>
        <Alert message='结合Container的代码打开控制台看看输出！' type='warning' />
        {this.props.children}
      </div>
    );
  }
}
