/**
 * Created by xutao on 16/5/28.
 */

var superClass1 = function(){
  this.books = ['aa','bb']
  this.name  = Math.random()
  this.init = function(){
    console.log('superClass1 init')
  }
}
superClass1.prototype.getBooks = function () {
  console.log('superClass1 prototype getBooks')
};

var subClass = function(x){
  this.age = x;
}
subClass.prototype = new superClass1();

var subClass1 = function (age) {
  this.age = age
  
  superClass1.call(this,arguments)
}
// subClass1.prototype = new superClass1()

var aa = new subClass1('21')
var ab = new subClass1('22')
var cc = new subClass('23')
aa.books.push("cc");
console.log(aa.name)  //{}
console.log(ab.name)
console.log(cc.name)
console.log(aa.__proto__.name === aa.name) // false
console.log(cc.__proto__.name === cc.name) // true
console.log(aa.__proto__.books) // true
console.log(aa.books) // true

aa.init()
ab.init()
cc.init()


cc.getBooks()
ab.getBooks()  // 报错,在将subClass1.prototype = new superClass1()注释掉后.
aa.getBooks()  // 报错,在将subClass1.prototype = new superClass1()注释掉后.
// 所以可以发现,在构造函数里面使用superClass1.call(this,arguments),等效于下面的代码.
/**
 var subClass1 = function (age) {
  this.age = age
  this.books = ['aa','bb']
  this.name  = Math.random()
  this.init = function(){
    console.log('superClass1 init')
  }
}
 */