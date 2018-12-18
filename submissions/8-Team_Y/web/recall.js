
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0x29c923d4a8631bca9c0615fe56836bdc28ca1ee0";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "drug",
				"type": "address"
			}
		],
		"name": "recallDrug",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resetAll",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
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
				"type": "address"
			}
		],
		"name": "recall",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "drug",
				"type": "address"
			}
		],
		"name": "getDrugDetail1",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
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
		"inputs": [
			{
				"name": "drug",
				"type": "address"
			}
		],
		"name": "getDrugDetail2",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "bool"
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
				"name": "drug",
				"type": "address"
			}
		],
		"name": "getDrugName",
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
		"name": "getDrugsCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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
				"name": "n",
				"type": "uint256"
			}
		],
		"name": "getNthDrugAddress",
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
		"name": "getUniqueId",
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
		"inputs": [
			{
				"name": "drug",
				"type": "address"
			}
		],
		"name": "isRecalled",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
	
	getDrugDetails();
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

function getDrugName() {
  msgString = document.getElementById("value").value;
  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

	console.log('index is ', msgString);

  contractInstance.getNthDrugAddress(msgString, function(err, result) {
    if (!err){
			console.log('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
			
///
contractInstance.getDrugName(result, function(err, result) {
	if (!err){
		console.log('Fetched msg value from blockchain:',result); 
		document.getElementById("drug-name").innerText=result;
	}
	else{
		console.log(err);
	}
});

///
			
    }
    else{
      console.log(err);
    }
  });
}


function getDrugDetails() {
  contractInstance.getDrugDetail1('0x1936c24Da826d691a8bB53b107Ad031E1f4Cb724', function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result); 
      document.getElementById("drug-name").innerText=result[0];
      document.getElementById("manufacturer").innerText=result[1];
      document.getElementById("batch-no").innerText=result[2];
      document.getElementById("expiry-date").innerText=result[4];
      document.getElementById("manufacturing-date").innerText=result[3];
    }
    else{
      console.log(err);
    }
  });
}

function recallDrug() {
	contractInstance.recallDrug('0x1936c24Da826d691a8bB53b107Ad031E1f4Cb724', function(err, result) {
		if (!err) {
			console.log('Recall drug');
		} else {
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


