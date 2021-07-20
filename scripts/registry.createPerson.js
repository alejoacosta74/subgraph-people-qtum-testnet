const Web3 = require('web3');
var Tx = require ('ethereumjs-tx');
const REGISTRY=require('../truffle/build/contracts/PersonRegistry.json');
//const REGISTRY_ADDRESS='0x41fA13a4CEaE6ECef5cb4bE1ce74a2b68bB5eccB'; //qtum WIF qPaEf8rvAuux3zZdAwhdheSMtVoCvTCrpC
const REGISTRY_ADDRESS="0xd7e3e9bA710b7356DD04b7bCA4B021e59fAeAD36"; //qtum WIF qdEuTwvbiCH8DRztLc2sTTtFAdpJjDvdPg
const KEY = "cMbgxCJrTYUqgcmiC1berh5DFrtY1KeU4PXZ6NZxgenniF1mXCRk";

// function createPerson(string memory _displayName, string memory _imageUrl) public {

let main = async () => {
    try {
        //Boiler plate code
        const web3 = new Web3('http://qtum:testpasswd@localhost:23889');
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(REGISTRY.abi, REGISTRY_ADDRESS);
        let owner0 = accounts[0];
        let accounts = await web3.eth.getAccounts();        
        const address1 = accounts[0];
        const PRIVATEKEY1 = "666c3506b22a6973f36eae8782725ce49eeb47ef47608a5f9ff7af6fd8138828";
        const privateKey1 = Buffer.from(PRIVATEKEY1, 'hex');
        const account2 = web3.eth.accounts.create();
        console.log("adress2:", account2.address);

        //Build Tx object

        web3.eth.getTransactionCount(address1, (err, txCount) =>{
            console.log("Nonce: ", txCount);
            const txObject = {
                nonce: web3.utils.toHex(txCount),
                to: account2.address,
                value: web3.utils.toHex('1000'),
                gasLimit: web3.utils.toHex(100000),
                gasPrice: web3.utils.toHex(100)                
            }
            console.log("Tx Object: \n", JSON.stringify(txObject));

            //Sign the Tx

            const tx = new Tx (txObject);
            console.log("Tx: \n", JSON.stringify(tx));
            tx.sign(privateKey1);
            console.log("Tx.signed(): \n", JSON.stringify(tx));
            const serializedTransaction = tx.serialize();
            console.log("Tx.Serialized: \n", serializedTransaction.toString());
            const raw = '0x' + serializedTransaction.toString('hex');
            console.log("Tx.raw: \n", raw);

            //Broadcast the Tx

            web3.eth.sendSignedTransaction(raw, (err, txHash) => {
                try {
                    if (err){
                        throw err;
                    }
                    console.log("TxHash:", txHash);
    
                } catch (e){
                    console.log("--> SendSignedTx error: \n", e);
                }
            })
        })
        } catch(e) {
            console.log("SendTx failed:\n", e);
        }    
}


main();

