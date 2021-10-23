// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const USDC = await hre.ethers.getContractFactory("USDC");
  const WETH = await hre.ethers.getContractFactory("WETH");

  const Fee = await hre.ethers.getContractFactory("FeeCollector");

  const USDCChain = await USDC.deploy({ gasPrice:20e12});
  const WETHChain = await WETH.deploy({ gasPrice:20e12});

  const feeChain = await Fee.deploy({ gasPrice:20e12});

  await USDCChain.deployed();
  await WETHChain.deployed();
  await feeChain.deployed();
  console.log("USDC Account balance:", (await USDCChain.balanceOf(deployer.address)).toString());
  console.log("WETH Account balance:", (await WETHChain.balanceOf(deployer.address)).toString());
  console.log("FEE Account balance:", (await feeChain.balanceOf(deployer.address)).toString());

  console.log("USDC Chain deployed to:", USDCChain.address);
  console.log("WETH Chain deployed to:", WETHChain.address);
  console.log("fee Chain deployed to:", feeChain.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
