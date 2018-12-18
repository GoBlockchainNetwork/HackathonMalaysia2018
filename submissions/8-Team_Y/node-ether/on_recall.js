const ethers = require('ethers');
const firebase = require('firebase');

// The Contract interface
let abi = [
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

// Connect to the network
let provider = ethers.getDefaultProvider('rinkeby');

// The address from the above deployment example
let contractAddress = "0x29c923d4a8631bca9c0615fe56836bdc28ca1ee0";

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
let contract = new ethers.Contract(contractAddress, abi, provider);

async function getDrugsCount() {
// Get the current value
let currentValue = await contract.getDrugsCount();

console.log(currentValue);
// "Hello World"
}


async function onRecall() {
    contract.on("recall", async (address) => {
		console.log(address);
		
		let result = await contract.getDrugDetail1(address);
		
		console.log('Fetched msg value from blockchain:',result); 
		let name = result[0];
		let manufacturer = result[1];
		let batchNo = result[2];
		let expiryDate = result[4];
		let manufacturingDate = result[3];
  
		  // sending to firebase database
		  const firebaseConfig = {
			apiKey: "AIzaSyDaA8bERUA8IW06PzzX-Basb8YuQUwLSDU",
			authDomain: "volunteerism-c6c02.firebaseapp.com",
			databaseURL: "https://volunteerism-c6c02.firebaseio.com",
			projectId: "volunteerism-c6c02",
			storageBucket: "volunteerism-c6c02.appspot.com",
			messagingSenderId: "391792999270"
		}
	  
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		}
		const db = firebase.database()
		const update = {
			data1: name,
			data2: manufacturer,
			data3: batchNo,
			data4: Date.now()
		}
		
		let promise = db.ref('testing').update(update)
    });
}

getDrugsCount();

onRecall();


