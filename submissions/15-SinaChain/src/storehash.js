import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
const address = '0x1c71af43fa288a22a0aad6e2886bf31b4dcf27d9';
//use the ABI from your contract
const abi = [
	{
	  "constant": true,
	  "inputs": [],
	  "name": "getHash",
	  "outputs": [
		{
		  "name": "x",
		  "type": "string"
		}
	  ],
	  "payable": false,
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "constant": false,
	  "inputs": [
		{
		  "name": "x",
		  "type": "string"
		}
	  ],
	  "name": "sendHash",
	  "outputs": [],
	  "payable": false,
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ]
  export default new web3.eth.Contract(abi, address);