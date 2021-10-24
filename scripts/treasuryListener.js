  // We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
 
const { ethers, network } = require("hardhat");
const hre = require("hardhat");
const fs = require('fs')


async function main() {
 // Setup Link node
const chainLinkProvider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/1af0be4dad73486fbf7c6f1d53bc731a")
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const chainLinkEtheraddr = "0x9326BFA02ADD2366b30bacB125260Af641031331" // from chain link website
const chainLinkUSDCaddr = "0x9211c6b3BF41A10F78539810Cf5c64e1BB78Ec60" // from chain link website

const etherPriceFeed = new ethers.Contract(chainLinkEtheraddr, aggregatorV3InterfaceABI, chainLinkProvider)
const USDCPriceFeed = new ethers.Contract(chainLinkUSDCaddr, aggregatorV3InterfaceABI, chainLinkProvider)

//var result = await etherPriceFeed.latestRoundData();
//console.log("ETHERIUM PRICE: ", result.answer.toString());
 
const bn = ethers.BigNumber.from(10);
const priceDecimals = bn.pow(8);

 // chains are up and running
  const [deployer] = await hre.ethers.getSigners();


const provider = ethers.getDefaultProvider("ropsten", {
 alchemy : "5IpbXcoSPVdyaeaeTqoQnMcgNUiduR70", 
}
);

  const WETH = await hre.ethers.getContractFactory("WETH");
  const USDC = await hre.ethers.getContractFactory("USDC");
  const Fee = await hre.ethers.getContractFactory("FeeCollector");

  const amountToTransfer = 100;
  const WETHchain_addr = "0x63cC13EE12AcBdd89F12d94B20D787c6a7aF4c94"; // change to the address you deployed the WETH contract to
  const usdcChain_addr = "0x191335fC28173CeeDddB9538F883c4efafA94139"; // change to the address you deployed the USDC contract to
  const feecollector_addr = "0xc748ccFed159f51BA50013F9E047516269F832E4"; // change to the address you deployed the FEE COLLECTOR (Treasury) contract to

  const depl = "0x6b510DD0454CA949eF8c7F31fE538aD56ca7848e"; // use your wallet here
  const dep = await Fee.attach(depl);
  const fee = await Fee.attach(feecollector_addr);
  const _usd = await Fee.attach(usdcChain_addr);

  const _weth = await WETH.attach(WETHchain_addr);
  
  abi = [
   "event Transfer(address indexed src, address indexed dst, uint val)",
   "function balanceOf(address account) public view virtual override returns (uint256)"
  ];
  // listen for weth transfer for my feecollector addr
  const weth = new ethers.Contract(
    WETHchain_addr, abi, provider
  )

  // listen for usdc transfer for my feecollector addr
  const usdc = new ethers.Contract(
    usdcChain_addr, abi, provider
  )

  console.log(`Fee Collector Address: ${feecollector_addr}`);
  
  // Setup filter for WETH blockchain
  filterTo = weth.filters.Transfer(null, feecollector_addr); 
  
// EVENT CODE - for WETH
  
  weth.on(filterTo, async (from, to, value)  =>  {

    var result = await etherPriceFeed.latestRoundData();
  console.log("ETHERIUM PRICE: ", result.answer.toString());

    const _valueFormatted = ethers.utils.formatUnits(value, 18);
    console.log(`Addr From : ${from}, Addr To:${to} , Amt:${_valueFormatted.toString()}`);

    console.log(`To FEE addr: ${to} Val: ${await fee.balanceOf(to)}`);
    console.log(`FROM FEE addr: ${from} Val: ${await fee.balanceOf(from)}`);
    
    const coinsToSend = value.mul(result.answer).div(priceDecimals).toString();
    console.log("Number of coins to send: ");
    console.log(coinsToSend);
    
    

    
    const tx = await fee.transfer(from.toString(), coinsToSend, { gasPrice: 20e10});
    console.log(`Transaction hash: ${tx.hash}`);
    
    }
    );

    // Setup filter for USDC blockchain
  filterToUSDC = usdc.filters.Transfer(null, feecollector_addr); 

    // Event code - usdc

usdc.on(filterTo, async (from, to, value)  =>  {

    var result = await USDCPriceFeed.latestRoundData();
  console.log("USDC PRICE: ", result.answer.toString());

    const _valueFormatted = ethers.utils.formatUnits(value, 18);
    console.log(`Addr From : ${from}, Addr To:${to} , Amt:${_valueFormatted.toString()}`);

    console.log(`To FEE addr: ${to} Val: ${await fee.balanceOf(to)}`);
    console.log(`FROM FEE addr: ${from} Val: ${await fee.balanceOf(from)}`);
    
    const coinsToSend = value.mul(result.answer).div(priceDecimals).toString();
    console.log("Number of coins to send: ");
    console.log(coinsToSend);
    
    

    
    const tx = await fee.transfer(from.toString(), coinsToSend, { gasPrice: 20e10});
    console.log(`Transaction hash: ${tx.hash}`);
    
    }
    );
  
  
}


main();
 /* .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });*/
