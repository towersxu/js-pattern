/**
 * Created by izwel on 16/3/6.
 */
var Type = {};

for(var i=0,type;type = ['String','Object','Number','Array'][i++];){
  (function(type){
    Type['is'+type] = function(obj){
      return Object.prototype.toString.call(obj) === '[object '+type+']';
    }
  })(type)
}
//Type['isArray'] = function(obj){
//  return Object.prototype.toString.call(obj) === '[object Array]'
//}
//Type['isObject'] = function(obj){
//  return Object.prototype.toString.call(obj) === '[object Object]'
//}
//Type['isNumber'] = function(obj){
//  return Object.prototype.toString.call(obj) === '[object Number]'
//}
console.log(Type.isArray([]));