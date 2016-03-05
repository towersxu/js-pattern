/**
 * Created by izwel on 16/3/5.
 * 模拟构造函数创建对象过程.
 */
function Person( name ){
  this.name = name;
}

var objectFactory = function() {
  console.log(arguments);
  var obj = new Object(),
    /**
     * 等效于Constructor = arguments.shift();
     * 但是由于arguments是类数组对象,没有shift方法,所以采用call方法调用.
     */
    Constructor = [].shift.call( arguments );
  console.log(arguments);
  console.log(Constructor)
  obj.__proto__ = Constructor.prototype;
  /**
   * obj表示Person中的this,普通函数中的this是指向其调用者.
   * 所以,下面这段表示obj.name = argument[0];
   */
  var ret = Constructor.apply(obj,arguments);

  return typeof ret === 'object' ? ret :obj;
};
var a = objectFactory(Person,'taox',21);
console.log(a.name);   //taox