const Registry = artifacts.require("PersonRegistry")

module.exports = async function(callback) {
  const registry = await Registry.deployed();
  let accounts = await web3.eth.getAccounts();
  let result;
  console.log("Creating Summer...")
  try {
        result = await registry.createPerson('summer', 'https://i.pinimg.com/474x/04/41/a0/0441a0d29c052a22dcb57b7e2902a9c3.jpg', {
            from: accounts[0],
        });
        console.log("TX result:\n", result);
  } catch (e){
      console.log("create summer failed:\n", e);
  }
  console.log("Creating jerry...");
  try{
    result = await registry.createPerson('jerry', 'https://i.pinimg.com/originals/bb/fb/c5/bbfbc53ad3225e33a49c2ad3c12424f9.png', {
        from: accounts[1],
      });
      console.log("TX result:\n", result);
    } catch (e){
        console.log("create Jerry failed:\n", e);
    }
  
  callback();
}