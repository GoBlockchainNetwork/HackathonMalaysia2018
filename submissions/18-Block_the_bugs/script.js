
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0x5870a6f8047db991618b6d46707ec08722f2cba7";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "setMessage",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialMessage",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "value",
				"type": "string"
			}
		],
		"name": "new_message",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}

function updateMessageValue() {
  msgString = document.getElementById("value").value;
  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

  contractInstance.setMessage(msgString,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
}

function refreshMessageValue(msgString) {
  contractInstance.message({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result); 
      document.getElementById("message").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

window.addEventListener('load', function() {
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    // Handle the case where the user doesn't have web3. Probably 
    // show them a message telling them to install Metamask in 
    // order to use our app.
    // For example
    // connect to eth node running locally
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // or connect the web3 to the ethereum node running on infura.io
    //var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/'));
    console.log('METAMASK NOT DETECTED');
  }
  // Now you can start your app & access web3js freely:
  initApp();
})

