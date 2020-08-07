### 基本规则

在我们的代码中存在着类型强制转换。`根据类型可以分为明确强制转换和隐含强制转换。`

ES5 语言规范的第九部分用值的变形规则定义了几种“抽象操作”用于类型转换。我们将特别关注于：ToString、ToNumber、和 ToBoolean，并稍稍关注一下 ToPrimitive。

`这几种抽象操作可以被明确的调用（String、Number、Boolean），也可以被隐含的调用（在某种类型的上下文环境中被转换到该类型）。`

``` js
// 隐含强制转换

var a = 42;

var b = a + "";
```

``` js
// 明确强制转换

var a = 42;

var b = String(a);
```

### falsy值

`falsy值包含 null、 undefined、 ""、 +0 、 -0、 NAN、 false。`

`所有不在falsy值列表中的值都将成为truthy值。`

### 按位取反操作符

波浪线 ~ 是按位取反操作符。

`~x === -( x + 1)`。通过进行这个操作，能够产生结果0（或者从技术上说-0）的唯一的值是什么？ `-1。` 换句话说，~用于一个范围的number值时，将会为输入值-1产生一个falsy（很容易强制转换为false）的0，而为任意其他的输入产生truthy的number。

而值 -1 在JS中称为一个哨兵值。JS中的很多函数返回 >= 0 的值表示“成功”，返回 -1 表示“失败”。这时候 ~ 就可以派上用场，简化我们的判断表达式。

``` js
if(a.indexOf(x) >= 0){
    ...
}

if(~a.indexOf(x)){  // 只有返回值是 -1 的时候，表达式返回值为falsy。
    ...
}
```

### ToNumber

``` js
+null  // 0  注意null转换为number的时候转换为0
+undefined  // NaN
+{}   // NaN
+""   // 0
+[]   // 0   1、 调用[].valueOf() ==> +[]  2、调用[].toString() ==> +""  3、调用Number("")  ==> 0 
```

### ||和&&操作符
    
`||（“逻辑或”）和&&（“逻辑与”）操作符实际上并不如我们想象的那般返回一个boolean值。而是返回其中一个操作数的值。`

``` js
a || b

a && b
```

`逻辑与（&&）运算符将会返回第一个false/‘falsy’的值。当所有的操作数都是true时，将返回最后一个表达式的结果。`

`逻辑或（||）运算符将返回第一个true/‘truthy’的值。当所有的操作数都是false时，将返回最后一个表达式的结果。`

对于逻辑或 || 来说， 首先会对a进行toBoolean转换为布尔值，如果为true，则返回第一个操作数即a的原始值（注意不是toBoolean之后的布尔值）；如果为false，则返回第二个操作数即b的原始值。

对于逻辑与 && 来说， 首先会对a进行toBoolean转换为布尔值，如果为true，则返回第二个操作数即b的原始值（注意不是toBoolean之后的布尔值）；如果为false，则返回第一个操作数即a的原始值。

`这才是逻辑或与逻辑非的运算逻辑，注意其实际上从不返回boolean值。`

而在我们的使用中会觉得它返回了布尔值的原因是我们通常如下使用逻辑与，当我们对 a && b运算完之后，会得到a或者b的原始值。然后注意，是因为这里逻辑与被if(){}包含了，而这里的if会隐含的强制一个boolean转换，于是对刚才返回的原始值进行了toBoolean操作。

``` js
if( a && b) {  ... } 
```

### 宽松等价与严格等价

在许多书籍资料中都告诉我们宽松等价（==）与严格等价（===）的区别是类型是否相同。而实际上这样的说法是错误的。

实际上应该描述为： `==允许在等价性比较中进行强制转换，而===不允许强制转换。`
          
也就是说，如果我们进行宽松等价，是会发生值的强制转换的，这也是宽松等价容易出现一些奇怪问题的原因。

在宽松等价中，有一些例外需要注意： 

``` js
NAN == NAN  // false  NaN永远不等于它自己
+0 == -0  // true  +0和-0是相等的
{} == {}  // false  对象仅在它们的引用指向同一个值时相等。这里没有强制转换发生。
```

`而对于其他类型的值， string、 number、 null、 undefined。它们两者或其中之一将需要被隐含地强制转换。由于这个强制转换，两个值最终归于同一类型，可以使用简单的值的等价性来直接比较它们相等与否。`

_string与number_

`当一个宽松等价两边一个是string、另一个是number的时候，会将string值进行toNumber操作转换为number，最终进行两个number值的比较。`

_任何东西与boolean_

`如果有任一非boolean值与boolean值进行宽松等价，则会将boolean值进行toNumber操作转化为number值。`注意看这个解释，这里很容易误解。

