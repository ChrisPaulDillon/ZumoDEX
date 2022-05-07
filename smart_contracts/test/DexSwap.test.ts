import { expect } from "chai";
import { ethers } from "hardhat";
import { DexSwap, TestTokenDex } from "../typechain-types";
import web3 from "web3";
import { ConvertTokenBNToNo, ConvertTokenNoToBN } from "../util/TokenHelper";

describe("DexSwap", function () {
  let dexSwapContract: DexSwap;
  let testDexTokenContract: TestTokenDex;

  beforeEach(async () => {
    const [owner] = await ethers.getSigners();

    const testTokenDex = await ethers.getContractFactory("TestTokenDex");
    //@ts-ignore
    testDexTokenContract = await testTokenDex.deploy();
    const dexSwap = await ethers.getContractFactory("DexSwap");

    //@ts-ignore
    dexSwapContract = await dexSwap.deploy(testDexTokenContract.address);
  });

  describe("buyTokens()", async () => {
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

      expect(userTokenBalance).to.equal(tokenReceivedAmount);
    });
  });

  describe("sellTokens()", async () => {
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
      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: ethers.utils.parseEther("1.0"),
      });

      const tokenAmount = 1;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      const etherBalanceBefore = await ethers.provider.getBalance(
        owner.address
      );

      //Act

      //Allow dex contract permission to spend tokens
      await testDexTokenContract.approve(
        dexSwapContract.address,
        tokenAmountToSell
      );

      const result = await dexSwapContract.sellTokens(tokenAmountToSell);

      const etherBalance = await ethers.provider.getBalance(owner.address);

      const etherBefore = ethers.utils.formatEther(etherBalanceBefore);
      const etherAfter = ethers.utils.formatEther(etherBalance);

      const dexContractTokenBalance = await testDexTokenContract.balanceOf(
        dexSwapContract.address
      );

      expect(dexContractTokenBalance).to.equal(tokenAmountToSell);
    });

    it("should throw an error when the user attempts to sell tokens but there is no ethereum", async function () {
      //Arrange
      await testDexTokenContract.deployed();
      await dexSwapContract.deployed();

      const [owner] = await ethers.getSigners();

      //Give the owner all the tokens
      testDexTokenContract.transfer(
        owner.address,
        await testDexTokenContract.totalSupply()
      );

      const ERROR_MSG = "Error: Not enough Ether in contract";

      const tokenAmount = 1;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      //Act

      //Allow dex contract permission to spend tokens
      await testDexTokenContract.approve(
        dexSwapContract.address,
        tokenAmountToSell
      );

      //@ts-ignore
      await dexSwapContract
        .sellTokens(tokenAmountToSell)
        .should.be.rejectedWith(ERROR_MSG);
    });
  });

  describe("getBuyRate()", async () => {
    it("Should return the buy rate for tokens", async function () {
      //Arrange
      await dexSwapContract.deployed();

      //Act
      const buyRate = await dexSwapContract.getBuyRate();

      //Assert
      expect(buyRate.toNumber()).to.equal(10000);
    });
  });

  describe("getSellRate()", async () => {
    it("Should return the sell rate for tokens", async function () {
      //Arrange
      await dexSwapContract.deployed();

      //Act
      const sellRate = await dexSwapContract.getSellRate();

      //Assert
      expect(sellRate.toNumber()).to.equal(5000);
    });
  });

  describe("getTotalSales()", async () => {
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

      const tokenAmount = 5;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: ethers.utils.parseEther("5.0"),
      });

      //Allow dex contract permission to spend tokens
      await testDexTokenContract.approve(
        dexSwapContract.address,
        tokenAmountToSell
      );

      //Act
      await dexSwapContract.sellTokens(tokenAmountToSell);

      const totalSales = await dexSwapContract.getTotalSales();

      //Assert
      expect(totalSales.toNumber()).to.equal(1);
    });
  });

  describe("getMaximumBuy()", async () => {
    it("Should get the maximum buy exchange rate available to the user", async function () {
      //Arrange
      await testDexTokenContract.deployed();
      await dexSwapContract.deployed();

      const tokenAmount = 5;
      const tokenAmountForContract = ethers.utils.parseUnits(
        tokenAmount.toString(),
        2
      );

      await testDexTokenContract.transfer(
        dexSwapContract.address,
        tokenAmountForContract
      );

      //Act
      const maximumBuy = await dexSwapContract.getMaximumBuy();

      //Assert
      expect(ConvertTokenBNToNo(maximumBuy)).to.equal(tokenAmount);
    });
  });

  describe("getMaximumBuy()", async () => {
    it("Should get the maximum buy exchange rate available to the user", async function () {
      //Arrange
      await testDexTokenContract.deployed();
      await dexSwapContract.deployed();

      const tokenAmount = 5;
      const tokenAmountForContract = ethers.utils.parseUnits(
        tokenAmount.toString(),
        2
      );

      await testDexTokenContract.transfer(
        dexSwapContract.address,
        tokenAmountForContract
      );

      //Act
      const maximumBuy = await dexSwapContract.getMaximumBuy();

      //Assert
      expect(ConvertTokenBNToNo(maximumBuy)).to.equal(tokenAmount);
    });
  });
});
