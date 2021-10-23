// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
async function main () {
    const address = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    //const Box = await hre.ethers.getContractFactory("MyTestContract");
    const Box = await ethers.getContractFactory('MyTestContractFast');
    const box = await Box.attach(address);
    console.log("Initial Token Supply:");
    console.log((await box.balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')).toString());
    const amountToTransfer = 100;
    await box.transfer('0x70997970c51812dc3a010c7d01b50e0d17dc79c8', amountToTransfer);
    console.log("Balance: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8:");
    console.log((await box.balanceOf('0x70997970c51812dc3a010c7d01b50e0d17dc79c8')).toString());
    console.log("Balance: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266:");
    console.log((await box.balanceOf('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



