// address of your smart contract deployed on the blockchain
var smartContractAddress = "0xc38f971a88b7df5008c3f83902c4b5533db53e29";

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
var text;
var text2="tet2";
var flag=false
var speed=0;
var hardBreak=0;
var suddenAcc=0;
var stac=[0,0,0];


  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
  contractInstance.message({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result); 
      // document.getElementById("message").innerText=result;
      text=result;
    }
    else{
      console.log(err);
    }
  });

window.setInterval(function(){
  // if(table.rows.length>1)
  refreshMessageValue();
}, 1000);

// function updateMessageValue() {

     
//   text2 = text +","
//   +document.getElementById("month").value+" "
//   +document.getElementById("id").value+" "+document.getElementById("name").value
//   +" "+document.getElementById("speed").value
//   +" "+document.getElementById("brake").value
//   +" "+document.getElementById("acce").value
//   +" "+document.getElementById("distance").value
//   ;

// msgString=text2;

//   if(!msgString){
//     return window.alert("MESSAGE VALUE IS EMPTY");
//   }

//   contractInstance.setMessage(msgString,{ 
//     from: myAccount,
//     gasPrice: "2000000000", // amount of wei you're paying for every unit of gas
//     gas: "4000000", //maximum gas to be spent on this transaction
//     //to: textetheraddress, 
//     //value: textetheramount,
//     //data: ""
//    }, function(err, result) {
//     if (!err){
//       console.log('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY',result); 
//     }
//     else{
//       console.log(err);
//     }
//   });


// }


var table = document.getElementById("infoTable");

function showTable(first,second,third,forth,fifth,sixth,seventh,eighth){

  var row = table.insertRow(1);

  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

   cell1.innerHTML = first;
   cell2.innerHTML = second;
   cell3.innerHTML = third;
   cell4.innerHTML = forth;
   cell5.innerHTML = fifth;
   cell6.innerHTML = sixth;
   cell7.innerHTML = seventh;
   cell8.innerHTML = eighth;


}

function checkTable(driverID,month){
// var table = document.getElementById("infoTable");
for (var i = 0;i < table.rows.length; i++) {
  
   if(table.rows[i].cells[1].innerHTML==driverID && table.rows[i].cells[0].innerHTML==month ){
     document.getElementById("infoTable").deleteRow(i)
   } 


}
}

function refreshMessageValue(msgString) {

  contractInstance.message({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result); 
      // document.getElementById("message").innerText=result[0];
      first=result.split(",")

      for(var k=0;k<first.length;k++)
      {
        for(var j=k+1;j<first.length;j++)
        if(first[k].split(" ")[1]==first[j].split(" ")[1])
        first.splice(k,1)
      }


      for(var i=0;i<first.length;i++){
      second=first[i].split(" ")
      checkTable(second[1],second[0])
      discount = (second[3]*0.5)+(second[4]*0.2)+(second[5]*0.2)+(second[6]/100*0.1)
      showTable(second[0],second[1],second[2],second[3],second[4],second[5],second[6],"-"+discount)}
    }
    else{
      console.log(err);
    }
  })
}

function getMessageValue(msgString) {

  contractInstance.message({ 
    from: myAccount
   }, function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result); 
      // document.getElementById("message").innerText=result[0];
      first=result.split(",")

      for(var k=0;k<first.length;k++)
      {
        for(var j=k+1;j<first.length;j++)
        if(first[k].split(" ")[1]==first[j].split(" ")[1])
        first.splice(k,1)
      }


      for(var i=0;i<first.length;i++){
      second=first[i].split(" ")
         checkTable(second[1],second[0])
      speed=speed+parseInt(second[3],10)
      hardBreak=hardBreak+parseInt(second[4],10)
      suddenAcc=suddenAcc+parseInt(second[5],10)
      }

      
    }
    else{
      console.log(err);
    }
  })
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
 
})

// function calStatic(){
// // var table = document.getElementById("infoTable");
// counter=0
// while(counter<3)
// {
// for(var j=0;j<3;j++){

// for (var i = 1;i < table.rows.length; i++) {

 
// stac[j]=parseInt(table.rows[i].cells[j+3].innerHTML,10)+stac[j]


// }counter++;
// alert(stac[j])
// }
// }
// }


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


// Draw the chart and set the chart values
function drawChart() {
getMessageValue();
  var data = google.visualization.arrayToDataTable([
  ['Task', 'Hours per Day'],
  ['Speeding Event', speed],
  ['Hard Breaking', hardBreak],
  ['Sudden Accelerate',suddenAcc]


  
]);

  // Optional; add a title and set the width and height of the chart
  var options = {'title':'Driving Behavior Statistics', 'width':550, 'height':400};

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}
