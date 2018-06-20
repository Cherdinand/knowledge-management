### typeof & instanceof

Instanceof的判断规则是：对于A instanceof B来说，沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

```js
通常对于值类型的使用typeof，引用类型的使用instanceof。下面是几个特殊用例：
typeof function(){}   // 'function'
typeof [1,2,3]        // 'object'
typeof {}             // 'object'
typeof null           // 'object'

const a = () => {};
const b = [1,2,3]
a instanceof Function  // true
a instanceof Object  // true
b instanceof Array  // true
b instanceof Object  // true
```

### constructor

当函数创建的时候默认就为prototype新建一个constructor指向自己。

### prototype & proto

下文所有的proto指的就是\_\_proto\_\_。

知识储备： 

1. 在JS里，万物皆对象。方法（Function）是对象，方法的原型(Function.prototype)是对象。因此，它们都会具有对象共有的特点。即：对象具有属性__proto__，可称为隐式原型，一个对象的隐式原型指向构造该对象的构造函数的原型，这也保证了实例能够访问在构造函数原型中定义的属性和方法。

1. 方法(Function)方法这个特殊的对象，除了和其他对象一样有上述_proto_属性之外，还有自己特有的属性——原型属性（prototype），这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

1. javascript底层提供的Object，Function函数。 Object是JS所有对象的父级对象，Object（）为构造函数。Function是所有函数对象的构造对象，Function（）为构造函数，所以Object和Function都有prototype属性。

1. `对象是函数创建的（这里将函数理解为构造函数，而对象则是实例对象），而函数又是一种对象。`

1. `每一个实例对象都有proto属性，指向其构造函数的prototype属性。`

1. 每个实例对象都有一个proto属性，每个构建函数都有一个prototype属性，而函数又是对象，所以每个构建函数都有prototype属性和proto属性。`prototype是当前构建函数的原型，而proto是当前函数对象的构建函数（也就是它继承的爸爸）的原型。`

1. proto是每个对象都具有的一个属性，这个指向了它的构造函数的原型（prototype），是它的引用（我们称这个属性为链接），而且每个prototype都有proto属性，因此本身也包含了指向其原型的链接，由此形成了一条链，我们称为原型链。

![原型链](prototype.png)

```js
Function函数是被自身创建的。即：
Function.__proto__  ===  Function.prototype

Object函数是被Function函数创建的。即：
Object.__proto__  ===  Function.prototype

Function.__proto__  ===  Object.__proto__

而Function.prototype是一个对象（属性的集合）。
Function.prototype.__proto__  ===  Object.prototype

而Object.prototype.__proto__  ===  null。
```

```js
function A(){
  this.name = "xinxin";
}
const a = new A();
则：a.__proto__  ===  A.prototype

对于构造函数本身而言：它都是由javascript底层的Function函数构建的，所以：
A.__proto__  ===  Function.prototype

而构造函数的prototype属性，其实就是一个对象，所以都是由Object函数构建的。
A.prototype.__proto__  ===  Object.prototype
```

`访问一个对象的属性时，先在基本属性中查找，如果没有，再沿着__proto__这条链向上找，这就是原型链。`下面是原型链的举例：
```js
class Animal {
  constructor(species){
    this.species = species
  }
  eat(){
    console.log("eat")
  }
}
// Cat 继承 Animal
class Cat extends Animal {
  constructor(name){
    super();
    this.name = name;
  }
  miao(){
    console.log("miao")
  }
}

const buou = new Cat('buou');

buou.__proto__ === Cat.prototype

Cat.prototype.__proto__ === Animal.prototype

Animal.prototype.__proto__ === Object.prototype

Object.prototype.__proto__ === null

这里有一点要注意：

Cat.__proto__ === Animal
```

![原型链](prototype2.png "600px")

[javascript 类属性、类方法、类实例、实例属性、实例方法、prototype、proto测试与小结](http://www.cnblogs.com/mrsunny/archive/2011/05/09/2041185.html)

export const PrototypeMeta = {
  anchors: [
    'typeof & instanceof',
    'constructor',
    'prototype & proto',
  ]
}
