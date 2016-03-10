/**
 * Created by taox on 16-3-10.
 */
var Singleton = function(name){
  this.name = name;
  this.instance = null;
};
Singleton.getSingleton = function(name){
  if(!this.instance){
    this.instance = new Singleton(name);
  }
  return this.instance;
};

/***************************/
var Singleton2 = function (name) {
  this.name = name;
};
Singleton2.prototype.getName = function () {
  return this.name;
};
Singleton2.getSingleton=(function(){
  var instance= null;
  return function(name){
    if(!instance){
      instance = new Singleton2(name);
    }
    return instance;
  }
})();

var p1 = Singleton2.getSingleton('t');
console.log(p1);

/***************透明单例*****************/
var Singleton3 = (function(){
  var instance = null;
  return function(name){
    if(!instance){
      instance={
        name:name
      }
    }
    return instance;
  };
})();
var p2 = new Singleton3('taox');
var p3 = new Singleton3('taox2');
console.log(p2===p3);
/****************代理单例***********************/
var CreateDiv = function(html){
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  var div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

var ProxySingleton = (function(){
  var instance;
  return function(html){
    if(!instance){
      instance = new CreateDiv(html);
    }
    return instance;
  }
});

/***************通用惰性单例*******************/
var getSingle = (function(){
  var instance;
  return function(fn){
    return instance || (instance=fn.apply(this,arguments));
  }
})();

console.log(typeof bindEvent);
var render = function(){
  console.log('渲染');
  var bindEvent = getSingle(function(){
    console.log('bindEvent');
    document.getElementById('id').onclick = function(){
      console.log('click');
    };
    return true;
  });
  console.log(bindEvent);
};
render();
render();
render();