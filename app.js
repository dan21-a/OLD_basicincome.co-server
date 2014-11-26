// RESILIENCE.ME, the worlds first p2p basic income network
// see http://www.resilience.me/videos.html
// Johan Nygren, How to Create Resilience, SpaceCollective

// any form of database works, I use mongoDB

/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://AwSZome:jn0903@ds059907.mongolab.com:59907/awesome_box");   



 
// the concept I have could collect data from any financial platform
// this example collects data from Ripple

var subscribe = require('./subscribe')
subscribe.connect(db)


// each node sets their own taxRate. these values are encrypted on the financial platform-side,
// this example connects to the Ripple-app http://basicincome.co
// in this example, the taxRate values are stored in a nodes ripple-wallet
var basicincome_co = require('./basicincome_co')
basicincome_co.connect(db, swarm)


// this API takes data from the database, and ouputs a list of swarm-dividend payments
// these payments are then sent back to the node, who needs to sign them, preferably through a client that does that automatically
// in this example, http://client.basicincome.co automatically signs the payments it recieves
var swarm_redistribution = require("./swarm_redistribution")


function swarm(account_id){
    swarm_redistribution.API(db, account_id, send_client)
    
function send_client(payment){
    basicincome_co.send_client(payment)
            
}
}
