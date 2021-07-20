const Registry= artifacts.require("PersonRegistry");

module.exports = async function(deployer) {    
    let accounts = await web3.eth.getAccounts();
    console.log("Account[0]:", accounts[0]);
    await deployer.deploy(Registry, {from: accounts[0], gas: 3000000});
}