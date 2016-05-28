/**
 * Created by jhy on 16/5/27.
 */
var strategies = {
  isNoEmpty:function (value,ErrorMsg) {
    if(value===''){
      return ErrorMsg
    }
  },
  minLength:function (value,length,ErrorMsg) {
    if(value.length <length){
      return ErrorMsg
    }
  },
  isMobile: function( value, errorMsg ){
    if ( !/(^1[0-9]{10}$)/.test( value ) ){
      return errorMsg;
    }
  }
};


var Validator = function(){
  this.cache = [];
};

Validator.prototype.add = function( dom, rules ){
  var self = this;
  for ( var i = 0, rule; rule = rules[ i++ ]; ){
    (function(rule){
      var strategyAry = rule.strategy.split( ':' );
      var errorMsg = rule.errorMsg;
      self.cache.push(function(){
        var strategy = strategyAry.shift();
        strategyAry.unshift( dom.value );
        strategyAry.push( errorMsg );
        return strategies[ strategy ].apply( dom, strategyAry );
      })
    })(rule)
  }
}

Validator.prototype.start = function(){
  for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i++ ]; ){
    var errorMsg = validatorFunc();
    if ( errorMsg ){
      return errorMsg;
    }
  }
}
