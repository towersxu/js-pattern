/**
 * Created by xutao on 16/5/27.
 */
function CreateDiv(name){
  this.name = name;
  this.init = function () {
    var div = document.createElement('div')
    div.textContent = this.name;
    document.body.appendChild(div)
  }
}

var proxyCreateSingleDiv = (function(){
  var instance;
  return function(name){
    if(!instance){
      instance = new CreateDiv(name)
    }
    return instance
  }
})()

var d2 = new proxyCreateSingleDiv('xxx');
d2.init()

var d3 = new proxyCreateSingleDiv('xxxaaaa');
d3.init()
