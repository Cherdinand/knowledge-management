### 基本概念

一般情况下，一个函数一旦开始运行，其中的语句将会一句一句执行，不会被打断。

`而在ES6中Generator的出现，让我们可以在函数的运行过程中随时暂停执行，还可以立即或者稍后（做了什么其他事情之后）继续执行。`

`generator函数是由迭代器iterator控制的，通过调用next函数使暂停的generator函数继续执行。`

### yield和yield委托

yield是Generator函数中的一个关键字，表示暂停。

yield * 称为yield委托。如同它的名字所表达的，它可以将宿主generator函数的控制权委托给另一个generator函数。`但是并不会造成暂停。`

`在yield ..中表达式的完成值来自于使用it.next(..)继续generator，而yield *..表达式的完成值来自于受到委托的迭代器的返回值（如果有的话）。`

``` js
function *foo() {
	console.log('first')

	var s = yield 1;  // yield的完成值等于调用next函数的参数，此处 s = 2

	console.log('second', s)

	return 'res';
}

function *bar(){
	var result = yield *foo();  // 将bar函数的控制权委托给了foo函数，且yield委托的完成值等于foo函数的返回值res。

	console.log('second',result)  // 特别要注意的是yield委托本身并不造成一次暂停。这里是第二次调用next就执行了

	yield 'final';

	console.log('third')
}

var bb = bar();
bb.next();   // {value: 1, done: false}
bb.next(2);  // second 2  // second res // {value: 'final', done: false}
bb.next();   // third  // {value: undefined, done: true}
```

### 提前完成

在学迭代器iterator的时候，我们知道一个迭代器iterator除了next函数之外，还有return函数。

`而return函数的调用暗示着迭代器的完全停止。由于generator函数在执行之后本质上也是个迭代器。所以return函数也可以控制着generator函数的提前完成。`

`return函数会在触发try...finally...的finally子句之后，然后中止generator函数。如下例所示：`

``` js
function *gen(){
    try{
        yield 1; 
        yield 2; 
        yield 3; 
    }finally{
        console.log('complete!')
    }
}

const it = gen();
it.next()  // {value: 1, done: false}
it.return(22)  // complete!  // {value: 22, done: true}
it.next() // {value: undefined, done: true}
```

### 提前中止

在学迭代器iterator的时候，我们知道一个迭代器iterator除了next函数之外，还有throw函数。

`throw函数的调用暗示着迭代器的暂时停止。由于generator函数在执行之后本质上也是个迭代器。所以throw函数也可以控制着generator函数的提前中止。`

`如果在generator函数中没有使用try...catch...语句，那么throw函数将会产生一个error从而中止函数。但是如果使用了try...catch...语句，throw函数会在触发try...catch...的catch子句之后，然后继续执行generator函数，就像next函数一样。如下例所示：`

``` js
function *gen(){
    try{
        yield 1; 
    }catch(e){
        console.log('err', e)
    }

    yield 2; 

}·

const it = gen();
it.next()  // {value: 1, done: false}
it.throw('hey')  // err hey  // {value: 2, done: false}  // 可以看到throw在有catch语句的时候并不会中止generator函数，反而效果如同next函数一般，只是会去到特定的catch子句里执行特定的代码。
it.next() // {value: undefined, done: true}
```

### Generator的用法

1、 生产一系列值。由于generator本质上是由遍历器iterator控制的，所以iterator能做的事，generator也可以做到。例如以下由斐波那契（Fibonacci）数列的形式产生无限多的数字序列：

``` js
function *foo(a, b){
    var current = a;
    var a = b;
    var b = current + b;

    yield current;

    yield *foo(a, b);    // 递归调用自己
}

var it = foo(1,1);  // 执行generator函数之后的返回值就是一个迭代器，所以可以用for...of...遍历

for(let i of it){
    console.log(i)  //  1 1 2 3 5 8 13 21 34 55

    if(i > 50){
        break;  // 打断这个循环，否则能一直遍历下去
    }
}
```

但是上面这种用法没有发挥到generator的真正作用，因为我们用iterator能够更方便的完成遍历。而generator函数最大的作用就是可以中断函数的执行。

2、 同步执行的任务队列。

`这种用法经常用来表达一个算法中步骤的流程控制，其中每一步都要求从某些外部数据源取得数据。对每块儿数据的请求可能会立即满足，或者可能会异步延迟地满足。`

上面那句也就是说，以前我们的异步代码如发送请求可能是使用回调函数等机制去完成，请求数据的代码和获取到请求结果后执行的代码通常分开在不同的地方。`而使用了generator函数之后，我们可以做到将请求数据的代码和获取到请求结果的代码以同步的形式从上往下执行。`

``` js
function *foo(){
    var data = yield request('api/getData');
    console.log('getData返回的数据'， data)  // 可以看到我们现在是以同步的方式完成的
    var number = yield request('api/getNumber');
    console.log('getNumber返回的数据', number)
}
```


export const GeneratorMeta = {
  anchors: [
    '基本概念',
    'yield和yield委托',
    '提前完成',
    '提前中止',
    'Generator的用法',
  ]
}
