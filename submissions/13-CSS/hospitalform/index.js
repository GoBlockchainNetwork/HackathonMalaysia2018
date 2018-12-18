// address of your smart contract deployed on the blockchain
var smartContractAddress = "0xc86Cb5A084f690c0ebb2698B5D3381A444791583";

var transaction = "";
// ABI is a JSON formatted list of contract's function and arguments required to create the EVM bytecode required to call the function
var abi = [
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
        "constant": false,
        "inputs": [
            {
                "name": "date",
                "type": "string"
            },
     {
       "name": "hospital_public_address", "type": "string"
     },
     {
       "name": "member_public_address","type": "string"
     },
     {  "name": "bill_number_code","type": "string"
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
                "name": "date",
                "type": "string"
            },
     {
       "name": "hospital_public_address", "type": "string"
     },
     {
       "name": "member_public_address","type": "string"
     },
     {  "name": "bill_number_code","type": "string"
     }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
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
 var msgString1= document.getElementById("bill_number").value;
 var msgString2= document.getElementById("member_public_address").value;
 var msgString3= document.getElementById("date").value;
 var msgString4= document.getElementById("status").value;

 if(!msgString1){
   return window.alert("MESSAGE Bill IS EMPTY");
 }
 if(!msgString2){
	return window.alert("MESSAGE ADDRESS IS EMPTY");
}
if(!msgString3){
	return window.alert("MESSAGE DATE IS EMPTY");
}
if(!msgString4){
	return window.alert("MESSAGE STATUS IS EMPTY");
}

 contractInstance.setMessage(msgString1,msgString2,msgString3,msgString4,{
   from: myAccount,
   gasPrice: "20000000000", // amount of wei you're paying for every unit of gas
   gas: "41000", //maximum gas to be spent on this transaction
   //to: textetheraddress,
   //value: textetheramount,
   //data: ""
  }, function(err, result) {
   if (!err){
     alert('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY',result);
   transaction = result;
   }
   else{
     console.log(err);
   }
 });
}

function refreshMessageValue(msgString) {
 web3.eth.getTransaction(transaction, function(err, result) {
   if (!err){
     var hack = result.input.slice(2, 10);
     var text = web3.toAscii(hack);
     alert(text);
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