Parse.Cloud.define('hello', function(request, response) {
    var user = Parse.User.current();
  
    var query = new Parse.Query('Subscribers');
    query.equalTo('gasPrice', 700);
    query.find()
      .then(function(messages) {
        response.success(messages);
      });
  });