pragma solidity ^0.4.17;
//the version

contract Lottery{
    //user information
    struct user
    {
        address userAddress;
        uint coinBuy;
        uint[] guess;
        uint priority;
        uint ID;
    }

    //list of userAddress
    mapping(address => user) public users;

    address[] public userAddress;
    address public lotterySupplier;
    bytes32 WinningNumSha3;
    uint public priorityitLimit = 5;
    uint public BetETH = 1;

    // constructor function
   function Lottery(uint _Guess)
    {
        lotterySupplier = msg.sender;
        WinningNumSha3 = keccak256(_Guess);
    }

    //see the number of coinBuy
    function userCoin(address _user) view public returns(uint)
    {
        return users[_user].coinBuy;
    }
    //see the guess number
    function userGuess(address _user) view public returns(uint[]){
        return users[_user].guess;
    }
    //see the user ID
    function userID(address _user) view public returns(uint){
        return users[_user].ID;
    }
    //see the priority
    function userPriority(address _user) view public returns(uint)
    {
        return users[_user].priority;
    }
    //see the WinningNum
    function winningGuess() view public returns(bytes32){
        return WinningNumSha3;
    }
    function debug() view public returns (uint)
    {
        return userAddress.length;
    }
    // to add a new user
    function makeUser() public{
        users[msg.sender].userAddress = msg.sender;
        users[msg.sender].coinBuy = 0;
        userAddress.push(msg.sender);
    }

    //add coin to user that call contract
    function addCoinsAndPriority() public{
        uint current = 0;
        uint coinsToAdd = 3;

        for(uint i = 0;i < userAddress.length;i++)
        {
            if(userAddress[i]==msg.sender)
            {
                current = 1;
                break;
            }
        }
        // adding coin if the user appear in the array
        if(current==1)
        {
            users[msg.sender].coinBuy += coinsToAdd;
            users[msg.sender].priority += 2;
        }
    }

    //to add user guesses
    function getGuess(uint _userGuess)
    {
        require(_userGuess<100000 && users[msg.sender].coinBuy>0 && users[msg.sender].priority > priorityitLimit && BetETH>address(this).balance && BetETH>lotterySupplier.balance);
        users[msg.sender].guess.push(_userGuess);
        users[msg.sender].coinBuy--;
    }

    function closeGame() returns(address){
        require(lotterySupplier==msg.sender);
        return winnerAddress();
    }
    // returns the address of the winner
    function winnerAddress() returns(address){
        for(uint i = 0;i < userAddress.length;i++)
        {
            user _user = users[userAddress[i]];

            for(uint j = 0;j < _user.guess.length;j++)
            {
                if(keccak256(_user.guess[j])==WinningNumSha3)
                {
                    return _user.userAddress;
                }
            }
        }
        //the owner win if no one guess sucessfully
        return lotterySupplier;
    }

    // send 60% of the ETH in contract
    function getPrice() returns (uint){
        require(lotterySupplier == msg.sender);
        address winner = winnerAddress();
        if(lotterySupplier == winner){
            lotterySupplier.transfer(address(this).balance);
        }else
        {
            //returns the half the balance of the contract
            uint toTransfer = BetETH;
            winner.transfer(toTransfer);
            lotterySupplier.transfer(address(this).balance -  BetETH);
            //transfer
        }
        return address(this).balance;
    }

}
