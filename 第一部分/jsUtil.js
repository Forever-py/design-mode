// 单例
var jsUtil = {
    getSingle: function (func) {
        var result;
        return function (arguments) {
            if(!result) result= func.apply(this,arguments);
            return result;
        }
    }
}