Parse.Cloud.define('hello', function(request, response) {
    var query = new Parse.Query('Subscribers');
    query.count({ useMasterKey: true }) // count() will use the master key to bypass ACLs
    .then(function(count) {
        response.success(count);
    });
});

Parse.Cloud.define("hello", async request=> {
    const query = new Parse.Query("Subscribers");
    

    let results;
    try{
        results = await query.count({ useMasterKey: true }); // count() will use the master key to bypass ACLs
        console.log(results);
        return results;
    } catch(error){
        throw error.message;
    }

});