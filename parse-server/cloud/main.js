// Include the Twilio Cloud Module and initialize it
const accountSid = 'AC6d140e5ebe108ae77b04f2dcb4258246';
const authToken = '4b390328818292afccb265aa724825eb';
const twilio = require('twilio')(accountSid, authToken);

// Create the Cloud Function
Parse.Cloud.define("inviteWithTwilio", function(request, response) {
    // Use the Twilio Cloud Module to send an SMS
    twilio.sendSMS({
        From: "myTwilioPhoneNumber",
        To: request.params.number,
        Body: "Start using Parse and Twilio!"
    }, {
        success: function(httpResponse) { response.success("SMS sent!"); },
        error: function(httpResponse) { response.error("Uh oh, something went wrong"); }
    });
});

Parse.Cloud.define("getSubscriberCount", async request=> {
    const query = new Parse.Query("Subscribers");
    let results;
    try{
        results = await query.count({ useMasterKey: true }); // count() will use the master key to bypass ACLs
        console.log(results);
        return results;
    } catch(error){
        return error.message;
    }
});

