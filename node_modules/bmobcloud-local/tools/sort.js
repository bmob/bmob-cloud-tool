/**
 *Bmob提供的对整个表进行排序的算法
 */
function onRequest(request, response, modules) {

    var db = modules.oData;
    //eventproxy模块，解决异步回调的问题
    var ep = modules.oEvent;
    var bat = modules.oBatch;

    var str = "";
    var arr = new Array(); //记录下每个分数有多少个用户  
    var searchNum = 0;   //表的总行数，用sql语句获得
    var limitnum = 1000; //默认最多返回1000条记录
    var runcount = parseInt(searchNum / 1000);
    //tableName是需要用到排序的表名，可以根据你的实际情况更换
    var tablename = "GameScore";


    db.find({
        "table": tablename,
        "count": 1
    }, function (err, data1) {

        var resultObject = JSON.parse(data1);
        searchNum = resultObject.count;
        runcount = parseInt(searchNum / 1000);


        //获取排行榜统计数据后对更新
        ep.after('got_data', runcount + 1, function (list) {

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
                    var objOrderArr = new Array(); //记录下每个用户的排名
                    var resultObject = JSON.parse(data);
                    var currentCount = 0; //当前返回的记录数

                    //遍历这个Json对象
                    for (var results in resultObject) {
                        var resultArr = resultObject[results];
                        response.end("resultArrlen:" + resultArr.length);

                        currentCount = resultArr.length;  //把当前的记录数赋值

                        for (var oneline in resultArr) {
                            var objectId = resultArr[oneline].objectId;
                            //resultArr[oneline].score中的score是需要排序的字段名，可根据实际情况修改
                            var score = resultArr[oneline].score;

                            var count = 0;
                            var totalOrder = 0;
                            for (var i = arr.length; i >= 0; i--) {
                                if (isNaN(arr[i])) {
                                } else {
                                    count++;
                                    if (score == i) {
                                        if (count == 1) { //当是第一个分数时，排名为1
                                            objOrderArr[objectId] = 1;
                                        } else {  //如果不是第一个分数，排名则是totalOrder+1
                                            objOrderArr[objectId] = totalOrder + 1;
                                        }
                                    } else {
                                        totalOrder = totalOrder + arr[i]; //记录下已经排过的分数
                                    }
                                }
                            }
                        }

                        //检查分数的结果
                        var tempCount = 0;
                        var totalCount = 0;
                        var batchArr = new Array();
                        var flag = 0;
                        for (var i in objOrderArr) {

                            tempCount++;
                            totalCount++;
                            //order是排列顺序的存储字段，可根据自己的实际情况修改
                            var tempDist = {"method": "PUT", "path": "/1/classes/" + tablename + "/" + i, "body": {"order": objOrderArr[i]}};
                            batchArr.push(tempDist);

                            if (tempCount == 50) {

                                bat.exec({
                                    "data": {
                                        "requests": batchArr
                                    }
                                }, function (err, data) {
                                    //回调函数
                                });
                                batchArr = new Array();
                                tempCount = 0;

                            }
                            //最后的剩余的要批量更新
                            if (currentCount == totalCount) {
                                bat.exec({
                                    "data": {
                                        "requests": batchArr
                                    }
                                }, function (err, data) {
                                    //回调函数
                                });
                            }

                        }

                    }
                });//end db find
            }//end for

            response.end("end");

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
                    // str="count:"+resultArr.length;
                    for (var oneline in resultArr) {
                        //resultArr[oneline].score是需要排序的字段名，可根据实际情况修改
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