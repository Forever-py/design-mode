var tool = {
    // 继承
    inherit: function (target, origin) {
        var temp = function () { };
        temp.prototype = origin.prototype;
        target.prototype = new temp();
        target.prototype.constructor = target;
    },
    extends: function (origin) {
        var result = function () {
            // 私有属性
            origin.apply(this, arguments)
            return this;
        };
        // 原型
        this.inherit(result, origin);
        return result;
    },
    single: function (origin) { // 单例
        var singleResult = (function () {
            var instance;
            return function () {
                if (!instance) {
                    origin && origin.apply(this, arguments);
                    instance = this;
                }
                return instance;
            };
        })();
        origin && this.inherit(singleResult, origin);
        return singleResult;
    }
}
