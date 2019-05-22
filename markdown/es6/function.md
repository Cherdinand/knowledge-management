### parseInt

```js
parseInt(s: string, radix?: number): number  // 以radix进制处理字符串s，并转化为十进制的number返回

// 如果字符串s的第一个字符不是数字字符或者负号，则返回NAN。但是要注意的是，如果指定的radix是十六进制，那么A-F相当于数字字符。

parseInt("AF", 16)  // 175
parseInt("") // NAN

// 以下三个例子说明parseInt函数会将能在给定进制内处理的字符串以该给定进制处理之后返回其对应的十进制数字
parseInt("212", 2) // NAN 二进制处理不了数字字符2 
parseInt("1212", 2) // 1 二进制处理不了数字字符2，所以只处理到1
parseInt("1010222", 2) // 10 二进制处理完“1010”字符串，将字符串“1010”以二进制的方式解析并处理成十进制返回
```

### parseFloat

```js
parseFloat(s: string): number  // 获取字符串s中的浮点数值并返回

// 第一个小数点有效，之后的无效

parseFloat("413.4326.214") // 413.4326
```

### Array

_toString_

```js
[1,2,3,4].toString() // 1,2,3,4
```

_push & pop_

```js
const arr = [111,222,333]

arr.push(555) // 4 将所给参数插入到数组的末尾并返回push之后数组的长度arr.length
arr.pop()  // 333 将数组中的最后一项移除并返回
```


_shift & unshift_

```js
const arr = [111,222,333]

arr.shift() // 111 将数组中的第一项移除并返回
arr.unshift("555")  // 4 将所给参数插入到数组的开头并返回unshift之后数组的长度arr.length
```

_reverse_

```js
[1,2,3,4].reverse() // [4,3,2,1] 将数组进行逆向排序
```

_sort_

```js
Array.sort(( (a,b): number )?: Function) // 可接收一个函数参数，通常会使用函数参数，因为在不添加函数参数的时候会由于其内部处理导致bug

// 如果 number 小于 0 ，那么 a 会被排列到 b 之前；
// 如果 number 等于 0 ， a 和 b 的相对位置不变。
// 如果 number 大于 0 ， b 会被排列到 a 之前。

[12,54,76,23,64].sort((a, b) => a - b}) // 升序排列
[12,54,76,23,64].sort((a, b) => b - a}) // 降序排列

```

_concat_

```js
[1,3].concat([4,5, [2]])  // [1,3,4,5,2]  创建一个新的数组副本进行数组的合并并返回合并后的数组，不影响原数组
```

_slice_

```js
Array.slice(start: number, end?: number): Array  // start => 起始位置， end => 结束位置 返回切割后的新数组 [start, end)

[111,222,333,444].slice(1) // [222,333,444] 只传一个参数时从起始位置切到数组末尾
[111,222,333,444].slice(1, 3) // [222,333] 不包含index = 3 的项
```

_splice_

```js
Array.splice(start: number, deleteCount?: number, ...items): Array  // 返回被删除的项组成的数组

// 删除
[1,2,3,4].splice(1) // [2,3,4] 从index=1的项开始删除
[1,2,3,4].splice(1, 2) // [2,3] 从index=1的项开始删除两项

// 插入
[1,2,3,4].splice(1, 0, "55") // [] 从index=1的项开始插入“55”
[1,2,3,4].splice(1, 0, "55", "66") // [] 从index=1的项开始插入“55”和”66“两项

// 替换
[1,2,3,4].splice(1, 1, "55") // [2] 从index=1的项开始将2替换成“55”， 替换掉也算被删除
```

_indexOf & lastIndexOf_

```js
Array.indexOf(item, start?: number): number // item：要查找的项， start: 从哪个坐标开始查找 如果数组中找不到要找的item则返回-1，否则返回其对应的坐标
Array.lastIndexOf(item, start?: number): number

[12,23,34,56,34,23].indexOf(111) // -1 没找到
[12,23,34,56,34,23].indexOf(34) // 2  从前面开始找指定的项，并返回其坐标
[12,23,34,56,34,23].indexOf(34, 3) // 4  从坐标为3的项开始找指定的项，并返回其坐标
[12,23,34,56,34,23].lastIndexOf(34) // 4  从后面开始找指定的项，并返回其坐标
```

