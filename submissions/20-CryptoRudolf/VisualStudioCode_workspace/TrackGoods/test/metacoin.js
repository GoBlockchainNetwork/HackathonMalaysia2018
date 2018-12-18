var MetaCoin = artifacts.require("./MetaCoin.sol");

contract('MetaCoin', function(accounts) {
  
  it("should create 2 participants and stake 5,3 ethers each. ", async () => {
    let instance = await MetaCoin.deployed();

    var account_one = accounts[0];
    var account_two = accounts[1];

    let user_1 = await instance.createParticipantAndStake("name1" ,"pass1" ,"Manufacturer", 
                                                  {from: account_one,gas: 3000000, value: 5000000000000000000});
    //console.log(user_1);

    let user_2 = await instance.createParticipantAndStake("name2" ,"pass2" ,"Supplier", 
                                                  {from: account_two,gas: 3000000, value: 3000000000000000000});
    //console.log(user_1);
    
    let stakeBal1 = await instance.getStakeBalance.call(0);
    assert.equal(stakeBal1.valueOf(), 5000000000000000000);
    console.log("stakebal1: "+stakeBal1.valueOf() / 1e18);

    let endStakeBal2 = await instance.getStakeBalance.call(1);
    assert.equal(endStakeBal2.valueOf(), 3000000000000000000);
    console.log("endStakeBal2: "+endStakeBal2.valueOf() / 1e18);

    //Create new product
    //5 ether msrp...
    let prod_id = await instance.newProduct.call(0, "product1" ,10 ,"spec1" ,"review1", 5000000000000000000);
    assert(prod_id.valueOf(), 0);

    console.log("prod_id:" + prod_id);
    
    //let success = await instance.transferOwnership_product(0 ,1, 0);

    //complain
    let success2 = await instance.complain(0 ,1,0, {from:account_two});

    let endStakeBal1 = await instance.getStakeBalance.call(0);
    //assert.equal(endStakeBal1.valueOf(), 5000000000000000000);
    console.log("endStakeBal1: "+endStakeBal1.valueOf() / 1e18);

    let stakeBal2 = await instance.getStakeBalance.call(1);
    //assert.equal(stakeBal2.valueOf(), 3000000000000000000);
    console.log("stakebal2: "+stakeBal2.valueOf() / 1e18);


    //check stake reduced and money sent out?
    //let initNum = await instance.complain(1, 0, 0);
    //assert.equal(initNum.valueOf(), 1111);
 });

//  it("should set the default flag to US for CryptoSanta. ", async () => {
//    let instance = await CryptoSanta.deployed();
//    let flagCode = await instance.getCurrentFlag();
//    assert.equal(flagCode, "US");
//  });


//  /*it("should change the initnum to 3333!! after calliing changeInitNum(). ", async () => {
//    let instance = await CryptoSanta.deployed();
//    //let newCode = "AU";
//    let newCode = 3333;
//    let retBool = await instance.changeInitNum();
//    //await instance.changeInitNum.call();
   
//    //assert.equal(retBool, true);
   

//    //TODO: SOME FUNKY STUFF GOING ON HERE. CAN WORK ON MEW MANUAL DEPLOY BUT NOT HERE...?
//    //RESOLVED: never use instance.methodname.call() unless its a pure viewer.
//    //          call setters directly by using instance.methodname();
//    let initNum = await instance.getInitialized.call();
//    assert.equal(initNum.valueOf(), 3333);

//  });*/


//  it("should change the flag to AU after calliing changeFlag(). ", async () => {
//    let instance = await CryptoSanta.deployed();
//    let newFlagCode = "AU";

//    let initNum = await instance.getInitialized();

//    let retBool = await instance.changeFlag(newFlagCode);
//    //assert.equal(retBool, true);
   
//    let initNumNew = await instance.getInitialized();
//    let expectedVal = initNum.toNumber();
//    expectedVal = expectedVal + 1;
//    assert.equal(initNumNew.valueOf(), expectedVal);
//    //LEARNING: what is the difference between .valueOf() and .toNumber()??????
//    //console.log(initNumNew.valueOf());
//    //console.log(initNumNew.toNumber());
   
//    let flagCode = await instance.getCurrentFlag();
//    assert.equal(flagCode, "AU");

//  });

//  it("should get the default name of token which is A-CryptoSanta ", async () => {
//    let instance = await CryptoSanta.deployed();
   
//    let tokenName = await instance.getName();
//    assert.equal(tokenName, "SantaCoin");

//  });

//  //TODO: uncomment this
//  it("should change the song to allstar", async () => {
//    let instance = await CryptoSanta.deployed();
   
//    // let success = await instance.changeSong(
//    //   "allstar",
//    //   false,
//    //   "SC_link",
//    //   false,
//    //   "LF_link",
//    //   true,
//    //   "track/22c2pt75xtnDddA5Zlm0yy",
//    //   true,
//    //   "L_jWHffIx5E"
//    // );
//    let success = await instance.changeSong(
//      "allstar",
//      "L_jWHffIx5E",
//      true
//    );
//    let ytlink = await instance.getSongYT();
//    assert.equal(ytlink, "L_jWHffIx5E");
//    //console.log(ytlink);

//  });
 

// /*  it("should sign up one secret santa", async () => {
//    let instance = await CryptoSanta.deployed();
//    let num = await instance.get_current_santa_counter();
//    let starting_counter = num.toNumber();
//    let password = "secretsantaforthecryptoworld";
//    let success = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id1 santa0",
//      "facebook",
//      "helloworld on nov 21 2018",
//      1,
//      true,
//      password);
//    num = await instance.get_current_santa_counter();

//    let ending_counter = num.toNumber();
//    //TODO: maybe the issue is here....???
//    assert.equal(starting_counter + 1, ending_counter);
//    //console.log("santa id: " + success);
//    console.log("santa_counter: " + ending_counter);

//  });
// */

//  it("should sign up one secret santa", async () => {
//    let instance = await CryptoSanta.deployed();
//    let num = await instance.get_current_santa_counter();
//    let starting_counter = num.toNumber();
//    let password = "secretsantaforthecryptoworld";
//    // let success = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id1 santa0",
//    //   "facebook",
//    //   "helloworld on nov 21 2018",
//    //   1,
//    //   true,
//    //   password);
//    let success = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id1 santa1",
//      "facebook",
//      "helloworld on nov 21 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk");
   
//    num = await instance.get_current_santa_counter();
//    let ending_counter = num.toNumber();
//    //TODO: maybe the issue is here....???
//    assert.equal(starting_counter + 1, ending_counter);
//    //console.log("santa id: " + success);
//    console.log("end santa_counter: " + ending_counter);
   
//  });


//  it("should sign up three more secret santas wrongly from acc0", async () => {
//    let instance = await CryptoSanta.deployed();
//    let num = await instance.get_current_santa_counter();
//    let starting_counter = num.toNumber();
//    //TODO: change this back to correct password
//    let password = "secretsantaforthecryptoworld";
   
//    let success2 = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id2 santa2",
//      "facebook",
//      "helloworld on nov 21 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk");
//    let success3 = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id3 santa3",
//      "facebook",
//      "helloworld on nov 21 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk");
//    let success4 = instance.USER_FUNCTION_sign_up_as_secret_santa( "reddit id4 santa4",
//      "reddit",
//      "narwhal on nov 21 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk");
//    num = await instance.get_current_santa_counter();
   
//    //console.log("santa id: " + success2.toNumber());
//    //console.log("santa id: " + success3.toNumber());
//    //console.log("santa id: " + success4.toNumber());

//    let ending_counter = num.toNumber();
//    assert.equal(starting_counter + 3, ending_counter);
   
//    console.log("end santa_counter: " + ending_counter);

//  });

//  it("should sign up three more secret santas from acc5,6,7", async () => {
//    let instance = await CryptoSanta.deployed();
//    let num = await instance.get_current_santa_counter();
//    let starting_counter = num.toNumber();
   
//    let account_five = accounts[5];
//    let account_six = accounts[6];
//    let account_seven = accounts[7];

//    let success2 = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id5 santa5",
//      "facebook",
//      "helloworld on dec 12 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk",
//      {from: account_five});
//    let success3 = instance.USER_FUNCTION_sign_up_as_secret_santa( "facebook id6 santa6",
//      "facebook",
//      "helloworld on dec 12 2018",
//      1,
//      true,
//      "pastebin.com/rA8q1BQk",
//      {from: account_six});
//    let success4 = instance.USER_FUNCTION_sign_up_as_secret_santa( "reddit id7 santa7",
//      "reddit",
//      "narwhal on dec 12 2018",
//      1,
//      true, 
//      "pastebin.com/rA8q1BQk",
//      {from: account_seven});
//    num = await instance.get_current_santa_counter();
   
//    let sId5 = await instance.USER_EXTRA_FUNCTION_get_my_santa_id.call(account_five);
//    let nId5 = sId5.toNumber();
//    console.log("santa id: " + nId5);
//    assert.equal(nId5, 5);

//    let sId6 = await instance.USER_EXTRA_FUNCTION_get_my_santa_id.call(account_six);
//    let nId6 = sId6.toNumber();
//    console.log("santa id: " + nId6);
//    assert.equal(nId6, 6);

//    let sId7 = await instance.USER_EXTRA_FUNCTION_get_my_santa_id.call(account_seven);
//    let nId7 = sId7.toNumber();
//    console.log("santa id: " + nId7);
//    assert.equal(nId7, 7);
   
//    let ending_counter = num.toNumber();
//    assert.equal(starting_counter + 3, ending_counter);
   
//    console.log("end santa_counter: " + ending_counter);

//  });


});
