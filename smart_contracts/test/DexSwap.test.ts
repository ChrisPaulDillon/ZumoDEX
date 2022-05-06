import { expect } from "chai";
import { ethers } from "hardhat";
import { DexSwap, TestTokenDex } from "../typechain-types";
import web3 from "web3";

describe("TestTokenDex", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    //console.log(owner);

    const Token = await ethers.getContractFactory("TestTokenDex");

    const testTokenDexContract = await Token.deploy();

    const ownerBalance = await testTokenDexContract.balanceOf(owner.address);
    const totalSupply = await testTokenDexContract.totalSupply();

    expect(ownerBalance).to.equal(totalSupply);
  });
});

describe("DexSwap", function () {
  let dexSwapContract: DexSwap;
  let testDexTokenContract: TestTokenDex;

  //TODO
  // before(async () => {
  //   const [owner] = await ethers.getSigners();

  // })

  beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const testTokenDex = await ethers.getContractFactory("TestTokenDex");
    //@ts-ignore
    testDexTokenContract = await testTokenDex.deploy();
    const dexSwap = await ethers.getContractFactory("DexSwap");

    //@ts-ignore
    dexSwapContract = await dexSwap.deploy(testDexTokenContract.address);
  });

  it("should allow user to purchase at a 1000 wei to 1 token ratio", async function () {
    //Arrange
    await testDexTokenContract.deployed();
    await dexSwapContract.deployed();

    testDexTokenContract.transfer(
      dexSwapContract.address,
      await testDexTokenContract.totalSupply()
    );

    const [owner] = await ethers.getSigners();
    const ethAmount = web3.utils.toWei("10000", "wei");

    const tokenReceivedAmount = Number(ethAmount) / 10000;

    //Act
    await dexSwapContract.buyTokens({ value: ethAmount });

    //Assert
    const ownerBalance = await testDexTokenContract.balanceOf(owner.address);

    var userTokenBalance = ownerBalance.toNumber();
    console.log(userTokenBalance);

    expect(userTokenBalance).to.equal(tokenReceivedAmount);
  });

  it("should allow user to sell at a rate of 5000 wei to 1 token ratio", async function () {
    //Arrange
    await testDexTokenContract.deployed();
    await dexSwapContract.deployed();

    const [owner] = await ethers.getSigners();

    //Give the owner all the tokens
    testDexTokenContract.transfer(
      owner.address,
      await testDexTokenContract.totalSupply()
    );

    //give the dexSwap contract ether so it can buy tokens back
    const transactionHash = await owner.sendTransaction({
      to: dexSwapContract.address,
      value: ethers.utils.parseEther("5.0"),
    });

    //Act
    // const provider = ethers.provider;
    // const test = await provider.getBalance(dexSwapContract.address);
    // console.log(test);

    // console.log(test.toNumber());

    // const test = dexSwapContract.provider.getBalance(dexSwapContract.address);
    // console.log(test);

    // await dexSwapContract.sellTokens(web3.utils.toWei(1, "ether"));

    // const ownerBalance = await testDexTokenContract.balanceOf(owner.address);

    // var userTokenBalance = ownerBalance.toNumber();
    // console.log(userTokenBalance);

    // expect(userTokenBalance).to.equal(tokenReceivedAmount);
  });

  it("Should return the buy rate for tokens", async function () {
    //Arrange
    await dexSwapContract.deployed();

    //Act
    const buyRate = await dexSwapContract.getBuyRate();

    //Assert
    expect(buyRate.toNumber()).to.equal(10000);
  });

  it("Should return the sell rate for tokens", async function () {
    //Arrange
    await dexSwapContract.deployed();

    //Act
    const sellRate = await dexSwapContract.getSellRate();

    //Assert
    expect(sellRate.toNumber()).to.equal(5000);
  });

  it("Should get the inital total sales", async function () {
    //Arrange
    await dexSwapContract.deployed();

    //Act
    const totalSales = await dexSwapContract.getTotalSales();

    //Assert
    expect(totalSales.toNumber()).to.equal(0);
  });

  it("Should get the total sales after a user has purchased some tokens", async function () {
    //Arrange
    await testDexTokenContract.deployed();
    await dexSwapContract.deployed();

    await testDexTokenContract.transfer(
      dexSwapContract.address,
      await testDexTokenContract.totalSupply()
    );

    const ethAmount = web3.utils.toWei("10000", "wei");

    //Act
    await dexSwapContract.buyTokens({ value: ethAmount });

    const totalSales = await dexSwapContract.getTotalSales();

    //Assert
    expect(totalSales.toNumber()).to.equal(1);
  });

  it("Should get the total sales after a user has sold tokens for ethereum", async function () {
    //Arrange
    const [owner] = await ethers.getSigners();

    await testDexTokenContract.deployed();
    await dexSwapContract.deployed();

    await testDexTokenContract.transfer(
      owner.address,
      await testDexTokenContract.totalSupply()
    );

    const tokenAmountToSell = web3.utils.toWei("1", "ether");

    console.log(tokenAmountToSell);

    const transactionHash = await owner.sendTransaction({
      to: dexSwapContract.address,
      value: ethers.utils.parseEther("5.0"),
    });

    //Act
    await dexSwapContract.sellTokens(tokenAmountToSell);

    const totalSales = await dexSwapContract.getTotalSales();

    //Assert
    expect(totalSales.toNumber()).to.equal(1);
  });
});
