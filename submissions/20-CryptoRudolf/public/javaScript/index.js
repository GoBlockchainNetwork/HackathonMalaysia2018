
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0x76cdfb90e3fad434b9f7fe733b5249d131d77ef1";

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
				"name": "pass",
				"type": "string"
			},
			{
				"name": "u_add",
				"type": "address"
			},
			{
				"name": "utype",
				"type": "string"
			}
		],
		"name": "createParticipant",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "p_id",
				"type": "uint256"
			}
		],
		"name": "getParticipant",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "prod_id",
				"type": "uint256"
			}
		],
		"name": "getProduct_details",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
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
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "trck_id",
				"type": "uint256"
			}
		],
		"name": "getProduct_trackindex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "own_id",
				"type": "uint256"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "p_cost",
				"type": "uint256"
			},
			{
				"name": "p_specs",
				"type": "string"
			},
			{
				"name": "p_review",
				"type": "string"
			}
		],
		"name": "newProduct",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "user1_id",
				"type": "uint256"
			},
			{
				"name": "user2_id",
				"type": "uint256"
			},
			{
				"name": "prod_id",
				"type": "uint256"
			}
		],
		"name": "transferOwnership_product",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "uid",
				"type": "uint256"
			},
			{
				"name": "uname",
				"type": "string"
			},
			{
				"name": "pass",
				"type": "string"
			},
			{
				"name": "utype",
				"type": "string"
			}
		],
		"name": "userLogin",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_p_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_t_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_u_id",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"name": "_userName",
				"type": "string"
			},
			{
				"name": "_passWord",
				"type": "string"
			},
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_userType",
				"type": "string"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"name": "_product_name",
				"type": "string"
			},
			{
				"name": "_product_cost",
				"type": "uint256"
			},
			{
				"name": "_product_specs",
				"type": "string"
			},
			{
				"name": "_product_review",
				"type": "string"
			},
			{
				"name": "_product_owner",
				"type": "address"
			},
			{
				"name": "_manufacture_date",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tracks",
		"outputs": [
			{
				"name": "_product_id",
				"type": "uint256"
			},
			{
				"name": "_owner_id",
				"type": "uint256"
			},
			{
				"name": "_product_owner",
				"type": "address"
			},
			{
				"name": "_timeStamp",
				"type": "uint256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "view"
	}
];

var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  //selecting metamask first account in rinkeby 
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}

function updateMessageValue() {
  msgString = document.getElementById("value").value;
  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

  contractInstance.update(msgString,{ 
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


