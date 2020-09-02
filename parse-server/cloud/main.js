const accountSid = 'AC6d140e5ebe108ae77b04f2dcb4258246';
const authToken = '4b390328818292afccb265aa724825eb';
const twilio = require('twilio')(accountSid, authToken);

Parse.Cloud.afterSave("Subscribers", async (req) => {
    var sendOnTimePin = req.context.sendOnTimePin;
    var otp = req.context.otp;
    console.log(sendOnTimePin);
    console.log(otp);
    
    if (sendOnTimePin) {

    }
});

Parse.Cloud.define("inviteWithTwilio", function(request, response) {
    twilio.messages
    .create({
        body: request.params.message,
        from: '+12037634874',
        to: request.params.number
    })
    .then(message => console.log(message.sid));
});

Parse.Cloud.define("getSubscriberCount", async request=> {
    const query = new Parse.Query("Subscribers");
    let results;
    try{
        results = await query.count({ useMasterKey: true });
        console.log(results);
        return results;
    } catch(error){
        return error.message;
    }
});

