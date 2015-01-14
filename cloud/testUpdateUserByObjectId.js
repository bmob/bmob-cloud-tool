function onRequest(request, response, modules) {
    var db = modules.oData;

    db.setHeader({"X-Bmob-Master-Key":"501ed5a81380df115d47c14b9a2c7094"});

    db.updateUserByObjectId({
            "objectId": "aEen111W",        //记录的objectId
            "data": {"a": "XXXX", "b": "XXXX"}           //需要更新的数据，格式为JSON
        }, function (err, data) {         //回调函数
            //data是json字符串，为了查看方便（无转移字符）将返回结果转换为Json对象
            //var resultObject = JSON.parse(data);
            response.end(data || err);
        }
    );

}

exports.testUpdateUserByObjectId = onRequest;