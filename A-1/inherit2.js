/**
 * Created by xutao on 16/5/30.
 */

//组合式继承是js最常用的继承模式，但组合继承的超类型在使用过程中会被调用两次；一次是创建子类型的时候，另一次是在子类型构造函数的内部
//寄生组合继承，解决了两次调用的问题。
var superClass = function(){
  this.books = ['aa','bb']
  this.name  = Math.random()
  this.init = function(){
    console.log('superClass1 init')
  }
}
superClass.prototype.getBooks = function () {
  console.log('superClass1 prototype getBooks')
};
var subClass = function (age) {
  this.age = age
  superClass.call(this,arguments)
}

function obj(o){
  function F(){}
  F.prototype = o;
  return new F();
}

function create(parent,test){
  var f = obj(parent.prototype);//创建对象
  f.constructor = test;//增强对象
}

create(subClass,subClass)

var ins = new subClass(21)
var ins1 = new subClass(22)
console.log(ins)
ins.books.push('cc')
console.log(ins1)
console.log(ins.__proto__)  //空的对象,这样解决了inhert.js中superClass产生了一个无用的对象.
