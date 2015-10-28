/**
 *Bmob提供的获取某个表的前N名数据的排行的算法, N<1000
 */
function onRequest(request, response, modules) {

    //tableName是需要用到排序的表名，可以根据你的实际情况更换
    var tablename = "GameScore";
    //scoreField是需要排序的字段名
    var scoreField = "score";
    //返回前orderNum条
    var orderNum = 10;

    var db = modules.oData;
    var ep = modules.oEvent;  //eventproxy模块，解决异步回调的问题
    var bat = modules.oBatch;

    var str = "";
    var arr = new Array(); //记录下每个分数有多少个用户  
    var searchNum = 0;   //表的总行数，用sql语句获得
    var limitnum = 1000; //默认最多返回1000条记录
    var runcount = 0;

    db.find({
        "table": tablename,
        "count": 1
    }, function (err, data1) {

        var resultObject = JSON.parse(data1);
        searchNum = resultObject.count;
        runcount = parseInt(searchNum / 1000);

        //获取排行榜统计数据后更新
        ep.after('got_data', runcount + 1, function (list) {

            var scoreLine = 0; //记录超过orderNum的分数线
            var totalOrder = 0;

            for (var i = arr.length; i >= 0; i--) {
                if (isNaN(arr[i])) {
                } else {
                    totalOrder = totalOrder + arr[i]; //记录下已经排过的分数
                    str = str + " " + i + ":" + totalOrder;
                    if (totalOrder >= orderNum) {
                        scoreLine = i;  //这时的i就是分数线
                        break;
                    }
                }
            }

            db.find({
                "table": tablename,          //表名
                "where": {"score": {"$gte": scoreLine}},       //查询条件是大于分数线
                "order": "-" + scoreField,         //排序列表，[-]字段名称,-表示降序，默认为升序
                "limit": orderNum            //
            }, function (err, data) {    //回调函数

                response.end(data + "");
            });

        });


        //分多次获取记录，因为每次只能获取1000条
        for (var i = 0; i <= runcount; i++) {
            var skipNum = 1000 * i;
            if (i == runcount) {
                limitnum = searchNum - 1000;
            } else {
                limitnum = 1000;
            }
            db.find({
                "table": tablename,
                "limit": limitnum,
                "skip": skipNum
            }, function (err, data) {
                var resultObject = JSON.parse(data);
                //遍历这个Json对象
                for (var results in resultObject) {
                    var resultArr = resultObject[results];
                    for (var oneline in resultArr) {
                        var tempScore = resultArr[oneline].score;

                        if (isNaN(arr[tempScore])) {  //该下标还不存在，
                            arr[tempScore] = 1
                        } else { //如果下标存在，则这个下标的数目的加1
                            arr[tempScore] = arr[tempScore] + 1;
                        }
                    }
                }

                ep.emit('got_data', 1);

            });//end db find
        }//end for 
    });

} 