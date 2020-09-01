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

