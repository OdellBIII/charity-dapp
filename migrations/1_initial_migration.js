const Migrations = artifacts.require("Migrations");
const DownBad = artifacts.require("DownBad");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(DownBad);
};
