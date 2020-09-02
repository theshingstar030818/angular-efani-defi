const accountSid = 'AC6d140e5ebe108ae77b04f2dcb4258246';
const authToken = '4b390328818292afccb265aa724825eb';
const twilio = require('twilio')(accountSid, authToken);

const FROM = '+12037634874';

Parse.Cloud.afterSave("Subscribers", async (req) => {
    var sendOnTimePin = req.context.sendOnTimePin;
    var otp = req.context.otp;
    console.log(sendOnTimePin);
    console.log(otp);

    console.log(req);
    
    if (sendOnTimePin) {

    }
});

function sendSMS(phoneNumber, message) {
    twilio.messages
    .create({
        body: message,
        from: FROM,
        to: phoneNumber
    })
    .then(message => console.log(message.sid));
}

Parse.Cloud.define("sendSMS", function(request, response) {
    sendSMS(request.params.number, request.params.message);
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

