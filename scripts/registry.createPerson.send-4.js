const Web3 = require('web3');
const { JANUS , CONTRACT_ABI, CONTRACT_ADDRESS} = require("./constants");
var rp = require('request-promise');

// function createPerson(string memory _displayName, string memory _imageUrl) public {

var options = {
    method: 'GET',
    url: 'https://imdb-api1.p.rapidapi.com/Title/k_5dl7qdss/tt4154796', // Query imdb for "The avengers"
    headers: {
        'x-rapidapi-key': 'f27033c285msh5fee6331060b2a1p1aaf88jsna6e56b3d50c6'
    }
};

let main = async () => {
    var args = process.argv.slice(2);
    if (args.length != 1) {
        console.log("Please provide *account index* [0-4]"); 
        process.exit(0);
    }
    let idx = args[0];
    let res = await rp(options);
    let movie = JSON.parse(res);
    let id = Math.floor(Math.random() * movie.actorList.length); 
    let name = movie.actorList[id].name;
    let url = movie.actorList[id].image;

    try {
        const web3 = new Web3(JANUS);
        let accounts = await web3.eth.getAccounts();
        const registry = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log(`calling method createPerson with name: ${name} from account #${idx}: `, accounts[idx]);
        let receipt = await registry.methods.createPerson(name,url).send({from : accounts[idx], gas: 300000});
        console.log("Send receipt: \n", receipt);
    
        } catch(e) {
            console.log("createPerson.send() failed:\n", e);
        }    
}


main();

