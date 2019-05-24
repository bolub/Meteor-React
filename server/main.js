import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  console.log('server');
});

// GET /user - returns every message from MongoDB collection.

Router.route('/users',{where: 'server'})
    .get(function(){
        var response = User.find().fetch();
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    })

  // POST /message - {message as post data}
  // Add new message in MongoDB collection.

    .post(function(){
        var response;
        if(this.request.body.userName === undefined || this.request.body.userPassword === undefined) {
            response = {
                "error" : true,
                "message" : "invalid data"
            };

 } else {
            User.insert({
                UserName : this.request.body.userName,
                UserPassword : this.request.body.userPassword
            });
            response = {
                "error" : false,
                "message" : "User added."
            }
        }
        this.response.setHeader('Content-Type','application/json');
        this.response.end(JSON.stringify(response));
    });

// 358808081335121
// 358808081335139
