const { ethers } = require("ethers") // for nodejs only

const x = ethers.BigNumber.from(10);
const z = x.pow(20);
const y = ethers.BigNumber.from(3950262524);

const a = z.mul(y).div(x.pow(18));
console.log("X: ", x.toString());
console.log("Y: ", y.toString());
console.log("Z: ", z.toString());
console.log("A: ", a.toString());

