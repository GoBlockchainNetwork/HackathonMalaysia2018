pragma solidity ^0.4.25;

contract Storage{
    struct Details{
        address from1;
        address to;
        address previousHash;
        uint quantity;
        string data;
    }
    
    struct User{
        address ownhash;
    }
    mapping(address=>User) users;
    
    constructor ()payable public{
    }
    mapping (address => Details) basicDetails;
    Details basicDetailsData;
    
    function setGenesisHash(address start,address hashNo)public{
        basicDetails[hashNo].from1=start;
        basicDetails[hashNo].previousHash=0;
        users[start].ownhash=hashNo;
    }
    function setDetails (address from1,address to, uint qty,string data) public returns(address){
        bytes32 tmpData = (keccak256(abi.encodePacked(msg.sender, now)));
        address hashNo = address(tmpData);
        users[to].ownhash = hashNo;
        
        basicDetailsData.from1=from1;
        basicDetailsData.to=to;
        basicDetailsData.quantity=qty;
        basicDetailsData.data=data;
        basicDetailsData.previousHash = users[from1].ownhash;
        
        basicDetails[hashNo]=basicDetailsData;
        return hashNo;
    }
    function getDetails(address hashNo) public constant returns(address from1,address to, uint qty,address prevhash,string data){
        return (basicDetails[hashNo].from1,basicDetails[hashNo].to,
                basicDetails[hashNo].quantity,basicDetails[hashNo].previousHash,
                basicDetails[hashNo].data);
    }
    
}