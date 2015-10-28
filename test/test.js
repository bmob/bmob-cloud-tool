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

//local();

function server() {
    var path = require("path");
//调用first.js云端代码（带上传参数）
    tool.testInServer(path.resolve(__dirname, "../cloud/first.js"), {"name": "Bmob后端云"});

//调用second.js云端代码
    tool.testInServer(path.resolve(__dirname, "../cloud/second.js"));

//调用third.js云端代码（带上传参数）
    tool.testInServer(path.resolve(__dirname, "../cloud/third.js"), {"userid": "y6qBDvXj"});
}

//server();

function relation() {
    var leagueScoreTable = require("../cloud/leagueScoreTable.js").leagueScoreTable;
    tool.test(leagueScoreTable);
}

function bug2() {
    var playerScore = require("../cloud/playerScore.js").playerScore;
    tool.test(playerScore);
}

//relation();
//bug2();

function testUserSignUp() {
    var userSignUp = require("../cloud/userSignUp.js").userSignUp;
    tool.test(userSignUp);
}

//testUserSignUp();

function testUserLogin() {
    var testLogin = require("../cloud/testLogin.js").testLogin;
    tool.test(testLogin);
}

//testUserLogin();

function testUpdateUserByObjectId() {
    var testUpdateUserByObjectId = require("../cloud/testUpdateUserByObjectId.js").testUpdateUserByObjectId;
    tool.test(testUpdateUserByObjectId);
}

//testUpdateUserByObjectId();

function testRemoveUserByObjectId() {
    var testRemoveUserByObjectId = require("../cloud/testRemoveUserByObjectId.js").testRemoveUserByObjectId;
    tool.test(testRemoveUserByObjectId);
}

//testRemoveUserByObjectId();

function testWinxinVerify() {
    var weixin = require("../cloud/weixin.js").weixin;
    // GET /messages?signature=f3b3ed8c9d4884df62e12b3dfba1f9240713bccf&echostr=1059940013166034888&timestamp=1446001536&nonce=712903944 200 2.133 ms - 19
    tool.test(weixin,
        {
            query: "signature=f3b3ed8c9d4884df62e12b3dfba1f9240713bccf&echostr=1059940013166034888&timestamp=1446001536&nonce=712903944",
            method: "GET"
        }
    );
}

//testWinxinVerify();

var cs = require("coffee-script");
var wxd = require("./weixin_sample")
function testWinxinText() {
    var weixin = require("../cloud/weixin.js").weixin;
    tool.testWithHeaders(weixin,
        {
            type: "XML",
            data: wxd.text
        },
        {
            'content-type': 'text/xml'
        }
    );
}

//testWinxinText();
