require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
const ROPSTEN_PRIVATE_KEY =
  "d5341477ca1029d4e51aa2bef4b68e71455bc740fdb75678d5b6b51fad8a99bf";
const ALCHEMY_API_KEY = "kahhiCXN5G0fg6MfmplVYlgraUFeRpqZ";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",

  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  paths: {
    sources: "contracts",
  },
};
