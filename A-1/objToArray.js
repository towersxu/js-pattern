/**
 * Created by izwel on 16/3/5.
 */
var obj = {};
Array.prototype.push.apply(obj,[1,2,3,4]);
console.log(obj instanceof Array);
console.log(obj.length);