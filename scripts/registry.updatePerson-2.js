const Web3 = require('web3');
const { JANUS , CONTRACT_ABI, CONTRACT_ADDRESS} = require("./constants");
var rp = require('request-promise');


let main = async () => {
    var args = process.argv.slice(2);
    if (args.length != 1) {
        console.log("Please provide *account index* [0-4]"); 
        process.exit(0);
    }
    let idx = args[0];

    try {
        const web3 = new Web3(JANUS);
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log(`...Updating Person details for account ${accounts[idx]} \n`);
        let result = await registry.methods.getPerson(accounts[idx]).call({from: accounts[idx], gas: 300000})
        console.log(`...Original person details: \n`, JSON.stringify(result));
        let name = "tito"+ Math.random().toPrecision(3);
        console.log(`\n...calling method updatePersonName with new name: ${name} from account #${idx}: `, accounts[idx]);
        let receipt = await registry.methods.updatePersonName(name).send({from : accounts[idx], gas: 300000});
        console.log("UpdatePersonName receipt: \n", receipt);
    
        } catch(e) {
            console.log("updatePerson.send() failed:\n", e);
        }    
}


main();

