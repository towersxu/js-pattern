/**
 * Created by izwel on 16/3/5.
 */
//console.log(global);
var ages = 11;
function A(){
  console.log(this.ages);
}
var b = new A();    //undefined
A();                //browser:11;node:undefined