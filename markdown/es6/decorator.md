### core-decorator.js
core-decorators.js是一个第三方模块，提供了几个常见的修饰器，通过它可以更好地理解修饰器。`如果想深入了解decorator可以去看看这个库的源码`。

### desciptor描述对象
 
非函数属性properties的descriptor对象具有configurable、enumerable、writable、`initializer`四个属性。 
 
函数属性getter、setter、function的descriptor对象具有configurable、enumerable、writable、`value`四个属性。 
 
`函数属性的descriptor对象的value属性就是函数本身。` 
 
Object.getOwnPropertyDescriptor(obj,propsname)可以获取到对象的某个propsname的descriptor对象。（但是要注意此方法只能获取对象） 
 
``` js 
const obj = { 
  name: 'xinxin', 
  say(){ 
    console.log('say') 
  } 
} 
 
console.log(Object.getOwnPropertyDescriptor(obj,'say')) //可以获取obj对象的say属性的descriptor对象 
``` 
 
Object.getOwnPropertyDescriptor`s`(obj),返回指定对象(包括类class)所有自身属性（非继承属性,也即hasOwnProperties()为true的属性）的描述对象。 
 
``` js 
class A { 
    static ff (){ 
        console.log('ff') 
    } 
    say(){ 
        console.log('say') 
    } 
} 
 
const des = Object.getOwnPropertyDescriptors(A,'say') 
 
console.log(des)  
```

### 类的修饰
`如果把一个decorator 作用到类上，则它的第一个参数 target 是 类本身。`
 +'如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。 
 
`注意，修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，修饰器本质就是编译时执行的函数。` 
 
``` js  
function setName(name){ 
    return (ComponentClass) => { 
        class Injector extends React.Component { 
            render(){ 
                return ( 
                    <ComponentClass  
                        name = {name} 
                    /> 
                ) 
            } 
        } 
        return Injector; 
    } 
} 
 
@setName('xinxin') 
 
class Comment extends React.Component { 
    render(){ 
        const { name } = this.props; 
        return ( 
            <div> 
                {name} 
            </div>  
        ) 
    } 
} 
```

### 类的属性方法的修饰
`如果把一个decorator 作用到类的属性方法上，则它的第一个参数 target 是类的prototype，第二个参数是属性的key，第三个参数是属性的描述对象descriptor。这三个参数其实是和 Object.defineProperty 参数一致的，因此不能更改。` +
 
bable 转换后的代码，其中有一句是 descriptor = decorator(target, key, descriptor) || descriptor; `也就是说类的属性方法的装饰器函数返回的值就是作为属性方法的描述对象descriptor。` 
 
非函数型属性和函数型属性的区别如下： 
``` js 
// target 属性所属的类的原型对象prototype 
// name   所修饰属性的名字 
// descriptor 所修饰属性的描述对象 
 
function log(target,name,descriptor){ 
  console.log('descriptor', descriptor); 
  return descriptor; 
} 
 
class A { 
  @log 
  name = 'xinxin';  // initializer 
 
  @log  // initializer 
  dog = { 
    name: 'peppy', 
    color: 'yellow' 
  }; 
 
  @log // value 
  get n(){ 
    return this.name; 
  } 
 
  @log // value 
  set n(name){ 
    this.name = name; 
  } 
 
  @log // value 
  say(x,y){ 
    return x + y; 
  } 
} 
``` 
 
下面的@log修饰器，可以起到输出日志的作用。 
 
``` js 
class Math { 
  @log 
  add(a, b) { 
    return a + b; 
  } 
} 
 
function log(target, name, descriptor) { 
  var oldValue = descriptor.value;  // 将被修饰方法的原方法存储到oldValue中 
  // descriptor.value就是被修饰方法，所以...args的args === 此方法被调用时的入参。 
  // 修改被修饰方法，在原方法的基础上添加操作，这里添加了打印的操作 
  descriptor.value = function(...args) {   
    console.log(`Calling ${name} with`, args); 
    return oldValue.apply(null, args); // 调取原方法 
  }; 
 
  return descriptor; 
} 
 
const math = new Math(); 
 
// passed parameters should get logged now 
math.add(2, 4); 
``` 
`如果同一个方法有多个修饰器，会像剥洋葱一样，先从外到内进入，然后由内向外执行。` 
``` js 
function dec(id){ 
  console.log('evaluated', id); 
  return (target, property, descriptor) => console.log('executed', id); 
} 
 
class Example { 
    @dec(1) 
    @dec(2) 
    method(){} 
} 
// evaluated 1 
// evaluated 2 
// executed 2 
// executed 1 
``` 
上面代码中，外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行。


export const DecoratorMeta = {
  anchors: [
    'core-decorator.js',
    'desciptor描述对象',
    '类的修饰',
    '类的属性方法的修饰',
  ]
}
