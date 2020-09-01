Parse.Cloud.define('hello', function(request, response) {
    
    var user = Parse.User.current();

    response.success("messages: hello world");
});