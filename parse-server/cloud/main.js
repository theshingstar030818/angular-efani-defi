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

Parse.Cloud.define("verifySubscriber", async (request) => {
    const subscriberId = request.params.subscriberId;
    const otpProvided = request.params.otp;

    let results;
    try{
        var Subscribers = Parse.Object.extend("Subscribers");
        var query = new Parse.Query(Subscribers);
        subscriber = await query.get(subscriberId);
        
        var otp = subscriber.get("oneTimePin");
        if (otp === otpProvided) {
            subscriber.set("verified", true);
            subscriber.save();
            results = 200;
        } else {
            results = "Invalid OTP provided.";
        }
        return results;
    } catch(error){
        return error;
    }
});

Parse.Cloud.define("saveSubscriber", async (request) => {
    const subscriberFormValue = request.params.subscriberFormValue;

    const Subscriber = Parse.Object.extend('Subscribers');
    const subscriber = new Subscriber();
    subscriber.set('phoneNumber', subscriberFormValue.phoneNumber);
    subscriber.set('speed', subscriberFormValue.speed);
    subscriber.set('gasPrice', subscriberFormValue.gasPrice);

    let results;
    try{
        results = await subscriber.save(null, { context: { sendOnTimePin: true } });
        return results;
    } catch(error){
        return error.message;
    }
});

Parse.Cloud.afterSave("Subscribers", async (req) => {
    var sendOnTimePin = req.context.sendOnTimePin;

    if (sendOnTimePin) {
        const oneTimePin = getRandomInt();
        req.object.set("oneTimePin", oneTimePin);
        req.object.set("verified", false);
        await req.object.save(null, { context: { sendOnTimePin: false } });
        // TODO uncomment when ready
        await sendSMS(req.object.get("phoneNumber"), "Your One Time Pin (OTP) is : " + oneTimePin);
    }
});

function sendSMS(phoneNumber, message) {
    return twilio.messages
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
        return results;
    } catch(error){
        return error.message;
    }
});

