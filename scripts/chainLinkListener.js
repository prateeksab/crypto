 // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
 
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const fs = require('fs')
const eth = require("ethers");

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


  // CHAIN LINK CODE

   // CHAIN LINK CODE BEGINS
/*
const chainLinkProvider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/1af0be4dad73486fbf7c6f1d53bc731a")
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const chainLinkEtheraddr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
const etherPriceFeed = new ethers.Contract(chainLinkEtheraddr, aggregatorV3InterfaceABI, chainLinkProvider)

var result = await etherPriceFeed.latestRoundData();
console.log("ETHERIUM PRICE: ", result.answer.toString());

const bn = eth.BigNumber.from(10);
const priceDecimals = bn.pow(8);
const feedDecimals = bn.pow(18);
*/



  // EVENT CODE


  tty.on(filterTo, async (from, to, value)  =>  {
    const _valueFormatted = ethers.utils.formatUnits(value, 18);
    console.log(`Addr From : ${from}, Addr To:${to} , Amt:${_valueFormatted.toString()}`);



    //console.log(`To FEE addr: ${to} Val: ${await fee.balanceOf(to)}`);
    //console.log(`FROM FEE addr: ${from} Val: ${await fee.balanceOf(from)}`);
    const data = from.toString();
    console.log(data);
    console.log(value.toString());
    console.log("Printing big number value:")
    console.log(value);

   /* const coinsToSend = value.mul(result.answer).div(priceDecimals).toString();
    console.log("Number of coins to send: ");
    console.log(coinsToSend);
    */
/*
    //Check balance
    try{
    const b = await fee.balanceOf(depl.toString());
        if (b.lt(coinstToSend)){
            const balanceFormatted = eth.utils.formatEther(b);
            console.error(`Insufficient balance to send ${coinsToSend}. You have ${balanceFormatted}`);
        }
    } catch {
        console.error(`Error in checking balance`);
    }

  */  

    //console.error(`Transferring${coinsToSend} ETH to ${from}...`);
    const tx2 = await fee.transfer(from.toString(), value.toString(), { gasPrice: 20e10});
    console.log(`Transaction hash SAME QTY: ${tx2.hash}`);
    //const tx = await fee.transfer(from.toString(), coinsToSend, { gasPrice: 20e10});
    //console.log(`Transaction hash PRICE WEIGHTED QTY: ${tx.hash}`);
    //await _test.transfer(from, 100,{ gasPrice: 20e10});
    }
  );
}


main();