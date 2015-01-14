function onRequest(request, response, modules) {
    var db = modules.oData;

    db.userLogin(
        {
            "username":"test",            //登录用户名
            "password":"test"              //用户密码
        },
        function(err,data){         //回调函数
            //data是json字符串，为了查看方便（无转移字符）将返回结果转换为Json对象
            //var resultObject = JSON.parse(data);
            response.end(data || err);
        }
    );

}

exports.testLogin = onRequest;