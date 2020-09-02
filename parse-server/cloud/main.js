const accountSid = 'AC6d140e5ebe108ae77b04f2dcb4258246';
const authToken = '4b390328818292afccb265aa724825eb';
const twilio = require('twilio')(accountSid, authToken);

const FROM = '+12037634874';

function getRandomInt() {
    var min = 1111;
    var max = 9999;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

Parse.Cloud.afterSave("Subscribers", async (req) => {
    
    var subscriberObject = req.context.subscriberObject;
    console.log(subscriberObject);
    console.log(req.object);

    console.log(req.object.id);
    console.log(req.object.get('phoneNumber'));

    var Subscribers = Parse.Object.extend("Subscribers");
    var query = new Parse.Query(Subscribers);
    query.get("xWMyZ4YEGZ")
    .then((subscriber) => {
        console.log(subscriber);
    }, (error) => {
        console.log(error);
    });

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

