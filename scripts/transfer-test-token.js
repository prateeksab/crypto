// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.


  const hre = require("hardhat");
  async function main () {
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const walletAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
      const toAddress = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8'
      //const Box = await hre.ethers.getContractFactory("MyTestContract");
      const TestContract = await ethers.getContractFactory('MyTestContract');
      const testContract = await TestContract.attach(contractAddress);
      console.log("Initial Token Supply:");
      console.log((await testContract.balanceOf(walletAddress)).toString());
      const amountToTransfer = 100;
      await testContract.transfer(toAddress, amountToTransfer);
      console.log(`Balance: ${toAddress}:`);
      console.log((await testContract.balanceOf(toAddress)).toString());
      console.log(`Balance: ${walletAddress}:`);
      console.log((await testContract.balanceOf(walletAddress)).toString());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
  
  