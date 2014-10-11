var tool = require("bmobcloud-local");

//请根据自己的情况修改application_id和rest_key信息
var options = require("../AppConfig.json");

tool.initialize(options.app_key, options.rest_key);

function local() {
//调用hello.js云端代码
    var hello = require("../cloud/hello.js").hello;
    tool.test(hello);

//调用first.js云端代码（带上传参数）
    var first = require("../cloud/first.js").first;
    tool.test(first, {"name": "Bmob后端云"});

//调用second.js云端代码
    var second = require("../cloud/second.js").second;
    tool.test(second);

//调用third.js云端代码（带上传参数）
    var third = require("../cloud/third.js").third;
    tool.test(third, {"userid": "y6qBDvXj"});
}

function server() {
    var path = require("path");
//调用first.js云端代码（带上传参数）
    tool.testInServer(path.resolve(__dirname, "../cloud/first.js"), {"name": "Bmob后端云"});

//调用second.js云端代码
    tool.testInServer(path.resolve(__dirname, "../cloud/second.js"));

//调用third.js云端代码（带上传参数）
    tool.testInServer(path.resolve(__dirname, "../cloud/third.js"), {"userid": "y6qBDvXj"});
}

function relation() {
    var leagueScoreTable = require("../cloud/leagueScoreTable.js").leagueScoreTable;
    tool.test(leagueScoreTable);
}

function bug2() {
    var playerScore = require("../cloud/playerScore.js").playerScore;
    tool.test(playerScore);
}

local();
//server();
//relation();
//bug2();