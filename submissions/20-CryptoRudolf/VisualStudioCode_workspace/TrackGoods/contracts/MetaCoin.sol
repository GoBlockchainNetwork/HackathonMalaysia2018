pragma solidity ^0.4.24;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {

//	pragma solidity ^0.4.25;

//contract supply_Chain {
    uint public _p_id =0;
    uint public _u_id =0;
    uint public _t_id=0;
    struct track_product {
        uint _product_id;
        uint _owner_id;
        address _product_owner;
        uint _timeStamp;
    }
    mapping(uint => track_product) public tracks;
    
	event DEBUGUINT(uint test);

    struct product {
        string _product_name;
        uint _product_cost;
        string _product_specs;
        string _product_review;
        address _product_owner;
        uint _manufacture_date;
       // uint _expiry_date;

		//P:
		uint _msrp;
    }
    
    mapping(uint => product) public products;
    
    struct participant {
        string _userName;
        string _passWord;
        string _userType;
        address _userAddress;
        //uint rating =0;

		//P:
		uint _stake;

    }
    mapping(uint => participant) public participants;
    
    function createParticipant(string name ,string pass ,string utype) public returns (uint){
        uint user_id = _u_id++;
        participants[user_id]._userName = name ;
        participants[user_id]._passWord = pass;
        participants[user_id]._userType = utype;
        participants[user_id]._userAddress = msg.sender;
        
        return user_id;
    }

	function createParticipantAndStake(string name ,string pass ,string utype) public payable returns (uint){
        uint user_id = _u_id++;
        participants[user_id]._userName = name ;
        participants[user_id]._passWord = pass;
        participants[user_id]._userType = utype;
        participants[user_id]._userAddress = msg.sender;
        
		require(msg.value >= 1 ether);
		participants[user_id]._stake = msg.value;
		//throw;
        return user_id;
    }
	//P:
	//function complain(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) external returns(bool) {
	//TODO: Uncomment above...
	function complain(uint user1_id ,uint user2_id, uint prod_id) external returns(bool) {
		//function transferOwnership_product(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) public returns(bool) {
        //require(msg.sender == products[prod_id]._product_owner);

		//p_origin
        participant  p1 = participants[user1_id];
		//p_complainer
        participant  p2 = participants[user2_id];
        //track_product  trk;
        
		//TODO: comment this line out
		//uint track_id = _t_id++;
        
        if(keccak256(p1._userType) == keccak256("Manufacturer") && keccak256(p2._userType)==keccak256("Supplier")){
           /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            
			//tracks[track_id]._product_id =prod_id;
            //tracks[track_id]._owner_id = user2_id;
            //tracks[track_id]._timeStamp = now;
            
			//TODO: get MSRP
			//uint penalty = 100 finney;
			uint penalty = 1500 finney; // a.k.a. 1.5 ether
			//TOTEST:ensure the stake is changed.
			p1._stake -= penalty; 
			msg.sender.transfer(penalty);

            products[prod_id]._product_owner = p2._userAddress;
            
            //tracks[track_id]._product_owner = msg.sender;
            
            return (true);
        }
        if(keccak256(p1._userType) == keccak256("Supplier") && keccak256(p2._userType)==keccak256("Supplier")){
           /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            // tracks[track_id]._product_id =prod_id;
            // tracks[track_id]._owner_id = user2_id;
            // tracks[track_id]._timeStamp = now;
            
            // products[prod_id]._product_owner = p2._userAddress;

            //tracks[track_id]._product_owner = msg.sender;
            
            return (true);
        }
        
        else if(keccak256(p1._userType) == keccak256("Supplier") && keccak256(p2._userType)==keccak256("Customer")){

            /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            // tracks[track_id]._product_id =prod_id;
            // tracks[track_id]._owner_id = user2_id;
            // tracks[track_id]._timeStamp = now;
            
            // products[prod_id]._product_owner = p2._userAddress;
            
            return (true);
        }
        
        return (false);
    
	}

	//P:
	function getStakeBalance(uint user1_id) public returns (uint stakeBalance) {
		//function complain(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) external returns(bool) {
		//function transferOwnership_product(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) public returns(bool) {
        //require(msg.sender == products[prod_id]._product_owner);

		//p_origin
        participant  p1 = participants[user1_id];
		return p1._stake;
	}

    //P:
    function newProduct(uint own_id, string name ,uint p_cost ,string p_specs ,string p_review, uint p_msrp) returns (uint) {
        if(keccak256(participants[own_id]._userType) == keccak256("Manufacturer")) {
            uint product_id = _p_id++;
           
            
            products[product_id]._product_name = name;
            products[product_id]._product_cost = p_cost;
            products[product_id]._product_specs =p_specs;
            products[product_id]._product_review =p_review;
            products[product_id]._manufacture_date = now;
            
            products[product_id]._product_owner = msg.sender;

			//P:
			products[product_id]._msrp = p_msrp;
            
            return product_id;
        }
        
       return 0;
    }
    function getParticipant(uint p_id) returns (string,string,address) {
        return (participants[p_id]._userName,participants[p_id]._userType,participants[p_id]._userAddress);
    }
    function getProduct_details(uint prod_id) public returns (string,uint,string,string,uint){
        return (products[prod_id]._product_name,products[prod_id]._product_cost,products[prod_id]._product_specs,products[prod_id]._product_review,products[prod_id]._manufacture_date);
    }
    modifier onlyOwner(uint pid) {
         if(msg.sender != products[pid]._product_owner ) throw;
         _;
         
     }
     
    function transfer_participant (uint id,uint pid) returns (string,string){
        participant  p1 = participants[id];
        return (p1._userType,p1._userName);
    }
    
    function transferOwnership_product(uint user1_id ,uint user2_id, uint prod_id) onlyOwner(prod_id) public returns(bool) {
        //require(msg.sender == products[prod_id]._product_owner);
        participant  p1 = participants[user1_id];
        participant  p2 = participants[user2_id];
        //track_product  trk;
        uint track_id = _t_id++;
        
        if(keccak256(p1._userType) == keccak256("Manufacturer") && keccak256(p2._userType)==keccak256("Supplier")){
           /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            tracks[track_id]._product_id =prod_id;
            tracks[track_id]._owner_id = user2_id;
            tracks[track_id]._timeStamp = now;
            
            products[prod_id]._product_owner = p2._userAddress;
            
            //tracks[track_id]._product_owner = msg.sender;
            
            return (true);
        }
        if(keccak256(p1._userType) == keccak256("Supplier") && keccak256(p2._userType)==keccak256("Supplier")){
           /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            tracks[track_id]._product_id =prod_id;
            tracks[track_id]._owner_id = user2_id;
            tracks[track_id]._timeStamp = now;
            
            products[prod_id]._product_owner = p2._userAddress;

            //tracks[track_id]._product_owner = msg.sender;
            
            return (true);
        }
        
        else if(keccak256(p1._userType) == keccak256("Supplier") && keccak256(p2._userType)==keccak256("Customer")){

            /*trk._product_id = prod_id;
            //trk._product_owner = p2._address;
            trk._owner_id = user2_id;
            trk._timeStamp= now;*/
            tracks[track_id]._product_id =prod_id;
            tracks[track_id]._owner_id = user2_id;
            tracks[track_id]._timeStamp = now;
            
            products[prod_id]._product_owner = p2._userAddress;
            
            return (true);
        }
        
        return (false);
    }
   /* function getProduct_track(uint prod_id)  public  returns (track_product[]) {
        
        uint track_len = tracks[prod_id].length;
       string[] memory trcks = new string[](track_len);
       for(uint i=0;i<track_len;i++){
           track_product t = tracks[prod_id][i];
           
           trcks.push(t._product_id+""+t._owner_id+""+t._product_owner+""+t._timeStamp);
       }
       // track_product tk =tracks[prod_id];
         return trcks;
    }*/
    function getProduct_trackindex(uint trck_id)  public  returns (uint,uint,address,uint) {
        
        track_product t = tracks[trck_id];
       
         return (t._product_id,t._owner_id,t._product_owner,t._timeStamp);
    }
    
   /* function getProduct_chainLength(uint prod_id) public returns (uint) {
        return tracks.length();
    }*/
    
    function userLogin(uint uid ,string uname ,string pass ,string utype) public returns (bool){
        if(keccak256(participants[uid]._userType) == keccak256(utype)) {
            if(keccak256(participants[uid]._userName) == keccak256(uname)) {
                if(keccak256(participants[uid]._passWord)==keccak256(pass)) {
                    return (true);
                }
            }
        }
        
        return (false);
    }


	// mapping (address => uint) balances;

	// event Transfer(address indexed _from, address indexed _to, uint256 _value);

	// constructor() public {
	// 	balances[tx.origin] = 10000;
	// }

	// function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
	// 	if (balances[msg.sender] < amount) return false;
	// 	balances[msg.sender] -= amount;
	// 	balances[receiver] += amount;
	// 	emit Transfer(msg.sender, receiver, amount);
	// 	return true;
	// }

	// function getBalanceInEth(address addr) public view returns(uint){
	// 	return ConvertLib.convert(getBalance(addr),2);
	// }

	// function getBalance(address addr) public view returns(uint) {
	// 	return balances[addr];
	// }
}
