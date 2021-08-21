const DownBad = artifacts.require("./DownBad.sol");

contract("DownBad", accounts => {

  it("Should return the current balance of the contract", async () => {
      const downBad = await DownBad.deployed();

      // Send ether to smart contract
      await downBad.send(10, {from : accounts[0]});

      const contractBalance = await downBad.getContractBalance();

      assert.equal(contractBalance.toNumber(), 10, "The correct contract balance was not retrieved");
    });

  it("Should return the correct balances", async () => {
    const downBad = await DownBad.deployed();

    // Get downBadIndices from public variable getter
    const balance = await downBad.getBalance(accounts[0]);

    // Get balances from public variable getter
    //const balances = await downBad.balances().call();

    assert.equal(balance.toNumber(), 10, "The correct balance was not stored");
    //assert.equal(balances.length, 2, "The balance was not added");
  });

  it("Should return that an address has joined the DownBad", async () => {
      const downBad = await DownBad.deployed();

      // Send ether to smart contract
      await downBad.send(10, {from : accounts[0]});

      // Add account to DownBad
      await downBad.joinDownBad(accounts[1], {from : accounts[0]});

      // Get downBadIndices from public variable getter
      const isDownBad = await downBad.isDownBad.call(accounts[1]);

      const isNotDownBad = await downBad.isDownBad.call(accounts[2]);
      // Get balances from public variable getter
      //const balances = await downBad.balances().call();

      assert.equal(isDownBad, true, "The address was not added to the DownBad");
      //assert.equal(isNotDownBad, false, "The address was added to the DownBad, but should not have");
    });

  it("Should increase the external balance of a DownBad account by 10", async () => {
      const downBad = await DownBad.deployed();

      const downBadCurrentBalance = await web3.eth.getBalance(accounts[1], function(result){
        return (parseInt(result) / 10**18);
      });

      await downBad.withdraw({from : accounts[1]});

      const downBadNewBalance = await web3.eth.getBalance(accounts[1], function(result){

        return (parseInt(result) / 10**18);
      });

      //var downBadBalanceDifference = downBadNewBalance - downBadCurrentBalance;
      var downBadBalanceDifference = downBadCurrentBalance - downBadNewBalance;

      assert.equal(downBadNewBalance, 20, "The account did not receive the correct ether amount");
    });
});
