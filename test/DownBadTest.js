const DownBad = artifacts.require("./DownBad.sol");

contract("DownBad", accounts => {

  it("Should return that an address is not in the DownBad", async () => {
    const downBad = await DownBad.deployed();
    const isDownBadZero = await downBad.isDownBad.call(accounts[0]);
    const isDownBadOne = await downBad.isDownBad.call(accounts[1]);

    assert.equal(isDownBadZero, false, "The address is considered DownBad when it was never added");
    assert.equal(isDownBadOne, false, "The address is considered DownBad when it was never added");
  });

  it("Should return that an address has joined the DownBad", async () => {
      const downBad = await DownBad.deployed();

      // Send ether to smart contract
      //await downBad.send(10, {from : accounts[0]});

      // Add account to DownBad
      await downBad.joinDownBad(accounts[1], {from : accounts[0]});

      // Get downBadIndices from public variable getter
      const isDownBad = await downBad.isDownBad.call(accounts[1]);

      const isNotDownBad = await downBad.isDownBad.call(accounts[2]);
      // Get balances from public variable getter
      //const balances = await downBad.balances().call();

      assert.equal(isDownBad, true, "The address was not added to the DownBad");
      assert.equal(isNotDownBad, false, "The address was added to the DownBad, but should not have");
    });

  it("Should return that an address has been removed from the DownBad", async () => {
      const downBad = await DownBad.deployed();

      // Add account to DownBad
      await downBad.joinDownBad(accounts[1], {from : accounts[0]});

      //Remove account from DownBad
      await downBad.removeDownBad(accounts[1], {from : accounts[0]});

      // Get downBadIndices from public variable getter
      const isDownBad = await downBad.isDownBad.call(accounts[1]);

      const isNotDownBad = await downBad.isDownBad.call(accounts[2]);

      assert.equal(isDownBad, false, "The address was not removed from the DownBad");
      assert.equal(isNotDownBad, false, "The address was added to the DownBad, but should not have");
    });

  it("Should increase the external balance of a DownBad account by 10", async () => {
      const downBad = await DownBad.deployed();

      // Add Account 1 to DownBad
      await downBad.joinDownBad(accounts[1], {from : accounts[0]});
      // Add Account 2 to downBad
      await downBad.joinDownBad(accounts[2], {from : accounts[0]});

      // Get account 1's balance
      const initialBalanceStr = await web3.eth.getBalance(accounts[1]);
      const initialBalance = parseInt(initialBalanceStr.slice(initialBalanceStr.length - 2, initialBalanceStr.length), 10);

      // Get account 2's balance
      const initialBalanceStrTwo = await web3.eth.getBalance(accounts[2]);
      const initialBalanceTwo = parseInt(initialBalanceStr.slice(initialBalanceStr.length - 2, initialBalanceStr.length), 10);

      // Send wei to contract
      await downBad.sendTransaction({from : accounts[0], value : 10});

      // Get account 1's new balance
      const finalBalanceStr = await web3.eth.getBalance(accounts[1]);
      const finalBalance = parseInt(finalBalanceStr.slice(finalBalanceStr.length - 2, finalBalanceStr.length), 10);

      // Get account 2's new balance
      const finalBalanceStrTwo = await web3.eth.getBalance(accounts[2]);
      const finalBalanceTwo = parseInt(finalBalanceStr.slice(finalBalanceStr.length - 2, finalBalanceStr.length), 10);

      // Take difference between balances
      const balanceDifferenceOne = finalBalance - initialBalance;
      const balanceDifferenceTwo = finalBalanceTwo - initialBalanceTwo;
      console.log(balanceDifferenceOne);
      console.log(balanceDifferenceTwo);

      // Check that the difference is what is expected
      assert.equal(balanceDifferenceOne, 5, "Account 1 did not receive the correct ether amount");
      assert.equal(balanceDifferenceTwo, 5, "Account 2 did not receive the correct ether amount");
    });
});
