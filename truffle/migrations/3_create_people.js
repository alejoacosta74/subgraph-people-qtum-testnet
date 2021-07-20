const Registry = artifacts.require("PersonRegistry")

module.exports = async function(deployer) {
  const registry = await Registry.deployed()
  let accounts = await web3.eth.getAccounts();
  await registry.createPerson('Rick', 'https://i.pinimg.com/474x/04/41/a0/0441a0d29c052a22dcb57b7e2902a9c3.jpg', {
    from: accounts[0],
  })
  await registry.createPerson('Morty', 'https://i.pinimg.com/originals/bb/fb/c5/bbfbc53ad3225e33a49c2ad3c12424f9.png', {
    from: accounts[1],
  })
}