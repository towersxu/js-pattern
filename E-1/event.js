/**
 * Created by xutao on 16/5/28.
 */

var Event = (function(){
  var clientList = {}
  return {
    listen:function(key,fn){
      if(!clientList[key]){
        clientList[key] = []
      }
      clientList[key].push(fn)
    },
    trigger:function(){
      var key = Array.prototype.shift.call(arguments),
        fns = clientList[key]
      if(!fns){
        return false;
      }
      for(var i=0,fn;fn=fns[i++];){
        fn.apply(this,arguments)
      }
    }
  }
})();

Event.listen('sql',function(price){
  console.log('selesOffice sql:'+price)
});
Event.listen('java',function(price){
  console.log('selesOffice java:'+price)
});

Event.trigger('sql',1000)
Event.trigger('java',10000)