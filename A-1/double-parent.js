/**
 * Created by izwel on 16/3/5.
 */

var father =  {
  firstName:'xu'
}
var mother = {
  eye:'beautiful'
}

var bornChild = function (){};
bornChild.prototype =father;

var son = new bornChild();
console.log(son.firstName);    //xu
console.log(son.eye);          //undefined
bornChild.prototype = mother;
console.log(son.firstName);    //xu
console.log(son.eye);          //undefined