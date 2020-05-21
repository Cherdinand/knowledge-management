### 基本介绍

### 特性

_立即执行_

`Promise中的语句在Promise创建的时候就会立即被执行。`而then方法中指定的回调函数将会在所有同步任务执行完才会执行。

``` js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

_连环返回异步操作时的状态具有传递性_

``` js
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2.then(result => console.log(result))
  .catch(error => console.log(error))     // Error: fail
```
上面代码中，p1是一个 Promise，3 秒之后变为rejected。p2的状态在 1 秒之后改变，resolve方法返回的是p1。由于p2返回的是另一个 Promise，导致p2自己的状态无效了，由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。

_链式then中返回异步操作时的状态同样具有传递性_

``` js
const p1 = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("succeed"), 3000);
});

const p2 = new Promise(function(resolve, reject) {
  setTimeout(() => reject("succeed22222222"), 10000);
});

p1.then(result => {
  console.log("111", result);
  return p2;
}).then(
  result => console.log("222", result),
  result => console.log("error222", result)
);
```

上面代码中，p1第一个then中返回了一个Promise p2，则第二个then中会等待p2的状态变化为resolve或reject才决定调用哪个回调。

### Promise.finally

`finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。`

`finally方法总是会返回原来的值。`

``` js
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {}).then((r) => {console.log(r)})  // undefined

// resolve 的值是 2
Promise.resolve(2).finally(() => {}).then((r) => {console.log(r)})  // 2

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {}).catch((r) => {console.log(r)})  // undefined

// reject 的值是 3
Promise.reject(3).finally(() => {}).catch((r) => {console.log(r)})  // 3
```

export const PromiseMeta = {
  anchors: [
    '基本介绍',
    'async函数的Promise属性',
    'await命令',
    'async函数的实现原理'
  ]
}
