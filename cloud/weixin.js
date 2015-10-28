function onRequest(request, response, modules) {

    /// docs: <http://docs.bmob.cn/cloudcodeweixin/index.html?menukey=otherdoc&key=cloudcodeweixin>

    var verify = function () {
        var $signature = request.query.signature;
        var $timestamp = request.query.timestamp;
        var $nonce = request.query.nonce;
        var $token = "winseliu"; //在微信开发者页面填写的token字符串
        var $echostr = request.query.echostr;

        var params = [$token, $timestamp, $nonce].sort().join("")

        var crypto = modules.oCrypto;
        var code = crypto.createHash('sha1').update(params).digest('hex');

        var result = ( code == $signature ? $echostr : "Unauthorized" );
        return result
    }

    var httptype = modules.oHttptype;
    if ("get" == httptype) {
        var resp = verify();
        response.end(resp);
    } else {
        var xml2js = modules.oXml2js;
        var db = modules.oData;

        // 接收定阅者发送过来的消息后返回，把反馈意见存储表“message”中。
        db.insert(
            {
                "table": "message",             //表名
                "data": {"userId": request.body.xml.FromUserName, "content": request.body.xml.Content}
            },
            function (err, data) {
                //构造公众号后台所需要的xml格式，并返回给公众号后台
                var result = {
                    xml: {
                        ToUserName: request.body.xml.FromUserName,
                        FromUserName: request.body.xml.ToUserName,
                        CreateTime: new Date().getTime(),
                        MsgType: 'text',
                        Content: '你好，你发送的反馈内容「' + request.body.xml.Content + '」已收到。'
                    }
                }
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result); //利用模块xml2js，把json对象转换为一个xml文本
                response.setHeader('Content-Type', 'text/xml'); //设置返回的http header
                response.end(xml);
            });

    }

}

exports.weixin = onRequest;