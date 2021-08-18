const Web3 = require('web3');
const { JANUS , CONTRACT_ABI, CONTRACT_ADDRESS, JANUS_WS} = require("./constants");
let main = async () => {
    try {
        const web3 = new Web3(JANUS);
	//const web3 = new Web3(new Web3.providers.WebsocketProvider("ws://localhost:23889/ws"))
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
	registry.getPastEvents(
		"UpdatedPerson",
		{ fromBlock: 1085963, toBlock: "latest" },
		(errors, events) => {
		    if (!!errors) {
			console.log("Error while getting even 'UpdatedPerson: \n", errors);
			//console.log("Arguments ", arguments);
		    }
		    else {
			    console.log("Event: \n", events)
		    }
		}
	    );
    } catch (e){
        console.log("script getPastEvents failed: \n", e);
    }
}

main();