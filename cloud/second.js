function onRequest(request, response, modules) {
    //获取数据库对象
    var db = modules.oData;
    //获取Posts表中的所有值
    db.find({
        "table":"_User"
    },function(err,data){
        response.end(data || err);
    });
}

exports.second = onRequest;