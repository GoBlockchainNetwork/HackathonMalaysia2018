
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0xd7cf45dfa90fee1da892fae569702be3fe5c39fc";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "fruitName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "int256"
			}
		],
		"name": "farmerRegister",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "receiver",
				"type": "address"
			},
			{
				"name": "fruitName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "int256"
			}
		],
		"name": "farmerUpdate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "Pts",
				"type": "int256"
			}
		],
		"name": "updateReview",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "fruit",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "int256"
			},
			{
				"name": "fruitprice",
				"type": "int256"
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
				"name": "_userId",
				"type": "address"
			}
		],
		"name": "registerFarm",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "farmers",
		"outputs": [
			{
				"name": "userId",
				"type": "address"
			},
			{
				"name": "userName",
				"type": "string"
			},
			{
				"name": "fruitname",
				"type": "string"
			},
			{
				"name": "qty",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fruitname",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "qty",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "review",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "userAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "userName",
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
]

var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}


function showReview(){
	contractInstance.review({
		from: myAccount,
	},function(err,result){
		if (!err){
			console.log('Good', result);
		}
		else[
			console.log()
		]
	})
}

function showQty(){
	var qty;
	contractInstance.qty({
		from: myAccount,
	},function(err,result){
		if (!err){
			console.log('Good', result);
			qty = result;
		}
		else[
			console.log()
		]
	})

	return qty;
}

function showPrice(){
	var price;
	contractInstance.price({
		from: myAccount,
	},function(err,result){
		if (!err){
			console.log('Good', result);
			price = result;
		}
		else[
			console.log()
		]
	})

	return price;
}

function showName(){

	name;
	contractInstance.userName({
		from: myAccount,
	},function(err,result){
		if (!err){
			console.log('Good', result);
			name = result;
		}
		else[
			console.log("Cannot")
		]
	})

	return name;
}


function showFarmer(){
//	var review = showReview();
	var name = showName();
	var qty = showQty();
	var price = showPrice();

//	console.log(review);
	console.log(name);
	console.log(qty);
	console.log(price);
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
	showFarmer();
})


