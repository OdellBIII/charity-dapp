const DownBad = artifacts.require("./DownBad.sol");

contract("DownBad", accounts => {
  it("Should return the correct balances", async () => {
    const downBad = await DownBad.deployed();

    // Add account to the down bad
    await downBad.send(10, {from : accounts[0]});

    //await downBad.joinDownBad(accounts[0]);

    // Get downBadIndices from public variable getter
    const balance = await downBad.getBalance.call(accounts[0]);

    // Get balances from public variable getter
    //const balances = await downBad.balances().call();

    assert.equal(balance, 10, "The correct balance was not stored");
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
});
