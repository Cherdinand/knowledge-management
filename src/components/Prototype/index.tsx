/* eslint-disable */

import React, { Component } from 'react';
import Alert from '@/common/components/Alert/index';

export default class Prototype extends Component {
  componentWillMount() {
    this.originJavascript();

    console.log('_________________________  分割线  ____________________________');

    this.es6();
  }

  originJavascript = () => {
    function Animal(species: string) {
      // @ts-ignore: implicitThis
      this.species = species;
    }

    Animal.prototype.eat = function () {
      console.log('eat');
    };

    function Cat(name: string) {
      // @ts-ignore: implicitThis
      Animal.call(this, 'Cat');
      // @ts-ignore: implicitThis
      this.name = name;
    }

    function inherit(proto: typeof Object.prototype) {
      function A() {}
      A.prototype = proto;
      // @ts-ignore: ignore the new on function
      return new A();
    }

    Cat.prototype = inherit(Animal.prototype);

    Cat.prototype.constructor = Cat;

    Cat.prototype.miao = function () {
      console.log('miao');
    };
    // @ts-ignore: ignore the new on function
    const buou = new Cat('buou');

    console.dir(Cat);

    console.log('originJavascript', buou);
  };

  es6 = () => {
    class Animal {
      species: string;

      constructor(species: string) {
        this.species = species;
      }

      eat() {
        console.log('eat');
      }
    }

    class Cat extends Animal {
      name: string;

      constructor(name: string) {
        super('Cat'); // super就是调用继承源Animal的constructor
        this.name = name;
      }

      miao() {
        console.log('miao');
      }
    }

    class Dog extends Animal {
      name: string;

      constructor(name: string) {
        super('Dog'); // super就是调用继承源Animal的constructor
        this.name = name;
      }

      wang() {
        console.log('wang');
      }
    }

    const buou = new Cat('buou');

    const erha = new Dog('erha');

    console.log('es6 class', buou);

    console.log('es6 class', erha);

    // @ts-ignore
    console.log(
      'Cat.prototype.__proto__ === Animal.prototype',
      Cat.prototype.__proto__ === Animal.prototype,
    );

    // @ts-ignore
    console.log('Cat.__proto__ === Animal', Cat.__proto__ === Animal); // 继承
  };

  render() {
    return (
      <div>
        <Alert message='结合Container的代码打开控制台看看输出！' type='warning' />
        {this.props.children}
      </div>
    );
  }
}
