var __modules = require("bmobcloud-local");
var Response = function (done) {
    var model = {};
    model.end = function (data) {
        console.log(data);
        done && done();
    }

    return model;
}

var Request = function (param) {
    var model = {};
    model.body = param;

    return model;
}

//请根据自己的情况修改application_id和rest_key信息
var options = {
    "app_key": "69015a79796397f7701454336b84e0c4",
    "rest_key": "9b82ae3876ed4ee081d3c34224ff3a7a",
    //"master_key": "501ed5a81380df115d47c14b9a2c7094"
};

var Bmob = __modules.Bmob;
Bmob.initialize(options.app_key, options.rest_key);

//调用hello.js云端代码
var hello = require("../cloud/hello.js").hello;
hello(new Request(),new Response(),__modules);

//调用first.js云端代码（带上传参数）
var first = require("../cloud/first.js").first;
first(new Request({"name":"Bmob后端云"}),new Response(),__modules);

//调用second.js云端代码
var second = require("../cloud/second.js").second;
second(new Request(),new Response(),__modules);

//调用third.js云端代码（带上传参数）
var third = require("../cloud/third.js").third;
third(new Request({"userid":"y6qBDvXj"}),new Response(),__modules);