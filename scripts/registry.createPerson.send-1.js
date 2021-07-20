const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const cs = require('coinstring');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
//const REGISTRY_ADDRESS='0x41fA13a4CEaE6ECef5cb4bE1ce74a2b68bB5eccB'; //qtum WIF qPaEf8rvAuux3zZdAwhdheSMtVoCvTCrpC
const REGISTRY_ADDRESS="0xd7e3e9bA710b7356DD04b7bCA4B021e59fAeAD36"; //qtum WIF qdEuTwvbiCH8DRztLc2sTTtFAdpJjDvdPg
const KEY = "cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk";
const KEYS = [
"cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk",
"cRcG1jizfBzHxfwu68aMjhy78CpnzD9gJYZ5ggDbzfYD3EQfGUDZ",
"cV79qBoCSA2NDrJz8S3T7J8f3zgkGfg4ua4hRRXfhbnq5VhXkukT",
"cV93kaaV8hvNqZ711s2z9jVWLYEtwwsVpyFeEZCP6otiZgrCTiEW",
"cVPHpTvmv3UjQsZfsMRrW5RrGCyTSAZ3MWs1f8R1VeKJSYxy5uac",
"cTs5NqY4Ko9o6FESHGBDEG77qqz9me7cyYCoinHcWEiqMZgLC6XY"
]

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
        const tx = registry.methods.createPerson(name, "dummy url");
        console.log("...calculating gas for tx.:");
        let gas = await tx.estimateGas({from : accounts[idx], gas:300000});
        let gasPrice = await web3.eth.getGasPrice();
        console.log("Gas price: ", gasPrice, " // Gas: ", gas)
        const data = tx.encodeABI();
        console.log("...enconding ABI: ", data);
        const nonce = await web3.eth.getTransactionCount(accounts[idx]);
        console.log("...account nonce: ", nonce);
        console.log("...signing TX with KEY \n (WIF):", KEYS[idx]);
        var res = cs.decode(KEYS[idx]);
        var key = res.toString('hex');
        console.log("(hex):", key);
        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: registry.options.address,
                data,
                gas,
                gasPrice,
                nonce,
            },
            key
        );
        console.log("signedTX:",signedTx);
        console.log(`...calling method createPerson with name: ${name} from account #${idx}: `, accounts[idx]);
        /*
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log("Send receipt: \n", receipt);
        ef7826adc1127b8cf34c47b2c7909904109d7fe404be04838e323082981c51340e01
    */
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

