### Set

类似数组的数据结构。

`Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。`

_Set结构不会添加重复的值_

由于这一个特性，且已知数组和字符串都具有Iterator接口。所以我们可以通过Set结构来完成数组和字符串的去重。

```js
const arr = [12,12,21,3,432,3,54]
console.log([...new Set(arr)])  // [12,21,3,432,54]

const str = 'aaaabbbcccddd'
console.log([...new Set(str)].join('')) // abcd
```

_Set 实例的属性和方法_

```js
Set.prototype.size：返回Set实例的成员总数。

// 四种操作方法
Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。

// 四种遍历方法
Set.prototype.keys()：返回键名的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历
Set.prototype.values()：返回键值的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历
Set.prototype.entries()：返回键值对的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历
Set.prototype.forEach()：使用回调函数遍历每个成员
```

```js
// 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

const s = new Set(['yellow','yellow','red','green'])

for(let i of s.keys()){
  console.log(i)  // 'yellow','red','green'
}

for(let i of s.values()){
  console.log(i)  // 'yellow','red','green'
}

for(let i of s.entries()){
  console.log(i)  // ['yellow','yellow'] ['red','red'] ['green','green']
}
```

### Map

类似对象的数据结构。

对象的键值对形式中，键只能有字符串充当。这给他的使用带来了很大的限制。而Map数据结构就是类似于对象的键值对的集合，但是键不限于字符串，可以是任何类型的值。

用一句话概括上面那句话就是：`Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应。`

```js
const m = new Map([
  [Symbol.for('a'), 'a'],  // 使用Symbol当做键名
  [{name: 'xinxin'}, 'xinxin']  // 使用对象当做键名
])

console.log(m.has(Symbol.for('a')))  // true
```

_Map构造函数接受数组作为参数，实际上执行的是下面的算法_

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

======================

const items = [
  ['name', '张三'],
  ['title', 'Author']
];

const map = new Map();

items.forEach(
  ([key, value]) => map.set(key, value)
);
```

_注意事项_

`只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。`

```js
// 表面是针对同一个键['a']，但实际上这是两个不同的数组实例，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
```

_Map 实例的属性和方法_

```js
Map.prototype.size：返回Map实例的成员总数。

// 四种操作方法
Map.prototype.set(key,value)：添加某个键值对。
Map.prototype.get(key)：获取到某个键的值。
Map.prototype.delete(key)：删除某个键值对，返回一个布尔值，表示删除是否成功。
Map.prototype.has(key)：返回一个布尔值，表示该键是否为Map的成员。
Map.prototype.clear()：清除所有成员，没有返回值。

// 四种遍历方法
Map.prototype.keys()：返回键名的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历。
Map.prototype.values()：返回键值的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历。
Map.prototype.entries()：返回键值对的遍历器对象，注意是对象，如果要获取到值需要对遍历器对象进行遍历。
Map.prototype.forEach()：使用回调函数遍历每个成员。
```

export const SetMapMeta = {
  anchors: [
    'Set',
    'Map',
  ]
}
