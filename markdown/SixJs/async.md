### 基本介绍

Generator函数写法

``` js
  const gen = function* () {
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
  };
```

async函数写法

``` js 
  const asyncReadFile = async function () {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
  };
```

一比较就会发现，async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await

而async函数相比于generator函数有以下优势：

1）自带执行器。generator函数的执行必须靠执行器调用.next()才会执行，而async函数自带执行器，与普通函数的写法一模一样。

2）更广的适用性。yield命令后面只能是Thunk函数或Promise对象，而async函数的await命令后面可以是Promise对象（推荐，因为await后跟Promise对象才有block效果）和原始类型的值（数值、字符串和布尔值，`但这是等于同步操作，没有block效果`）。

3）async函数的返回值是Promise对象。`async函数内部return语句返回的值，会成为then方法回调函数的参数。`

`进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。`

### async函数的Promise属性

async函数的返回值是Promise对象。`async函数内部return语句返回的值，会成为then方法回调函数的参数。`

async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。抛出的错误对象会被catch方法回调函数接收到。

async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，`除非遇到return语句或者抛出错误。`也就是说，只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

### await命令

正常情况下，await命令后面是一个 Promise 对象。`如果不是，会被转成一个立即resolve的 Promise 对象。这也是为什么await后面是原始数值的时候表现为同步没有阻塞的原因`

只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。
``` js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。有如下两种解决方案：

可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
``` js
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {
    console.log(e)
  }
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
``` js
async function f() {
  await Promise.reject('出错了').catch(e => console.log(e));
  return await Promise.resolve('hello world');
}

f()
.then(v => console.log(v))
// 出错了
// hello world
```

从这里可以看出async函数就像是Promise.all()，而await命令就是每一个.then()。
``` js
async aa(){
  const a = Promise.resolve('111');
  const b = Promise.reject("error");
  const c = Promise.resolve('333');
  
  await a;
  await b;
  await c;
}
```
类似于
``` js
Promise.all(
  a.then(ar => {
    'do some thing between a and b '
    return b;
  }).then(b => {
    'do some thing between b and c '
    return c
  }).then(c => 'do sth')
)
.then(resolveFn, rejectFn)
```

Promise的错误处理就是如果子Promise不做错误处理就会冒泡到Promise.all上而被Promise.all的错误处理接收。

await命令后面的Promise对象，运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。

### async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

``` js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

所有的async函数都可以写成上面的第二种形式，其中的spawn函数就是自动执行器。

``` js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

export const meta = {
  anchors: [
    '基本介绍',
    'async函数的Promise属性',
    'await命令',
    'async 函数的实现原理'
  ]
}