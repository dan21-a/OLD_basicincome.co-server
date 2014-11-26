// RESILIENCE.ME, the worlds first p2p basic income network
// see http://www.resilience.me/videos.html
// Johan Nygren, How to Create Resilience [2013], SpaceCollective

// any form of database works, I use mongoDB

/*loading mongodb*/    
var mongojs = require("mongojs")
var db = mongojs("mongodb://test:test@ds059907.mongolab.com:59907/awesome_box");   



 
// the concept I have could collect data from any financial platform
// this example collects data from Ripple
// in Ethereum or BitCoin, this module should scan their blockchain

// in theory, this module could be stored in the blockchain, 
// example Ethereums blockchain or Ripples blobvault / ledger
// but that would mean alot more traffic between the blockchain/ledger
// and the swarm_redistribution API
// so I use a seperate database

var subscribe = require('./subscribe')
subscribe.connect(db)


// each node sets their own taxRate. these values are encrypted on the financial platform-side,
// this example connects to the Ripple-app http://basicincome.co
// in this example, the taxRate values are stored in a nodes ripple-wallet

// the point of storing the taxRate values in the ripple-wallet, or Ethereum block, 
// is so that the account can validate that the dividend payments is <= taxed amount

var basicincome_co = require('./basicincome_co')
basicincome_co.connect(db, swarm)


// this API takes data from the database, and ouputs a list of swarm-dividend payments
// these payments are then sent back to the node, who needs to sign them, preferably through a client that does that automatically
// in this example, http://client.basicincome.co automatically signs the payments it recieves

var swarm_redistribution = require("./swarm_redistribution")

function swarm(account_id){
    swarm_redistribution.API(db, account_id, send_client)
    
function send_client(payment){
    console.log("hahaha")
    basicincome_co.send_client(payment)
            
}
}
