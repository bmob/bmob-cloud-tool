/**
 *Bmob提供的快速获取某一个objectId的排序的算法
 *上传一个objectId上去，直接知道这条数据的某个字段值（云端代码里面指定）在整个表的排序
 */
function onRequest(request, response, modules) {


    var db = modules.oData;
    //tableName是需要用到排序的表名，可以根据你的实际情况更换
    var tableName = "GameScore";
    //这个objectId可以通过request.body.参数名 从SDK中传上来
    var objectId = "848f4ed06c";

    //先获取该数据的分数
    db.findOne({
        "table": tableName,
        "objectId": objectId
    }, function (err, dataScore) {
        // response.end(dataScore+"");
        var resultObject = JSON.parse(dataScore);
        //遍历这个Json对象
        if (resultObject.hasOwnProperty("error") == true && resultObject.hasOwnProperty("code") == true) { //显示错误信息
            response.end(resultObject.error);
        } else {
            //score需要排序的数据的字段名，你可以根据自己的实际情况修改
            var score = resultObject.score;

            //获取这个分数以上有多少条数据
            db.find({
                "table": tableName,
                "where": {"score": {"$gte": score}},
                "limit": 1,
                "count": 1
            }, function (err, dataGte) {    //回调函数
                resultGte = JSON.parse(dataGte);
                countGte = resultGte.count; //大于这个分数的数据数目

                //获取等于这个分数有多少条数据
                db.find({
                    "table": tableName,
                    "where": {"score": score},
                    "limit": 1,
                    "count": 1
                }, function (err, dataEqu) {    //回调函数
                    resultEqu = JSON.parse(dataEqu);
                    countEqual = resultEqu.count; //大于这个分数的数据数目

                    //排名为order
                    order = countGte - countEqual + 1;
                    //返回信息可以根据自己的实际情况返回
                    response.end("排名为" + order + "名");
                });
            });
        }
    });


}