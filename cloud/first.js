function onRequest(request, response, modules) {
    var db = modules.oData;
    db.insert({
        "table": "GameObject",             //表名
        "data": {"name": request.body.name}            //需要更新的数据，格式为JSON
    }, function (err, data) {
        //data是json字符串，为了查看方便（无转移字符）将返回结果转换为Json对象
        //var resultObject = JSON.parse(data);
        response.end(data || err);
    });

    response.end("earlier end!!");
}

exports.first = onRequest;