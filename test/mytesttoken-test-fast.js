const { expect } = require("chai");
const { ethers } = require("hardhat");

const { expectRevert } = require('@openzeppelin/test-helpers');

const totalSupplyBigNumberHex = ethers.BigNumber.from("20000000000000000000000");

describe("MyTestToken state and transactions", function () {
  let MyTestToken, testToken, admin, firstComer; 

  beforeEach(async () => {
    // this is connecting to localhost 8545
    provider = ethers.getDefaultProvider();

    MyTestToken = await ethers.getContractFactory("MyTestContractFast");
    testToken = await MyTestToken.deploy();

    const accounts = await ethers.getSigners();
    admin = accounts[0];
    firstComer = accounts[1];
  });

  it("Should test 'totalSupply' and other default values.", async function () {
    // 2.
    expect(await testToken.symbol()).to.equal("TFY");
    expect(await testToken.name()).to.equal("Testy Fast");
    expect(await testToken.decimals()).to.equal(18);

    const totalSupply = await testToken.totalSupply();
    expect(totalSupply).to.equal(totalSupplyBigNumberHex);
  });

  it("Should test 'transfer' from the owner to first Transfer.", async function () {
    console.log("Admin adress:", admin);
    console.log("firstcomer adress:", firstComer);
    // From a user to another user
    let preAdminBalance = await testToken.balanceOf(admin.address);
    console.log('preadminbalance:',preAdminBalance.toLocaleString());
    const amountToTransfer = 100;
    await testToken.transfer(firstComer.address, amountToTransfer);

    let firstComerBalance = await testToken.balanceOf(firstComer.address);
    const amountDeposit = amountToTransfer * (1 / 100) + amountToTransfer
    expect(firstComerBalance.toString()).to.equal(amountDeposit.toString());
    let adminBalance = await testToken.balanceOf(admin.address);
    console.log('admin Deposit:', adminBalance.toLocaleString());
    const adminRemainingBalance = await testToken.totalSupply() - amountDeposit; 
    console.log('totalsupply:', await testToken.totalSupply());
    console.log(adminRemainingBalance.toLocaleString());
    //expect(adminBalance.toString()).to.equal(adminRemainingBalance.toString());
  });

});