``` js
'44' == true  // false

第一眼我们会觉得 '44' 是一个truthy值，那不就应该是相等的吗？
但实际上根据上面的规则，我们首先是将true转换为number类型的 1 ， 然后将 '44' 转换为number类型的 44 ，最后进行 44 == 1的值的比较，那很明显为false。 
```

_null与undefined_

`null与undefined是宽松等价的。`

``` js
null == undefined  // true
```

因为这个特性，我们可以有以下这么一个逻辑表达式： 

``` js
if(a != null){ ... }  // 这样就可以同时排除掉 undefined 和 null的情况，但是不排除 a 为 0 的情况，这种情况在实际代码中很常见。 
```

_object与非object_

`当进行object与非object的宽松等价时，会先将object进行toPrimitive操作。`

### toPrimitive

`当使用ES6给对象设置了Symbol.toPrimitive属性时，在对象的强制转换时优先调用Symbol.toPrimitive函数，而不考虑valueOf和toString。`

``` js
// Symbol.toPrimitive 中的参数hint有三个值"number"、"string" 和 "default"
// 对象到字符串的转换，当我们对期望一个字符串的对象执行操作时hint === 'string' 
// 对象到数字的转换，当我们进行数学运算时hint === 'number' 
// 当运算符“不确定”期望值的类型时hint === 'default'
 
var obj = {
    [Symbol.toPrimitive]: function(hint){
        if(hint === 'number'){
            return 1;
        } else if (hint === 'string') {
            return 'string';    
        } else if (hint === 'default') {
            return true;    
        }
    }
}
```

_valueOf与toString_

`在数值运算里，会优先调用valueOf()，在字符串运算里，会优先调用toString()。`

`在有运算操作符的情况下，valueOf的优先级高于toString。`

需要注意的是，这两个方法在不同使用场景会有不同的优先级：

正常情况下，优先调用toString

有运算操作符的情况下valueOf的优先级高于toString

`当调用valueOf方法无法运算后还是会再调用toString方法`

``` js
let e2 = {
    n : 2,
    toString : function (){
        console.log('this is toString')
        return this.n
    },
    valueOf : function(){
        console.log('this is valueOf')
        return this.n*2
    }
}
alert(e2) //  2  this is toString
alert(+e2)  // 4 this is valueOf
alert(''+e2) // 4 this is valueOf   在有运算操作符的情况下，valueOf的优先级高于toString。
alert(String(e2)) // 2 this is toString
alert(Number(e2)) // 4 this is valueOf
alert(e2 == '4') // true  this is valueOf
alert(e2 === 4) //false ===操作符不进行隐式转换
```

### falsy值的比较

在宽松等价中，最坑的就是falsy值的比较，其中有一些并不能用以上的规则来解释。以下是24个falsy值的比较。

``` js
"0" == null;			// false
"0" == undefined;		// false
"0" == false;			// true 
"0" == NaN;				// false
"0" == 0;				// true
"0" == "";				// false

false == null;			// false
false == undefined;		// false
false == NaN;			// false
false == 0;				// true 
false == "";			// true -- 噢！
false == [];			// true -- 噢！
false == {};			// false

"" == null;				// false
"" == undefined;		// false
"" == NaN;				// false
"" == 0;				// true -- 噢！
"" == [];				// true -- 噢！
"" == {};				// false

0 == null;				// false
0 == undefined;			// false
0 == NaN;				// false
0 == [];				// true -- 噢！
0 == {};				// false
```

其中有五个的比较是让人出乎意料的：

``` js
false == "";			// true -- 噢！
false == [];			// true -- 噢！
"" == 0;				// true -- 噢！
"" == [];				// true -- 噢！
0 == [];				// true -- 噢！
```

### 宽松等价可行性

1. 如果比较的任意一边可能出现true或者false值，那么就永远，永远不要使用==。当然在实际代码中永远不会出现这种情况。
1. 如果比较的任意一边可能出现[]，""，或0这些值，那么认真地考虑不使用==。

### 一个大坑

``` js
[] + {} // "[object Object]"
{} + [] // 0 

在第一行中，`{}`出现在`+`操作符的表达式中，因此被翻译为一个实际的值（一个空`object`）。`[]`被强制转换为`""`因此`{}`也会被强制转换为一个`string`：`"[object Object]"`。

但在第二行中，`{}`被翻译为一个独立的`{}`空代码块儿（它什么也不做）。块儿不需要分号来终结它们，所以这里缺少分号不是一个问题。最终，`+ []`是一个将`[]`*明确强制转换* 为`number`的表达式，而它的值是`0`。
```

export const TypeTransferMeta = {
  anchors: [
    '基本规则',
    'falsy值',
    '按位取反操作符',
    'ToNumber',
    '||和&&操作符',
    '宽松等价与严格等价',
    'toPrimitive',
    'falsy值的比较',
    '宽松等价可行性',
    '一个大坑',
  ]
}
