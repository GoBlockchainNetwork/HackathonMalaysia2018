var smartContractAddress = "0x18ab31bf87323512f18243e6e23cb931ff2e63dd";

var abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "addTenFrequency",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idCardNumber",
				"type": "int256"
			}
		],
		"name": "getTaxTotal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_idCardNumber",
				"type": "int256"
			}
		],
		"name": "registerPerson",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_buyerAddress",
				"type": "address"
			},
			{
				"name": "nextTransaction",
				"type": "uint256"
			}
		],
		"name": "simulateTransaction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "intialtransaction",
				"type": "uint256"
			},
			{
				"name": "initialAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "buyerAddress",
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
		"name": "dayCounter",
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
		"inputs": [],
		"name": "frequency",
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
				"name": "",
				"type": "int256"
			}
		],
		"name": "idCorrespondenceAddress",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "persons",
		"outputs": [
			{
				"name": "totalTax",
				"type": "uint256"
			},
			{
				"name": "idCardNumber",
				"type": "int256"
			},
			{
				"name": "purchaseNumber",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tax",
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
		"inputs": [],
		"name": "totalTaxDisplay",
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
		"inputs": [],
		"name": "transaction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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

function submitTransaction() {
  //Assign enterredTransaction the value enterred
  enterredTransaction = parseFloat(document.getElementById("submit").value) *100;
  enterredAddress = document.getElementById("buyerAddress").value;
  currentFrequency = contractInstance.frequency;
  if(!enterredTransaction){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

  contractInstance.simulateTransaction(enterredAddress,enterredTransaction,{
    from: myAccount,
    gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
    gas: "400000", //maximum gas to be spent on this transaction
    //to: textetheraddress,
    //value: textetheramount,
    //data: ""
   }, function(err, result) {
    if (!err){
      console.log('MESSAGE UPDATED IN BLOCKCHAIN SUCCESSFULLY',result);
    }
    else{
      console.log(err);
    }
  });
}

function displayTax(enterredTransaction) {
  contractInstance.tax({
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched calculated tax value from blockchain:',result);
      document.getElementById("tax").innerText=(result/100);
    }
    else{
      console.log(err);
    }
  });
}

function displayFrequency(currentFrequency) {
  contractInstance.frequency({
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched frequency from blockchain:',result);
      document.getElementById("frequency").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

window.addEventListener('load', function() {
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider);
  } else {
    console.log('METAMASK NOT DETECTED');
  }
  // Now you can start your app & access web3js freely:
  initApp();
})
