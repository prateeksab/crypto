// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
async function main () {
    const address = '0x5A1d7eE447682D16B0ee603caAd0B3e11ba1D641';
    //const Box = await hre.ethers.getContractFactory("MyTestContract");
    const Box = await ethers.getContractFactory('MyTestContract');
    const box = await Box.attach(address);
    console.log("Initial Token Supply:");
    console.log((await box.balanceOf('0x6e5D8bc50dFFe230c0057c100d57b8509B8Ba898')).toString());
    const amountToTransfer = 100;
    await box.transfer('0x17F31FAfecD011FEF1d524D8cCfAA29D08f47e1A', amountToTransfer);
    console.log((await box.balanceOf('0x17F31FAfecD011FEF1d524D8cCfAA29D08f47e1A')).toString());
    console.log((await box.balanceOf('0x6e5D8bc50dFFe230c0057c100d57b8509B8Ba898')).toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



