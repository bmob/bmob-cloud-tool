function onRequest(request, response, modules) {

    var rel = modules.oRelation;

    rel.query({
        "table":"Team",
        "where":{"$relatedTo":{"object":{"__type":"Pointer","className":"League","objectId":"56bca21ef4"},"key":"teams"}}
    },function(err,data){
        // var leagueTeamsObject = JSON.parse(data);
        //回调函数
        response.end(data);
    });


}

exports.leagueScoreTable = onRequest;