const ethers = require('ethers');

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

async function recall() {
// A Signer from a private key
let privateKey = '0x82a32f80a8506530c4c504da1663ea7d87c3d7289493372982b135f7e9fbcfe6';
let wallet = new ethers.Wallet(privateKey, provider);

// Create a new instance of the Contract with a Signer, which allows
// update methods
let contractWithSigner = contract.connect(wallet);
// ... OR ...
// let contractWithSigner = new Contract(contractAddress, abi, wallet)

// Set a new Value, which returns the transaction
let tx = await contractWithSigner.recallDrug("0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C");

// See: https://ropsten.etherscan.io/tx/0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364
console.log(tx.hash);
// "0xaf0068dcf728afa5accd02172867627da4e6f946dfb8174a7be31f01b11d5364"

// The operation is NOT complete yet; we must wait until it is mined
await tx.wait();
}

recall();


