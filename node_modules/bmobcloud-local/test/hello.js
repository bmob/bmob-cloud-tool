function onRequest(request, response, modules) {
    response.end("hello bmob.");
}
exports.hello = onRequest;