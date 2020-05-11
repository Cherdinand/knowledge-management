### 总结

`当我们想让对象或类的属性独一无二，不会被后续操作覆盖属性名的时候，就可以使用Symbol来做到。`

`当我们需要属性值是独一无二的，而且并不关注属性值是什么值的时候，也可以用Symbol来当属性值。`

### 定义

`Symbol诞生的原因是为了从根本上防止属性名的冲突，所以Symbol能保证每个属性的名字都是独一无二的。`

`Symbol是ES6引进的一种新的原始数据类型，表示独一无二的值。原始数据类型还有null、undefined、number、string、boolean。`

### API

_Symbol.for_

它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局。

`除了第一次会创建一个新的Symbol并注册到全局。接下来的都不会创建，但会返回找到的Symbol值`

```js
const a = Symbol.for('aaaa');  // 创建一个描述为aaaa的Symbol值并注册到全局

const b = Symbol.for('aaaa');  // 在全局找到名为aaaa的Symbol值并返回

console.log(a === b) // true
```

_Symbol.keyFor_

接收一个Symbol值，返回一个`经过Symbol.for注册`的Symbol类型值的描述

```js

const a = Symbol.for('aaaaa')

const b = Symbol.keyFor(a)

console.log('333333333', a,b);  // Symbol('aaaaa')  aaaaa
```

### 特性

_不可遍历性_

`Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。`

但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

还有一个新的API `Reflect.ownKeys()`， 可以返回所有类型的键名，包括常规键名和Symbol键名。

### 用法

_消除魔术字符串_

`魔术字符串的意思是在项目中多次出现与代码行程强耦合的字符串。`

魔术字符串多了是不利于代码维护的，通常我们可以改用清晰的变量代替，如果要修改，也只是修改一处地方。

而由于Symbol值是独一无二的，所以在这里我们可以利用Symbol值来处理。

```js
由于这种场景里我们shapeType.triangle的值只要是唯一的就可以了，所以可以用Symbol来做。
const shapeType = {
  triangle: Symbol(),
  rectangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

_模仿私有方法_

由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的属性或方法。

```js
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

export const SymbolMeta = {
  anchors: [
    '总结',
    '定义',
    'API',
    '特性',
    '用法',
  ]
}
