类和模块的内部，默认就是严格模式`，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

类的所有方法都定义在类的prototype属性上面，包括constructor。

类本身就指向构造函数constructor，并且类的数据类型就是函数。

``` js 
class Point { 
  // ... 
} 
 
typeof Point // "function" 
Point === Point.prototype.constructor // true 
```

类的name属性总是返回紧跟在class关键字后面的类名。

### getter & setter
在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

存值函数和取值函数是设置在属性的 Descriptor 对象上的。

### 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。 
 
`如果静态方法包含this关键字，这个this指的是类，而不是实例。` 
 
静态方法可以与非静态方法重名。 
 
`父类的静态方法，可以被子类继承。 `
 
静态方法也是可以从super对象上调用的。`个人剖析：因为super对象指向父类.prototype.constructor，而 类 === 类.prototype.constructor，所以super对象相当于父类，自然可以调用父类的静态方法` 
 
``` js 
class Foo { 
  static classMethod() { 
    return 'hello'; 
  } 
} 
 
class Bar extends Foo { 
  static classMethod() { 
    return super.classMethod() + ', too'; 
  } 
} 
 
Bar.classMethod() // "hello, too" 
```

### 静态属性与实例属性
类的实例属性可以用等式，写入类的定义之中。类的静态属性只要在上面的实例属性写法前面，加上static关键字就可以了。
``` js 
class MyClass { 
 myProp = 42; // 实例属性 
 static myProp = 42; // 静态属性 
} 
```

### 类的继承
子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。 
 
`super关键字作为方法时表示父类的构造函数（父类.prototype.constructor）`，用来新建父类的this对象。 
``` js 
class ColorPoint extends Point { 
  constructor(x, y, color) { 
    super(x, y); // 调用父类的constructor(x, y) 
    this.color = color; 
  } 
 
  toString() { 
    return this.color + ' ' + super.toString(); // 调用父类的toString() 
  } 
} 
``` 
ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。 
 
如果子类没有定义constructor方法，这个方法会被默认添加 
 
``` js 
class ColorPoint extends Point { 
} 
 
// 等同于 
class ColorPoint extends Point { 
  constructor(...args) { 
    super(...args); 
  } 
} 
``` 
 
在子类的构造函数中，只有调用super之后，才可以使用this关键字

### super作为函数时
个人理解：ES6的继承是通过在子类的constructor中调用super()创建父类的this对象，由于super() => 父类.prototype.constructor.call(子类this),所以在调用super的时候会继承父类的this对象并将其修改为子类的this对象，所以在super过后才可以使用this关键字，否则会报错。同时要注意super执行在调用 父类.prototype.constructor的时候的this也是指向子类。 
 
作为函数时，`super关键字表示父类的构造函数（父类.prototype.constructor），且super()只能用在子类的构造函数之中，用在其他地方就会报错。` 
 
super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super()在这里相当于： 
``` js 
A.prototype.constructor.call(this)。 
``` 
``` js 
class A { 
    constructor(x,y){ 
        this.z = x + y; 
        console.log(this,this.z) 
    } 
} 
 
class B extends A { 
    constructor(x,y){ 
        super(x,y) // 调用A.constructor并且绑定this为B，也就是A.prototype.constructor.call(this)。 
        console.log(this,this.z)  // super过后，this => B, this.z => 3 
    } 
} 
const P = new A(10,20); // this => A this.z => 30 
 
 // super(x,y) => A.prototype.constructor.call(B,x,y) 所以这里console一次 this => B , this.z => 3 
 // super过后再次console，此时子类中已经可以使用this关键字并且this已经指向子类，而在super的时候this.z已经等于3了，所以这里会再次console this => B this.z => 3 
const N = new B(1,2); 
```

### super作为对象时
`super作为对象时，在普通方法中，指向父类的原型对象A.prototype；在静态方法中，指向父类A。`
``` js
// 类A的三个方法都是定义在prototype上的，其中ff是静态方法，只有类本身及子类能够调用
class A {
    static ff (){
        console.log('ff')
    }
    say(){
        console.log('say')
    }
    run(){
        console.log('run')
    }
}

class B extends A {
    static fk(){
        super.ff();  // 在静态方法中，super指向父类A
    }
    love(){
        super.say(); // 在普通方法中，super指向父类的prototype => A.prototype
        super.run();
    }
}

const Z = new B();

Z.love()
B.fk()  //类本身调用静态方法
```

ES6 规定，`在普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。在静态方法中通过super调用父类的静态方法时，方法内部的this指向当前的子类。`

``` js
// 类A的三个方法都是定义在prototype上的，其中ff是静态方法，只有类本身及子类能够调用
class A {
    constructor(){
        this.name = 'xinxin';
    }
    static ff (){
        console.log(this.name)
    }
    say(){
        console.log(this.name)
    }
}

class B extends A {
    constructor(){
        super();
        this.name = 'chenkang';
    }
    static fk(){
        super.ff();  // 在静态方法中，super指向父类A
    }
    love(){
        super.say(); // 在普通方法中，super指向父类的prototype => A.prototype
    }
}

const Z = new B();

Z.love()  // chenkang super.say()虽然调用的是A.prototype.say(),但是A.prototype.say()内部的this指向子类B的实例，导致输出的是chenkang，而不是xinxin。也就是说，实际上执行的是super.say.call(this)。
B.fk()  // B 静态方法调用，ff()中的this指向子类B，子类B.name => B
```

由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。
``` js 
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```
上面代码中，super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。

### prototype & \_\_proto\_\_

1. `子类的__proto__属性，表示构造函数的继承，总是指向父类。`
1. `子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。`

``` js
class B {
    static fk(){
        super.ff(); 
    }
    love(){
        super.say();
    }
}

const Z = new B();

//官方定义：prototype用在构造函数上，__proto__用在实例对象上。
//实例的__proto__指向构造函数的prototype

console.log(Z.__proto__ === B.prototype)  //构造函数B的 .prototype 是实例Z的 .__proto__ 
```
  
### new()

1. 一个全新的对象会凭空创建（就是被构建）。
1. 这个新构建的对象会被接入原形链。
1. 这个新构建的对象被设置为函数调用的 this 绑定。
1. 除非函数返回一个它自己的其他 对象，否则这个被 new 调用的函数将 自动 返回这个新构建的对象。

``` js 
var B = new A(); 

new()步骤
var C = {};    // 创建一个空对象（为了形象我们在这把它称为C），并且将this变量引用该对象，属性和方法被加入到空对象中
C.__proto__ = A.prototype;  // 同时还继承了该构造函数的原型
A.call(C);     // 返回新创建的对象，并将实例对象指向新创建的对象
var B = C;     // 将创建的对象返回给B。
```

export const ClassMeta = {
  anchors: [
    'getter & setter',
    '静态方法',
    '静态属性与实例属性',
    '类的继承',
    'super作为函数时',
    'super作为对象时',
    'prototype & proto',
    'new()',
  ]
}
