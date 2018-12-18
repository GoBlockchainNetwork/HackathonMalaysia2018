pragma solidity ^0.4.25;
import "./Storage.sol";

contract SupplyChain{
    Storage storing;
    
    constructor(address StorageAdd) payable public {
        storing = Storage(StorageAdd);
    }
    
   function createToken(address receiver, uint amount,string data) public returns(address){
        address hashNo =storing.setDetails(msg.sender,receiver,amount,data);
        storing.setGenesisHash(msg.sender,hashNo);
        return hashNo;
    }
    function giveToken(address receiver, uint amount,string data) public returns(address _hashNo){
       
        _hashNo = storing.setDetails(msg.sender,receiver,amount,data);
        
    }
    function getDetails(address hashNo) public constant returns(address from1,address to, uint qty,address prevhash,string data){
        return storing.getDetails(hashNo);
    }
    function () public payable { 
    //revert();
    }
}