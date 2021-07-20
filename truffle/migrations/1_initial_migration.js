const Migrations = artifacts.require("Migrations");

module.exports = async function (deployer) {
  let accounts = await web3.eth.getAccounts();
  console.log("Account[2]:", accounts[2]);
  await deployer.deploy(Migrations);
};
