function onRequest(request, response, modules) {
    var db = modules.oData;
    db.userSignUp(
        {
            "data":{"username":"cooldude6","password":"12345"}
        },function(err,data){         //回调函数
            response.end(data || err);
        }
    );

}

exports.userSignUp = onRequest;