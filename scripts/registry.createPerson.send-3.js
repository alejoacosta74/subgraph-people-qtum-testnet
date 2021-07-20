const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
//const REGISTRY_ADDRESS='0x41fA13a4CEaE6ECef5cb4bE1ce74a2b68bB5eccB'; //qtum WIF qPaEf8rvAuux3zZdAwhdheSMtVoCvTCrpC
const REGISTRY_ADDRESS="0xd7e3e9bA710b7356DD04b7bCA4B021e59fAeAD36"; //qtum WIF qdEuTwvbiCH8DRztLc2sTTtFAdpJjDvdPg
const KEY = "cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk";

// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    var args = process.argv.slice(2);
    if (args.length != 2) {
        console.log("Please provide *account index* and *name* to create the person");
        process.exit(0);
    }
    let idx = args[0];
    let name = args[1];

    try {
        const web3 = new Web3('http://qtum:testpasswd@localhost:23889');
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        console.log(`calling method createPerson with name: ${name} from account #${idx}: `, accounts[idx]);
        let receipt = await registry.methods.createPerson(name, "dummy url").send({from : accounts[idx], gas: 300000});
        console.log("Send receipt: \n", receipt);

    
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

