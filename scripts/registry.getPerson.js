const Web3 = require('web3');
const { JANUS , CONTRACT_ABI, CONTRACT_ADDRESS} = require("./constants");
let main = async () => {
    try {
        const web3 = new Web3(JANUS);
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        for (let i=0; i< accounts.length; i++){
            registry.methods.getPerson(accounts[i]).call({from: accounts[2], gas: 300000})
            .then((result)=>{
                console.log(`Person details for ${accounts[i]}: \n`, JSON.stringify(result));                            
            }) 
        }
    } catch (e){
        console.log("getPerson failed: \n", e);
    }
}

main();