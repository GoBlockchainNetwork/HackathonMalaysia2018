pragma solidity ^0.5.1;
//pragma experimental ABIEncoderV2;
//import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract Ownable {
  address public owner;


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor () internal {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    if (newOwner != address(0)) {
      owner = newOwner;
    }
  }

}

library Strings {

    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);

        uint i;
        uint j;

        for(i=0; i<_baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }

        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i++];
        }

        return string(_newValue);
    }
    
}


// contract CheeTest is Ownable{
    
//     using Strings for string;
    
//     string[] locations;
    
//     string name;
    
//     constructor (string memory _name, string memory _location) public {
//         name = _name;
//         locations = new string[](0);
//         locations.push(_location);
//     }
    
//     function getItem() public view returns (string memory) {
//         string memory s  = name;
//         s = s.concat(",");
//         for(uint i = 0; i < locations.length-1; i++){
//             string memory s1 = locations[i];
//             s = s.concat(s1);
//             s = s.concat(":");
//         }
//         string memory s1 = locations[locations.length-1];
//         s = s.concat(s1);
//         return s;
//     }
    
//     function updateItemLocation(string memory _location) public {
//         locations.push(_location);
//     }
    
//     function getName() public view returns(string memory){
//         return name;
//     }
    
//     function getLength() public view returns(uint){
//         return locations.length;
//     }
    
//     function getLocation(uint index) public view returns(string memory){
//         return locations[index];
//     }
    
// }

contract CheeTest is Ownable{
    
    using Strings for string;
    
    string data;//name,locations
    
    constructor (string memory _data) public {
        data = _data;
    }
    
    function getItem() public view returns (string memory) {
        return data;
    }
    
    function updateItemLocation(string memory _data) public {
        data = _data;
    }
    
}

