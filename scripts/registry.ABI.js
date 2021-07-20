const Web3 = require('web3');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
//const REGISTRY_ADDRESS='0x41fA13a4CEaE6ECef5cb4bE1ce74a2b68bB5eccB';
const REGISTRY_ADDRESS="0xd7e3e9bA710b7356DD04b7bCA4B021e59fAeAD36";
const KEY = "cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk";
let main = async () => {
    try {
        const web3 = new Web3('http://qtum:testpasswd@localhost:23889');
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        let owner0 = accounts[0];
        registry.methods.getPerson(owner0).call({from: accounts[2], gas: 300000})
        .then((result)=>{
            console.log(`Person details for ${owner0}: \n`, JSON.stringify(result));                            
        })        
    } catch (e){
        console.log("getPerson failed: \n", e);
    }
}

main();