_every & some_

```js
Array.every(filterFunction: Function): boolean // 如果数组中的每一项都能让filterFunction返回true，则返回true
Array.some(filterFunction: Function): boolean  // 如果数组中的某一项能让filterFunction返回true，则返回true

const arr = [1,2,3,4]

arr.every((item) => { return item < 5 })  // true
arr.some((item) => { return item < 2 })  // true
```

_filter & map & forEach_

```js
Array.forEach(bianliFunction: Function)        // 对数组中的每一项使用bianliFunction，无返回值
Array.map(bianliFunction: Function): Array     // 对数组中的每一项使用bianliFunction，并返回经过bianliFunction处理之后的值组成的数组。生成新数组，不改变原数组
Array.filter(bianliFunction: Function): Array  // 对数组中的每一项使用bianliFunction，并返回能让bianliFunction返回true的item组成的数组。生成新数组，不改变原数组

[1,2,3].filter((item) => item < 2)  // [1]
[1,2,3].map((item) => item + 1)     // [2,3,4]
```

_reduce & reduceRight_

```js
Array.reduce(hebingFunction: Function, initailValue)       // initailValue => 想要生成的新对象的数据形态；从数组左边开始调用hebingFunction，生成新数组，不改变原数组
Array.reduceRight(hebingFunction: Function, initailValue)  // initailValue => 想要生成的新对象的数据形态；从数组右边开始调用hebingFunction，生成新数组，不改变原数组

function hebingFunction(result, currentValue, initailValue)

[1,2,3,4].reduce((result, curValue) => {
  return result.concat(curValue + 1)
}, [])  // [2,3,4,5]


['a','b','c'].reduce((result, curValue) => {
  result[curValue] = curvalue
  return result
}, {})  // {a: "a", b: "b", c: "c"}
```

### Date

_Date.now_

```js
Date.now() === (new Date()).getTime()  // 能直接获取到当前时间的毫秒数
```

### RegExp

正则表达式的三个标志： 

1. g： 表示全局模式，即正则表达式将被应用于所有字符串，而非在发现第一个匹配项的时候立即停止。
1. i： 表示不区分大小写模式，即在确定匹配项的时候忽略大小写。
1. m： 表示多行模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与正则表达式匹配的项。

`一个正则表达式就是一个模式与上述三个标志的组合体。`

_exec_

```js
reg.exec(str: string)
```

_test_

```js
reg.test(str: string): boolean
```

### String

 _charAt_
 
 ```js
String.charAt(index: number): string // 接收一个index坐标，查询字符串在该坐标下的字符并返回该字符 

"asdf".charAt(1) // "s"
 ```
 
 _charCodeAt_

 ```js
String.charCodeAt(index: number): number // 接收一个index坐标，查询字符串在该坐标下的字符的字符编码并返回该字符编码 

"asdf".charCodeAt(1) // 115 字符s的字符编码
 ```

 _concat_

```js
String.concat(...str: string): string // 合并一个或多个字符串

"asdf".concat("zxcv", "b", "n") // "asdfzxcvbn"
```

_slice & substr & substring_

```js
String的这三个函数的start参数都是表示从哪个坐标开始切字符串，而slice和substring的第二个参数end表示的切割结束的坐标，而且是左闭右开区间；而substr的第二个参数end表示的是数量，表示切割多少个字符，并且是左闭右闭区间

String.slice(start: number, end: number): string      // [string, end)  左闭右开区间
String.substr(start: number, end: number): string     // [string, string + end]  左闭右闭区间
String.substring(start: number, end: number): string  // [string, end)  左闭右开区间

"asdf".slice(1, 2) // "s"
"asdf".substring(1, 2) // "s"
"asdf".substr(1, 2) // "sd"
```

_indexOf & lastIndexOf_

