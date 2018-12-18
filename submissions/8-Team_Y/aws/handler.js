'use strict';

module.exports.hello = async (event, context) => {
  const firebase = require('firebase');
  const eventbody = event.body
  let bodyParsed;
  if (typeof eventbody != 'undefined') {
    bodyParsed = JSON.parse(eventbody);
  } else {
    bodyParsed = event
  }

  const mode = bodyParsed.mode
  // get data and response back
  if (mode.toUpperCase() == "SCAN") {

    // address of your smart contract deployed on the blockchain
    var smartContractAddress = "0xa393814f660b3025f7e4cf84ea0f50fef3617cff";

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

    const ethers = require('ethers');
    let provider = ethers.getDefaultProvider('rinkeby');
    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(smartContractAddress, abi, provider);

    async function getData() {
      try {
        const address = await contract.getNthDrugAddress(0)
        const currentValue1 = await contract.getDrugDetail1(address);
        const currentValue2 = await contract.getDrugDetail2(address);
        // get data from blockchain
        const data = {
          name: currentValue1[0],
          manufacturer: currentValue1[1],
          batchNo: currentValue1[2],
          expiryDate: currentValue1[3],
          manufactureDate: currentValue1[4],
          contents: currentValue2[0],
          usage: currentValue2[1],
          sideEffects: currentValue2[2],
          recall: currentValue2[3],
        }
        const dataResponse = {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data
          })
        };
        return dataResponse;
      } catch(err) {
        console.log(err)
      }
    }

    let response
    try {
      response = await getData()
    } catch (err) {
      const errorResponse = {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'error': 'something wrong somewhere'
        })
      }
      response = errorResponse
    }
    return response;
  }
  else if (mode.toUpperCase() == "RECALL") {
    const errorResponse = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'mode': 'you are calling recall api'
      })
    }
    return errorResponse;
  }

  else if (mode.toUpperCase() == "REMINDER") {
    const errorResponse = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'mode': 'you are calling reminder api'
      })
    }
    return errorResponse;
  }

  else {
    const errorResponse = {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'error': 'no mode detected'
      })
    }
    return errorResponse;
  }
};
