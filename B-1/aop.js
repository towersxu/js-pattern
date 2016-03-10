/**
 * Created by izwel on 16/3/6.
 */
Function.prototype.before = function(beforeFn){
  var self = this;
  return function(){
    beforeFn.apply(this,arguments);
    return self.apply(this,arguments);
  }
};
Function.prototype.after = function(afterFn){
  var self =this;
  return function(){
    var ret = self.apply(this,arguments);
    afterFn.apply(this,arguments);
    return ret;
  }
};
var f = function(){
  console.log(2);
};
f = f.before(function(){
  console.log(1);
}).after(function(){
  console.log(3);
});
f();