// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const WETH = await hre.ethers.getContractFactory("WETH");
  const USDC = await hre.ethers.getContractFactory("USDC");
  const Fee = await hre.ethers.getContractFactory("FeeCollector");

  const wethChain = await WETH.deploy({ gasPrice:20e10});
  const USDCChain = await USDC.deploy({ gasPrice:20e10});
  const feeChain = await Fee.deploy({ gasPrice:20e10});

  await wethChain.deployed();
  await USDCChain.deployed();
  await feeChain.deployed();
  console.log("WETH Account balance:", (await wethChain.balanceOf(deployer.address)).toString());
  console.log("USDC Account balance:", (await USDCChain.balanceOf(deployer.address)).toString());
  console.log("FEE Account balance:", (await feeChain.balanceOf(deployer.address)).toString());

  console.log("WETH Chain deployed to:", wethChain.address);
  console.log("USDC Chain deployed to:", USDCChain.address);
  console.log("fee Chain deployed to:", feeChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
