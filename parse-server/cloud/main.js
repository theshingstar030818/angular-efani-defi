Parse.Cloud.define('hello', function(request, response) {
    var query = new Parse.Query('Subscribers');
    query.count({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
        response.success(count);
    });
});