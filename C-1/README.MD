##单例

###透明单例
```javascript
  var Singleton = (function(){
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
```
如果构造函数有返回值,这调用构造函数时并不会返回创建的新对象,而返回返回值.

###代理单例
```javascript
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
var d3 = new proxyCreateSingleDiv('xxxaaaa');
console.log(d2 === d3) // true
```
代理单例,既可以把CreateDiv当做普通构造函数来使用,又可以通过proxyCreateSingleDiv来装饰实现单例.(组合)