var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = {
    "app_key": "b94e8b49cf3524549bcd365c56c527c3",
    "rest_key": "9e69f4a8220f2e5d1e2e1cc080a3b999"
};

tool.initialize(options.app_key, options.rest_key);

describe('local', function () {

    it('hello', function (done) {
        var hello = require("../cloud/hello.js").hello;
        tool.test(hello, {}, done);
    })

    it('first', function (done) {
        var first = require("../cloud/first.js").first;
        tool.test(first, {"name": "Bmob后端云"}, done);
    })

    it('second', function (done) {
        var second = require("../cloud/second.js").second;
        tool.test(second, {}, done);
    })

    it('third', function (done) {
        var third = require("../cloud/third.js").third;
        tool.test(third, {"userid": "y6qBDvXj"}, done);
    })

})