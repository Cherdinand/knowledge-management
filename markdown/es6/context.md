### 准备阶段

在一段js代码拿过来真正一句一句运行之前，浏览器已经做了一些“准备工作”，其中就包括对变量的声明，而不是赋值。变量赋值是在赋值语句执行的时候进行的。

``` js
console.log(a) // undefined
var a = 10

相当于：

var a; // 变量提升，在这里我们把这一阶段叫做准备阶段
console.log(a)
a = 10
```

在准备阶段完成了下面这些工作：

1. 变量、函数表达式——变量声明，默认赋值为undefined；

1. this——赋值；

1. 函数声明——赋值；

这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。

``` js
函数声明： 
console.log(fn)  // function fn(){}
function fn(){}  // 直接赋值
 
函数表达式：
console.log(fn)  // undefined
const fn = function(){} // 表达式存在变量提升
```

### 执行上下文环境

给执行上下文环境下一个通俗的定义——在执行代码之前，把将要用到的所有的变量都事先拿出来，有的直接赋值了，有的先用undefined占个空。

`每次调用函数，都会产生一个新的执行上下文环境。`

`函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量（当前作用域没有定义的变量叫做自由变量）的作用域。`

### 作用域

`javascript除了全局作用域之外，只有函数可以创建的作用域。`

`作用域在函数定义时就已经确定了。而不是在函数调用时确定。`

`要到定义这个函数的那个作用域的执行上下文环境中取值——是“定义”，而不是“调用”，切记切记。`

`js中变量的作用域链与定义时的环境有关，与执行时无关。执行环境只会改变this、传递的参数、全局变量等。`

作用域有上下级的关系，上下级关系的确定就看函数是在哪个作用域下创建的。

作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。

``` js
这个例子证明了自由变量的值要到定义这个函数的那个作用域中取。
var a = 10; 
function fn(){
  console.log(a)
}
function bar(f){
  var a = 20;
  f();
}
bar(fn)  // 10

但假如像下面所示的a就不是自由变量了：

var a = 10;
function fn(){
  var a = 30   // 在fn创建的块级作用域里定义了a = 30
  console.log(a)
}
function bar(f){
  var a = 20;
  f();
}
bar(fn)  // 30
```

### 作用域与执行上下文环境的关系

![作用域与执行上下文环境的关系](scope.png)

作用域只是一个“地盘”，一个抽象的概念，其中没有变量。`要通过作用域对应的执行上下文环境来获取变量的值。`同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。`所以，作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。`

所以，如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。

> info

> 个人总结：作用域只是一个地盘，一个区域，在函数定义的时候就已经创建。而执行上下文环境是真正存值的地方，是在函数被调用的时候才创建的。每个作用域对应的都会有一个执行上下文环境。

> 且由于执行上下文环境的在函数被调用的时候才创建的原因，不同的函数调用会生成不同的执行上下文环境。因为变量的值在函数调用之后才赋值（当然是在准备阶段对函数参数、arguments、自由变量赋值）。

[作用域与执行上下文环境的关系](http://www.cnblogs.com/wangfupeng1988/p/4000798.html)

### this

this仅仅是javascript的一个关键字。其特殊点在于它自动定义于每一个函数的作用域中。

在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。

_全局 & 调用普通函数_

在全局环境下，this永远都是指向window。

_构造函数_

所谓构造函数就是用来new对象的函数。函数名首字母规定要大写，如Object，Function，Array等。

``` js
function Animal(species){
  this.species = species;
}

const cat = new Animal("Cat");  // this指向cat
cat.species  // Cat

注意，以上仅限new Animal()的情况，即Animal函数作为构造函数的情况。如果直接调用Animal函数，而不是new Animal()，情况就大不一样了。

function Animal(species){
  this.species = species;
  console.log(this)
}
Animal("Cat")  // window 在全局调用函数，this指向window
```

_函数作为对象的一个属性_

``` js
const cat = {
  miao: function(){
    console.log(this)
  }
}
cat.miao()  // cat，this指向该对象

如果fn函数不作为obj的一个属性被调用，会是什么结果呢？

const fn = cat.miao;
fn();  // window 相当于全局调用该函数，所以this指向window
```

_call & apply_

使用call或者apply来绑定this，则函数内的this指向apply的第一个参数（这个参数是一个对象）。

``` js
function aoxis(){
  console.log(this.x, this.y)
}
aoxis.apply({x: 11, y: 22})  // 11 22
```

### apply

apply的一个巧妙的用处,可以将一个数组默认的转换为一个参数列表([param1,param2,param3] 转换为 param1,param2,param3)，借助apply的这点特性,所以就有了以下高效率的方法:  

``` js
function aoxis(...arr){
  console.log(arr)
}
aoxis.apply(null,[1,2,3])  // [1,2,3]

因为Math.max的参数不支持数组形式，但是支持param1,param2,param3形式，所以可以通过apply的这个特性来实现Math.max得出数组中的最大值。
const arr = [2,27,34,8,2,9,63,64,324];
console.log(Math.max.apply(null,arr)) // 324
```

### 闭包

闭包有两种使用方式：

1. 函数作为返回值

``` js
function father(){
  const variable = "xinxin";
  
  return function son(){
    cosole.log(variable)
  }
}

const fn = father();
fn() // xinxin
```

2. 函数作为参数被传递

``` js
function father(){
  const variable = "xinxin";
  
  return function son(){
    console.log(variable);
  }
}

const fn = father();

function current(f){
  const variable = "chenkang";
  f()
}

current(fn); // xinxin 
```
`正常函数在被调用时创建的执行上下文环境在函数被调用完成之后会被销毁，而闭包不同，闭包函数的执行上下文环境并没有被销毁，而是保存在内存中。`

因为闭包返回的是一个函数，函数里用到了外层函数提供的自由变量，而返回的函数并不能具体确定在哪一个时刻开始调用，所以就要求外层函数提供的自由变量不能消失，所以在js中，闭包外层函数提供的自由变量的执行上下文环境还会保存在内存中，只不过处于非活跃状态（有且只有一个执行上下文环境会处于活跃状态，即当前函数被调用的时候。），等到闭包返回的函数被调用的时候，就会将闭包外层函数的执行上下文环境激活，然后取得里面保存的值。

从上面两个例子可以看出，variable变量的取值都是从闭包内部获取的。所以闭包的功能之一就是可以封装私有变量和私有方法。

缺点是会增加内存开销，如果过度使用闭包，会造成内存泄露。

### 异步

JS是单线程的语言，所谓“单线程”就是一根筋，对于拿到的程序，一行一行的执行，上面的执行未完成，就傻傻的等着。

`回调函数：`传递过去不执行，等出来结果之后再执行的函数，叫做callback

`实现异步的最核心原理，就是将callback作为参数传递给异步执行函数，当有结果返回之后再触发 callback执行。`

`虽然 JS 是异步执行的语言，但是人的思维是同步的`————因此，开发者总是在寻求如何使用逻辑上看似同步的代码来完成 JS 的异步请求。异步发展过程callback => promise => generator => async & await就是开发者在寻求如何使用逻辑上看似同步的代码来完成 JS 的异步请求的过程。

export const ContextMeta = {
  anchors: [
    '准备阶段',
    '执行上下文环境',
    '作用域',
    '作用域与执行上下文环境的关系',
    'this',
    'apply',
    '闭包',
    '异步',
  ]
}
