#JavaScript核心理解与设计模式实践

##原型
- Object.create就是原型模式的天然实现.
- 注意:通过设置构造器的prototype来实现原型继承的时候,除了根对象Object.prototype本身以外,任何对象都会有一个原型.而通过Object.create(null)可以创建出没有原型的对象.

##this
- this一般可以分为4中

```javascript
  var getId = document.getElementById;
  getId('id')          //无法获取,因为getElementById函数内部实现时,this需要指向document.

  //一般修改为下面这种方式.
  var getId = function(id){
    return document.getElementById(id);
  }
```
##call和apply
- call和apply常用于修正this指向被不经意改变的场景.
```JavaScript
  document.getElementById('div1').onclick = function(){
    console.log(this.id)   //div1
    var func = function(){
      console.log(this.id)
    }
    func();                 //undefined
    func.call(this)                 //div1

  }
```
##bind
- 大部分高级浏览器都实现了内置`Function.prototype.bind`用来指定函数内部的this指向.

```javascript
Function.prototype.bind = function(){
  var self = this,//原函数
    context = [].shift.apply(arguments),  //obj
    arg = [].slice.apply(arguments);
  return function(){
    self.apply(context,[].concat.apply(arg,[].slice.call(arguments)));
  }
};

var obj = {
  name:'taox'
};
var f = function(a,b,c,d){
  console.log([this.name,a,b,c,d])
}.bind(obj,1,2);

f(3,4);

```

- 使用apply借用其他对象的方法
- 借用构造函数实现类似继承效果
```javascript
  var A = function(name){
    this.name = name
  }
  var B = function(){
    A.apply(this,arguments);
  }
  B.prototype.getName = function(){
    return this.name;
  }
```
- 在操作arguments对象的时候,会频繁的想Array.prototype借用方法,比如像arguments中增加一个参数
```javascript
  var A = function a(){
    Array.push.call(arguments,3);
  }
```

- 可以把本身拥有可以存取属性和length属性可读写的对象传入Array.prototype.push中转换为类数组.
```javascript
var obj = {};
Array.prototype.push.apply(obj,[1,2,3,4]);
console.log(obj instanceof Array);     //false
console.log(obj.length);               //4
```
