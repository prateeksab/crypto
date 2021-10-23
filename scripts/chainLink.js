const { ethers } = require("ethers") // for nodejs only

//const etherPrice = async function (){
const chainLinkProvider = new ethers.providers.JsonRpcProvider("https://kovan.infura.io/v3/1af0be4dad73486fbf7c6f1d53bc731a")
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const chainLinkEtheraddr = "0x9326BFA02ADD2366b30bacB125260Af641031331"
const etherPriceFeed = new ethers.Contract(chainLinkEtheraddr, aggregatorV3InterfaceABI, chainLinkProvider)
etherPriceFeed.latestRoundData()
    .then((roundData) => {
        // Do something with roundData
        //const latestPrice = roundData.answer.toString();
        console.log("Answer from LOG: ", roundData.answer.toString());
        //return latestPrice;
    });
//return roundData;*/

//const x = priceFeed.latestRoundData().then((rounddata) => {return rounddata.answer});
//const y = x.answer.toString();

let result;
async function chain(){
    var result = await etherPriceFeed.latestRoundData();
    console.log("Answer from function: ", result.answer.toString());
    return result.answer;
};

chain();



//}

//module.exports = etherPrice;