const { expect } = require("chai");
const { ethers } = require("hardhat");

const { expectRevert } = require('@openzeppelin/test-helpers');

const totalSupplyBigNumberHex = ethers.BigNumber.from("20000000000000000000000");

describe("INFLATION  state and transactions", function () {
  let MyTestToken, testToken, admin, firstComer; 

  beforeEach(async () => {
    // this is connecting to localhost 8545
    provider = ethers.getDefaultProvider();

    MyTestToken = await ethers.getContractFactory("InflationToken");
    testToken = await MyTestToken.deploy();

    const accounts = await ethers.getSigners();
    admin = accounts[0];
    firstComer = accounts[1];
  });

  it("Should test 'name', 'totalSupply' and other default values.", async function () {
    // 2.
    expect(await testToken.symbol()).to.equal("INF");
    expect(await testToken.name()).to.equal("InflationToken");
    expect(await testToken.decimals()).to.equal(18);

    const totalSupply = await testToken.totalSupply();
    expect(totalSupply).to.equal(totalSupplyBigNumberHex);
  });

  it("Should test 'transfer' and updated balances after transfer from the owner to first Wallet.", async function () {
    console.log("Admin adress:", admin.toString());
    console.log("firstcomer adress:", firstComer.toString());
    // From a user to another user
    let preAdminBalance = await testToken.balanceOf(admin.address);
    console.log('preadminbalance:',preAdminBalance.toLocaleString());

    const amountToTransfer = ethers.BigNumber.from(100).pow(10,18);
    await testToken.transfer(firstComer.address, amountToTransfer);

    let firstComerBalance = await testToken.balanceOf(firstComer.address);
    const amountDeposit = amountToTransfer.mul(101).div(100)
    // Check if 1 % inflation works for new user
    expect(firstComerBalance.toString()).to.equal(amountDeposit.toString());

    let adminBalance = await testToken.balanceOf(admin.address);
    console.log('admin Deposit:', adminBalance.toString());

    // Calculate the balance through first principles to check
    let postTransferAdminBalance = preAdminBalance.sub(amountToTransfer)
    let postTransferAdminBalanceWithInflation = postTransferAdminBalance.mul(101).div(100);

    console.log(`Post transfer admin balance with Inflation: ${postTransferAdminBalanceWithInflation.toString()}`);
    
    expect(postTransferAdminBalanceWithInflation.toString()).to.equal(adminBalance.toString());
  });

});