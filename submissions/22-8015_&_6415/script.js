
// address of your smart contract deployed on the blockchain
var smartContractAddress = "0x49E2b310F131C94E9AD8D88a8915a0FF6654cdD7";

// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "newIC",
				"type": "string"
			}
		],
		"name": "setIC",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newLocation",
				"type": "string"
			}
		],
		"name": "setLocation",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newName",
				"type": "string"
			}
		],
		"name": "setName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newRole",
				"type": "string"
			}
		],
		"name": "setRole",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newStatus",
				"type": "string"
			}
		],
		"name": "setStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "initialStatus",
				"type": "string"
			},
			{
				"name": "initialRole",
				"type": "string"
			},
			{
				"name": "initialName",
				"type": "string"
			},
			{
				"name": "initialIC",
				"type": "string"
			},
			{
				"name": "initialLocation",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ic",
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
		"name": "location",
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
		"name": "name",
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
		"name": "role",
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
		"name": "status",
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
var contractInstance;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
  }

function showValue(){
  console.log('account hash ', myAccount);
  document.getElementById("walletHash").innerText=myAccount;

  contractInstance.status({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched status value from blockchain:',result); 
      document.getElementById("status").innerText=result;
    }
    else{
      console.log(err);
    }
  });

  contractInstance.name({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched name value from blockchain:',result); 
      document.getElementById("name").innerText=result;
    }
    else{
      console.log(err);
    }
  });

  contractInstance.role({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched role from blockchain:',result); 
      document.getElementById("role").innerText=result;
    }
    else{
      console.log(err);
    }
  });

  contractInstance.location({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched location from blockchain:',result); 
      document.getElementById("location").innerText=result;
    }
    else{
      console.log(err);
    }
  });

  contractInstance.ic({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched ic from blockchain:',result); 
      document.getElementById("ic").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

function updateValue() {
  statusString = document.getElementById("status").value;
  nameString = document.getElementById("name").value;
  icString = document.getElementById("ic").value;
  roleString = document.getElementById("role").value;
  locationString = document.getElementById("location").value;
  if(!statusString){
    window.alert("STATUS VALUE IS EMPTY");
  }else{
    contractInstance.setStatus(statusString,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('MESSAGE UPDATED IN BLOCKCHAIN SUCCESSFULLY ',result);
      document.getElementById("transactionHash").innerText=result; 
    }
    else{
      console.log(err);
    }
  });
  }

  if(!nameString){
    window.alert("NAME VALUE IS EMPTY");
  }else{
    contractInstance.setName(nameString,{ 
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "41000", //maximum gas to be spent on this transaction
    //to: textetheraddress, 
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('NAME UPDATED IN BLOCKCHAIN SUCCESSFULLY',result); 
    }
    else{
      console.log(err);
    }
  });
  }

  if(!icString){
    window.alert("NAME VALUE IS EMPTY");
  }else{
    contractInstance.setIC(icString,{ 
      from: myAccount,
      gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
      gas: "41000", //maximum gas to be spent on this transaction
      //to: textetheraddress, 
      //value: textetheramount,
      //data: ""
    }, function(err, result) {
      if (!err){
        console.log('IC UPDATED IN BLOCKCHAIN SUCCESSFULLY',result); 
      }
      else{
        console.log(err);
      }
    });
  }

  if(!locationString){
    window.alert("NAME VALUE IS EMPTY");
  }else{
    contractInstance.setLocation(locationString,{ 
      from: myAccount,
      gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
      gas: "41000", //maximum gas to be spent on this transaction
      //to: textetheraddress, 
      //value: textetheramount,
      //data: ""
    }, function(err, result) {
      if (!err){
        console.log('LOCATION UPDATED IN BLOCKCHAIN SUCCESSFULLY',result); 
      }
      else{
        console.log(err);
      }
    });
  }

  if(!roleString){
    window.alert("NAME VALUE IS EMPTY");
  }else{
    contractInstance.setRole(roleString,{ 
      from: myAccount,
      gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
      gas: "41000", //maximum gas to be spent on this transaction
      //to: textetheraddress, 
      //value: textetheramount,
      //data: ""
    }, function(err, result) {
      if (!err){
        console.log('ROLE UPDATED IN BLOCKCHAIN SUCCESSFULLY',result); 
      }
      else{
        console.log(err);
      }
    });
  }
  
  window.location.href = "index.html";
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

