ontract VideoProvider {
   struct UserInfo {
        uint Amount;
    }
    mapping (string => UserInfo) AllUsers;
    uint Score = 9;
    string name = "Bob";
    uint256 amount2 = 1000;
    constructor () public {
        if(Score >= 8){ 
        AllUsers[name].Amount = (amount2*1/3) + amount2;
        }
        else if (Score >=6){
            AllUsers[name].Amount = (amount2*1/4) + amount2;
        }pragma solidity ^0.4.25;


contract user{
    struct issuer{
        string name;
        uint ic;
        uint score;
        uint Amount;
        uint TotalAmount;
    }
    
    
    mapping (address => issuer) issuers;
    
    
    address[]public issuerAcc;
    
    event issuerInfo(
        string name,
        uint ic,
        uint score
        );
    event calInfo(
        uint Amount,
        uint TotalAmount
    );
    
    function setissuer(address _address, string _name, uint _ic,uint _score) public {
        var issuer = issuers[_address];
        
        issuer.name = _name;
        issuer.ic = _ic;
        issuer.score = _score;
        
        issuerAcc.push(_address) -1;

        if (_ic == 960825145975 && _address == 0x923e74D1eB331a9ec293AAd5d6d8B4182A14B365){
        _score = 5;
        issuerInfo(_name, _ic, _score);
       }
        else if (_ic == 820220010738 && _address == 0x61c79b727d1bE4E2229dB0b2C8d9e85E81a7cF16){
        _score = 5;
        issuerInfo(_name, _ic, _score);
       }
        else{
            
        }
       
    }
    
    function getissuers() view public returns (address[]){
        return issuerAcc;
    }
    
    function getissuer(address _address) view public returns (string, uint, uint){
        return (issuers[_address].name,issuers[_address].ic,issuers[_address].score);
    }
    
    function countissuers() view public returns (uint){
        return issuerAcc.length;
    }
    
    function calculate (uint _score, uint _Amount, uint _TotalAmount) public {
        
       // issuer.TotalAmount = _TotalAmount;
       // issuer.Amount = _Amount;
       // issuer.score = _score;
       
        _score = 5;
        if(_score >= 7){ 
        _TotalAmount = _Amount - (_Amount*1/3);
        calInfo(_Amount, _TotalAmount);
        }
        else if (_score <5){
        _TotalAmount = (_Amount*1/3) + _Amount;
        calInfo(_Amount, _TotalAmount);
        }
        
    }
    
}