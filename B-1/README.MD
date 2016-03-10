##闭包

###封装变量
假设页面上有5个div节点,我们通过循环给每个div绑定onclick事件
```javascript

  var nodes = document.getElementsByTagName('div');
  for (var i=0;i<nodes.length;i++){
   nodes[i].onclick = function(){
     console.log(i);
   }
  }

```
这段代码无论点击那个节点,都会弹出5.这是因为div节点的onclick是被异步触发的.
当事件被触发的时候,for循环早已经结束了,此时i的值已经是5,所以在div的onclick
事件函数顺着作用域从内到外查找变量i时,查找的值总是5.
解决方法是在闭包的帮助下,把每次循环的i值都封闭起来,当在事件函数中顺着作用域
链从内向外查找的时候,会先找到被闭包在闭包环境中的i.
```javascript
  var nodes = document.getElementsByTagName('div');
  for (var i=0;i<nodes.length;i++){
      (function (i) {
         nodes[i].onclick = function(){
             console.log(i)
         }
      })(i)
  }
```

#延续局部变量的寿命
- img对象经常进行数据上报
var report = function(src){
  var img = new Image();
  img.src = src;
}
report('http://xxx.com/reportUserInfo?name="taox"');
在一些低版本浏览器中,由于img是report函数的局部变量,当report函数的调用结束后,img局部变量随即被销毁,而此时或许还没有来得及发出HTTP请求,所以此次请求会丢失掉.
可以把img变量用闭包封装起来,便能解决请求丢失的问题.
var report = (function(src){
  var images =[];
  return function(src){
    var img =  new Image();
    images.push(img);
    img.src = src;
  }
})(src);

###闭包与内存管理
- 局部变量本来应该在函数退出的时候被解除引用,但如果局部变量被封闭在闭包形成的环境中,那么这个局部变量就能一直生存下去.使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中,因为可能在以后还需要使用这些变量,把这些变量放在闭包中和放在全局作用域,对内存方面的影响是一致的.所以没有必要因为这个原因放弃使用闭包.如果将来要回收这些变量,我们可以手动把这些变量设为null.
- 跟闭包和内存泄露有关系的地方是,使用闭包的同时比较容易形成循环引用,如果闭包的作用域链中保存着一些DOM节点,这时候就有可能造成内存泄露.
- 要解决循环引用带来的内存泄露问题,只需要把循环引用中的变量设为null即可.
- 将变量设置为null意味着切断变量与它此前引用的值之间的连接.当垃圾收集器下次运行的时候,就会删除这些值并回收它们占用的内存.