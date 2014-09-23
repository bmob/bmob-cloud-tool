function onRequest(request, response, modules) {
    var db = modules.oData;
    db.findOne({
        "table": "_User",
        "objectId": request.body.userid
    }, function (err, data) {
        response.end(data || err);
    });
}

exports.third = onRequest;