/**
 * Created by jhy on 16/5/27.
 */
var getSingle = function (fn) {
  var result;
  return function(){
    return result || (result = fn.apply(this,arguments))
  }
}

var createDiv = function(){
  var div = document.createElement('div');
  div.textContent = this.name;
  div.style.display = 'none';
  document.body.appendChild(div)
  return div;
}
var single = getSingle(createDiv)('xutao')
console.log(single)
single.style.display = 'inherit'