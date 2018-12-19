pragma solidity ^0.4.25;

contract FarmerContract {

    address public userAddress;
    int [] public review;
    string public userName;
    string public fruitname;
    int  public qty;
    int public price;

    constructor(string name, string fruit, int quantity, int fruitprice) public {
        userAddress = msg.sender;
        userName = name;
        fruitname = fruit;
        qty = quantity;
        price = fruitprice;
        review.push(0);
    }

    struct Farmer {
        address userId;
        string userName;
        string fruitname;
        int qty;
    }

    event registerFarm(address _userId);

    mapping(address => Farmer) public farmers;

    function farmerRegister(string name, string fruitName, int quantity) public{
        farmers[msg.sender] = Farmer({
            userId: msg.sender, userName: name, fruitname: fruitName, qty: quantity
        });
        emit registerFarm(msg.sender);
    }

    function farmerUpdate(address receiver, string fruitName, int quantity) public{
        SupplierContract sc = SupplierContract(receiver);
        sc.updateStock(fruitName, quantity);
    }
    
    function updateReview(int Pts) public{
        review.push(Pts);
    }
    

    
  
    
    
}

contract SupplierContract {

    address public userAddress;
    string userName;
    
    

    constructor(string name) public {
        userAddress = msg.sender;
        userName = name;
    }
    
    struct Stock {
        string fruitName;
        int qty;
    }

    struct Supplier{
        address userId;
        string userName;
    }

    event registerSup(address _userId);
    event new_name(string value);

    mapping(address => Supplier) public suppliers;
    Stock [] public stocks;

    function supplierRegister(string name) public{
        suppliers[msg.sender] = Supplier({
            userId: msg.sender, userName: name
        });
        emit registerSup(msg.sender);
    }

    function supplierReview(address receiver, int pts) public {
        FarmerContract fc = FarmerContract(receiver);
        fc.updateReview(pts);
    }
    
    function updateStock(string name, int qty) public {
        Stock memory temp = Stock({fruitName: name, qty:qty});
        stocks.push(temp);
    }

    function showStock() public returns(string fruitName, int qty){
        Stock memory s = stocks[0];
        return(s.fruitName, s.qty);
    }
    
    function setName(string newName) public {
        userName = newName;
        emit new_name(newName);
    }

}