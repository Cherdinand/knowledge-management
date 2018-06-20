import React, {Component} from 'react';
import Alert from 'common/components/Alert';

export default class Prototype extends Component {
  componentWillMount(){
    this.originJavascript()
    
    console.log('_________________________  分割线  ____________________________')
    
    this.es6();
  }
  
  originJavascript = () => {
    function Animal(species){
      this.species = species;
    }
  
    Animal.prototype.eat = function(){
      console.log("eat")
    }
  
    function Cat(name){
      Animal.call(this,"Cat");
      this.name = name;
    }
  
    Cat.prototype = new Animal();
  
    Cat.prototype.constructor = Cat;
  
    Cat.prototype.miao = function(){
      console.log("miao")
    }
  
    const buou = new Cat("buou")
  
    console.dir(Cat)
  
    console.log("originJavascript", buou);
  };
  
  es6 = () => {
    class Animal {
      constructor(species){
        this.species = species
      }
      eat(){
        console.log("eat")
      }
    }
  
    class Cat extends Animal {
      constructor(name){
        super("Cat");  // super就是调用继承源Animal的constructor
        this.name = name;
      }
    
      miao(){
        console.log("miao")
      }
    }
    
    class Dog extends Animal {
      constructor(name){
        super("Dog");  // super就是调用继承源Animal的constructor
        this.name = name;
      }
    
      wang(){
        console.log("wang")
      }
    }
  
    const buou = new Cat('buou');
    
    const erha = new Dog('erha');
  
    console.log("es6 class", buou)
    
    console.log("es6 class", erha)
  
    console.log("Cat.prototype.__proto__ === Animal.prototype", Cat.prototype.__proto__ === Animal.prototype)
  
    console.log("Cat.__proto__ === Animal", Cat.__proto__ === Animal)  // 继承
  };
  
  render() {
    return (
      <div>
        <Alert
          message="结合Container的代码打开控制台看看输出！"
          type="warning"
        />
        {
          this.props.children
        }
      </div>
    )
  }
}
