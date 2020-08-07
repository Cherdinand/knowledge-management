### 解构

`解构分为对象解构和数组解构。`

`通过以下两个例子可以看出当我们将解构赋值表达式链接在一起的时候，其实是将这个对象/数组作为完成值传递下去。`

``` js
var o = [1,2,3];
var a, b, c, p;

p = [ a, b, c ] = o;

console.log( a, b, c );			// 1 2 3
p === o;						// true  由此可以看出p为o的引用
```

``` js
var o = { a:1, b:2, c:3 };
var p = [4,5,6];
var a, b, c, x, y, z;

( {a} = {b,c} = o );  // 此处要用圆括号包住是因为如果没有圆括号的话，js引擎会认为 { 是块级作用域的开始而不是对象
[x,y] = [z] = p;

console.log( a, b, c );			// 1 2 3
console.log( x, y, z );			// 4 5 4
```





export const GrammarMeta = {
  anchors: [
    '解构',
  ]
}
