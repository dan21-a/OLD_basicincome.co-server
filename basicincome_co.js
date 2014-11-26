exports.connect = function(db, callback){
var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");


    conn.on("text", function (str) {
        
        console.log("Received: "+str);
        
        
        


        
        
        
        var BLOB = JSON.parse(str)
        var ACCOUNT_ID = BLOB[0].account_id
        var WALLET = BLOB[1]
        var COLLECTION = db.collection(ACCOUNT_ID);

        
        
        
        // update wallet
        COLLECTION.remove({ type: 'wallet' })
        
        for(var i=0;i<WALLET.length; i++){
        COLLECTION.save({ type: "wallet", currency: WALLET[i].currency, taxRate: WALLET[i].taxRate })
        }
        

               
        //add collection to request_subscribe()
        db.collection('accounts').findAndModify({ 
        query: {account: ACCOUNT_ID}, 
        upsert: true
        })


callback(ACCOUNT_ID)

        
        
        
        
    exports.send_client = function(payment) {
        console.log("outgoing payments sent !")
            conn.sendText(JSON.stringify(payment));
    }
        
        
    })
    }).listen(8080); console.log("server listening on port 8080");
}