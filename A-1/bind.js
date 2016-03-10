/**
 * Created by izwel on 16/3/5.
 */
Function.prototype.bind = function(){
  var self = this,//原函数
    context = [].shift.apply(arguments),  //obj
    arg = [].slice.apply(arguments);          //1,2
  return function(){
    self.apply(context,[].concat.apply(arg,[].slice.call(arguments))); //arguments 3,4
  }
};

var obj = {
  name:'taox'
};
var f = function(a,b,c,d){
  console.log([this.name,a,b,c,d])
}.bind(obj,1,2);

f(3,4);