```js
zifuchuan.indexof(str: string): number      // 从zifuchuan左边开始查找给定字符串是否存在，如果存在则返回其在zifuchuan中的坐标，如果不存在则返回-1
zifuchuan.lastIndexof(str: string): number  // 从zifuchuan右边开始查找给定字符串是否存在，如果存在则返回其在zifuchuan中的坐标，如果不存在则返回-1

"asdfasdf".indexOf("sd")      // 1
"asdfasdf".lastIndexOf("sd")  // 5
"asdfasdf".indexOf("www")  // -1
```

_trim_

消除字符串左右两边空格。

_toLowerCase & toLocaleLowerCase & toUpperCase & toLocaleUpperCase_

改变字符串的大小写，建议用带地区的toLocaleLowerCase和toLocaleUpperCase。

### URI编码

_encodeURI & encodeURIComponent & decodeURI & decodeURIComponent_

```js

encodeURI("https://www.google.com/search?q=jwt&rlz=1C1GCEU_zh-CNHK819HK819&oq=jwt&aqs=chrome..69i57j0l5")
// https://www.google.com/search?q=jwt&rlz=1C1GCEU_zh-CNHK819HK819&oq=jwt&aqs=chrome..69i57j0l5 

encodeURIComponent("https://www.google.com/search?q=jwt&rlz=1C1GCEU_zh-CNHK819HK819&oq=jwt&aqs=chrome..69i57j0l5")
// https%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Djwt%26rlz%3D1C1GCEU_zh-CNHK819HK819%26oq%3Djwt%26aqs%3Dchrome..69i57j0l5
```

### Math

_ceil & floor & round_

```js
Math.ceil(num: number): number   // 向上舍入为最接近的整数
Math.floor(num: number): number  // 向下舍入为最接近的整数
Math.round(num: number): number  // 按四舍五入舍入为最接近的整数

Math.ceil(21.1) // 22
Math.floor(22.9)  // 22
Math.round(25.5)  // 26
```

_random_

```js
Math.random(): number // 随机生成一个（0,1）的小数

// 获取一个[min, max]的随机数的函数
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

### Object

_defineProperty & defineProperties_

```js
Object.defineProperty(obj: object, prop: string, descriptorObj: object)  // 定义一个对象中某个属性的描述对象
Object.defineProperties(obj: object, propsObj: object)                   // 定义一个对象中多个属性的描述对象

let o = {};

Object.defineProperty(o, "name", {
  writable: true,
  enumerable: true,
  configurable: true,
  value: "xinxin",
})

Object.defineProperties(o, {
  // 数据属性
  _name: {
    writable: true,
    enumerable: true,
    configurable: true,
    value: "xinxin",
  },
  
  // 访问器属性
  name: {
    enumerable: true,
    configurable: true,
    get: function(){
      return this._name;
    },
    set: function(v){
      this._name = v;
    }
  }
})
```

_getOwnPropertyDesctiptor & getOwnPropertyDesctiptors_

```js
Object.getOwnPropertyDesctiptor(obj: object, prop: string): object  // 获取一个对象中某个属性的描述对象
Object.getOwnPropertyDesctiptors(obj: object): object               // 获取一个对象中所有属性的描述对象

let o = {
  name: "xinxin", age: 11
}

Object.getOwnPropertyDesctiptor(o, "name")
Object.getOwnPropertyDesctiptors(o)
```

_isPrototypeOf & getPrototypeOf_

```js
prototypeObj.isPrototypeOf(objectInstance)  // 原型对象prototypeObj在不在objectInstance的原型链上

Object.getPrototypeOf(instance) // 获取某个实例instance的构造函数的原型对象

// 注意这两个函数都是针对于实例与构造函数的原型对象之间的关系的，而不是构造函数与构造函数的原型之间的关系，即：

function Animal(name){
  this.name = name;
}

Animal.prototype.showBloodColor = function() {
  console.log("red");
};

const Cat = new Animal("cat");

Object.getPrototypeOf(Cat) === Animal.prototype // true 

