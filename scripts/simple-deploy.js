// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const simple = await hre.ethers.getContractFactory("SimpleContract");
  const simpleChain = await simple.deploy("hello");

  await simpleChain.deployed();
  //console.log("Account balance:", (await simpleChain.balanceOf(deployer.address)).toString());

  console.log("Test Chain deployed to:", simpleChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
