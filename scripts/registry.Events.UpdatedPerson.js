const Web3 = require('web3');
const { JANUS , CONTRACT_ABI, CONTRACT_ADDRESS, JANUS_WS} = require("./constants");
let main = async () => {
    try {
	const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:23890"))
        const registry = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
	registry.events.UpdatedPerson(
		//{ fromBlock: 1085963},
		{},
		(error, event) => { 
			console.log("Event:", event); 
			console.log("error:", error); 
		}
	)
	.on("connected", function(subscriptionId){
	    console.log("on.Connected - subscriptionId: ",subscriptionId);
	})
	.on('data', function(event){
	    console.log("on.Data - event: ", event); // same results as the optional callback above
	})
	.on('changed', function(event){
	    console.log("on.Changed - event: \n", event);
	})
	.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
	    console.log("on.Error - error: \n", error);
	    console.log("on.Error - receipt: \n", receipt);
	});
	
    } catch (e){
        console.log("script Event.UpdatedPerson failed: \n", e);
    }
}

main();