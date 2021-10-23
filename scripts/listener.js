  // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
 
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const fs = require('fs')


async function main() {
  // 0. chains are up and running
  const [deployer] = await hre.ethers.getSigners();

//const provider = new ethers.providers.Web3Provider(network.provider)
//console.log(network.provider);
const provider = ethers.getDefaultProvider("ropsten", {
 alchemy : "5IpbXcoSPVdyaeaeTqoQnMcgNUiduR70", 
}
);

  const Testy = await hre.ethers.getContractFactory("MyTestContract");
  const Fee = await hre.ethers.getContractFactory("FeeCollector");

  const amountToTransfer = 100;
  const testchain_addr = "0x2029846f07C3eDc207F662571a76fbaDF1a4bA7F";
  const feecollector_addr = "0xdd26193D819fF7e8c50f055d4809237b8A1Acb86";

  const depl = "0x6b510DD0454CA949eF8c7F31fE538aD56ca7848e";
  const dep = await Fee.attach(depl);
  const fee = await Fee.attach(feecollector_addr);

  const _test = await Testy.attach(testchain_addr);
  //const val = await fee.balanceOf(feecollector_addr); 
  //const _val = ethers.utils.formatUnits(val, 18);
  //console.log(_val.toString());
  const prat = "0x6b510DD0454CA949eF8c7F31fE538aD56ca7848e";
  const amount = "100000000000000000000";

  
  //const tx = await fee.transfer(feecollector_addr, amount, { gasPrice: 20e10});
  //console.log(`Transaction hash: ${tx.hash}`);
  //await fee.transfer(prat, amount);

  abi = [
   "event Transfer(address indexed src, address indexed dst, uint val)",
   "function balanceOf(address account) public view virtual override returns (uint256)"
  ];
  // listen for TTY transfer for my feecollector addr
  const tty = new ethers.Contract(
    testchain_addr, abi, provider
  )
  console.log(`Fee Collectore Address: ${feecollector_addr}`);
  filterTo = tty.filters.Transfer(null, feecollector_addr); 
  
  
  
// EVENT CODE - MAIN THING
  
  tty.on(filterTo, async (from, to, value)  =>  {
    const _valueFormatted = ethers.utils.formatUnits(value, 18);
    console.log(`Addr From : ${from}, Addr To:${to} , Amt:${_valueFormatted.toString()}`);

    console.log(`To FEE addr: ${to} Val: ${await fee.balanceOf(to)}`);
    console.log(`FROM FEE addr: ${from} Val: ${await fee.balanceOf(from)}`);
    data = from.toString();
    console.log(data);
    console.log(value.toString());
    //fs.writeFile('Output.txt',data);
    //const tx = await fee.transfer(from, "10000000000000000000", { gasPrice: 20e10});
    const user_wallet = "0x255e5B933290Be131177ba9548F7D880A5F24707"

    //const tx = await fee.transfer(user_wallet, "10000000000000000000", { gasPrice: 20e10});
    const tx = await fee.transfer(from.toString(), value.toString(), { gasPrice: 20e10});
    console.log(`Transaction hash: ${tx.hash}`);
    //await _test.transfer(from, 100,{ gasPrice: 20e10});
    }
  );
}


main();
 /* .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });*/
