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

_push pop_

```js
const arr = [111,222,333]

arr.push(555) // 4 将所给参数插入到数组的末尾并返回push之后数组的长度arr.length
arr.pop()  // 333 将数组中的最后一项移除并返回
```


_shift unshift_

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
sort(( (a,b): number )?: Function) // 可接收一个函数参数，通常会使用函数参数，因为在不添加函数参数的时候会由于其内部处理导致bug

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
slice(start: number, end?: number): Array  // start => 起始位置， end => 结束位置 返回切割后的新数组 [start, end)

[111,222,333,444].slice(1) // [222,333,444] 只传一个参数时从起始位置切到数组末尾
[111,222,333,444].slice(1, 3) // [222,333] 不包含index = 3 的项
```

_splice_

```js
splice(start: number, deleteCount?: number, ...items): Array  // 返回被删除的项组成的数组

// 删除
[1,2,3,4].splice(1) // [2,3,4] 从index=1的项开始删除
[1,2,3,4].splice(1, 2) // [2,3] 从index=1的项开始删除两项

// 插入
[1,2,3,4].splice(1, 0, "55") // [] 从index=1的项开始插入“55”
[1,2,3,4].splice(1, 0, "55", "66") // [] 从index=1的项开始插入“55”和”66“两项

// 替换
[1,2,3,4].splice(1, 1, "55") // [2] 从index=1的项开始将2替换成“55”， 替换掉也算被删除
```

_indexOf lastIndexOf_

```js
indexOf(item, start?: number): number // item：要查找的项， start: 从哪个坐标开始查找 如果数组中找不到要找的item则返回-1，否则返回其对应的坐标
lastIndexOf(item, start?: number): number

[12,23,34,56,34,23].indexOf(111) // -1 没找到
[12,23,34,56,34,23].indexOf(34) // 2  从前面开始找指定的项，并返回其坐标
[12,23,34,56,34,23].indexOf(34, 3) // 4  从坐标为3的项开始找指定的项，并返回其坐标
[12,23,34,56,34,23].lastIndexOf(34) // 4  从后面开始找指定的项，并返回其坐标
```

_every some_

```js
every(filterFunction: Function): boolean // 如果数组中的每一项都能让filterFunction返回true，则返回true
some(filterFunction: Function): boolean  // 如果数组中的某一项能让filterFunction返回true，则返回true

const arr = [1,2,3,4]

arr.every((item) => { return item < 5 })  // true
arr.some((item) => { return item < 2 })  // true
```

_filter map forEach_

```js
forEach(bianliFunction: Function)        // 对数组中的每一项使用bianliFunction，无返回值
map(bianliFunction: Function): Array     // 对数组中的每一项使用bianliFunction，并返回经过bianliFunction处理之后的值组成的数组。生成新数组，不改变原数组
filter(bianliFunction: Function): Array  // 对数组中的每一项使用bianliFunction，并返回能让bianliFunction返回true的item组成的数组。生成新数组，不改变原数组

[1,2,3].filter((item) => item < 2)  // [1]
[1,2,3].map((item) => item + 1)     // [2,3,4]
```

_reduce reduceRight_

```js
reduce(hebingFunction: Function, initailValue)       // initailValue => 想要生成的新对象的数据形态；从数组左边开始调用hebingFunction，生成新数组，不改变原数组
reduceRight(hebingFunction: Function, initailValue)  // initailValue => 想要生成的新对象的数据形态；从数组右边开始调用hebingFunction，生成新数组，不改变原数组

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




export const FunctionMeta = {
  anchors: [
    'parseInt',
    'parseFloat',
    'Array',
    'Date',
  ]
}