// 可以看到对于构造函数Animal来说，虽然它的原型对象是Animal.prototype，但是它的构造函数的原型对象并不是Animal.prototype。而是把构造函数Animal当成Function的实例之后，Animal的构造函数的原型对象等于Function.prototype。这说明了getPrototypeOf描述的是实例和构造函数的原型对象之间的关系。
Object.getPrototypeOf(Animal) === Animal.prototype // false 
Object.getPrototypeOf(Animal) === Function.prototype  // true  将Animal作为一个函数实例，所以其构造函数是Function
Object.getPrototypeOf(Animal.prototype) === Object.prototype // true  Animal.prototype本质上也是个对象实例，所以其构造函数是Object

// 同样，对于isPrototypeOf也是一样
Animal.prototype.isPrototypeOf(Animal)  // false
Animal.prototype.isPrototypeOf(Cat)  // true
Function.prototype.isPrototypeOf(Animal)  // true Animal函数对象是由构造函数Function生成的
Object.prototype.isPrototypeOf(Animal)  // true  构造函数Function实际上又是对象，所有对象都是有构造函数Object生成的
```

_hasOwnProperty_

```js
A.hasOwnProperty(prop: string)  // A是否在自己的实例对象而非原型对象上有prop属性
```

### node节点

```js
node = {
  // 每一个node节点都具备的常用属性
  nodeType    // 节点类型
  nodeName    // 节点名称
  nodeValue   // 节点值
  childNodes  // 子节点类数组。（NodeList，是个类数组，也是动态的集合，意味着每次访问都会重新查询整个文档，对性能有影响）
  parentNode  // 父节点
  previousSibling  // 前一个兄弟节点
  nextSibling      // 后一个兄弟节点
  firstChild       // 第一个子节点
  lastChild        // 最后一个子节点
  ownerDocument    // 节点所属的文档document
  hasOwnChildNodes()  // 查询是否有子节点
  cloneNode()         // 创建一个节点的副本
  normalize()         // 处理文档树中的文档节点
  appendChild()
  insertBefore()
  replaceChild()
  removeChild()
  
  // 对于HTML元素（div、p等）
  attributes          // 元素的所有props的集合。（NamedNodeMap，是个类数组，也是动态的集合，意味着每次访问都会重新查询整个文档，对性能有影响）
  getAttribute()      // 获得某个元素的props
  setAttribute()      // 设置某个元素的props
  removeAttribute()   // 移除某个元素的props
  classList           // 元素类名的数组，可以操作元素的类名
  dataset             // 可访问元素自定义的属性。（自定义属性以"data-"开头）
  innerHTML           // 返回元素的所有子节点
  outerHTML           // 返回包含当前元素及其所有子节点
  scrollIntoView      // 让元素出现在可视区域
  style: {            // 元素的行内样式对象（不包含外部样式表或嵌入样式表里的css）
    cssText           // 元素的css字符串
  }
}


```

### document

```js
document = {
  documentElement  // 指向html的引用
  body             // 指向body的引用 
  domain           // 当前页面URL的域名。可用于解决JS跨域，
  implementation: {
    hasFeature()  // 浏览器有没有某个特性
  }
  write()         // 向文档中写入DOM
  writeIn()       // 向文档中写入DOM，并在字符串的末尾添加一个换行符（\n）
  createElement() // 创建新元素
  createTextNode() // 创建文本元素
  querySelector()       // 返回根据css选择符匹配到的第一个元素
  querySelectorAll()    // 返回根据css选择符匹配到的所有元素的集合 
  activeElement         // 始终会引用当前获得了焦点的元素
  defaultView: {
      getComputedStyle()  // 获得某个元素的经过计算之后（包含外部样式表或嵌入样式表里的css）的css代码
  } 
  styleSheets: [          // 应用于当前文档的所有css样式表，包含<style>元素和rel="stylesheet"的<link>元素
    {
      cssRules: [         // 数组。对应某个css样式表的每一条css样式
        {
          cssText         // 那一条样式的样式值字符串，包含选择符
          style: {
            cssText       // 那一条样式的样式值字符串，不包含选择符
          }
        }
      ] 
    }         
  ] 
}
```
                                                                                                                                                   
export const FunctionMeta = {
  anchors: [
    'parseInt',
    'parseFloat',
    'Array',
    'Date',
    'RegExp',
    'String',
    'URI编码',
    'Math',
    'Object',
    'node节点',
    'document',
  ]
}
