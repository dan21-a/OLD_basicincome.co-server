exports.connect = function(db, callback){
var ws = require("nodejs-websocket");

var server = ws.createServer(function (conn) {
    console.log("User connected...");


    conn.on("text", function (str) {
        
        


        if(str.indexOf("account_id")!==-1){update_taxRates_and_swarm_redistribution()}
        function update_taxRates_and_swarm_redistribution(){
        
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
}
        
        
        
        

        
    })
    
    
        exports.send_client = function(payment, account_id) {
        console.log("outgoing payments sent !")
            conn.sendText(JSON.stringify(payment));
           
           // listen for incoming websocket message
               conn.on("text", function (str) {
            var string = JSON.parse(str)

            if(str.indexOf("engine_result")!==-1 && string.tx_json.Destination === payment.account){payment_recieved()}
        function payment_recieved(){
            
            console.log("payment went through")
            console.log("Received: "+str);
            // deduct the dividend pathways
            var amount = String(payment.amount)
            db.collection(payment.node).findAndModify({
            query: {type: "dividend_pathway", currency: payment.currency, account: string.tx_json.Destination}, 
            update:{$inc:{total_pathway:-amount}}
            })
            // deduct from tax_blob
            db.collection(account_id).findAndModify({
            query: {type: "tax_blob", currency: payment.currency}, 
            update:{$inc:{total_amount:-amount}}
            })
        }
             })
        }
        
        
    }).listen(8080); console.log("server listening on port 8080");
}