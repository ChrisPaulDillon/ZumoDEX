import { expect } from "chai";
import { ethers } from "hardhat";
import { DexSwap, TestTokenDex } from "../typechain-types";
import web3 from "web3";
import { ConvertEtherToWei, ConvertTokenBNToNo, ConvertTokenNoToBN } from "../util/TokenHelper";

describe("DexSwap", function () {
  let dexSwapContract: DexSwap;
  let erc20Contract: TestTokenDex;

  beforeEach(async () => {
    const testTokenDex = await ethers.getContractFactory("TestTokenDex");

    //@ts-ignore
    erc20Contract = await testTokenDex.deploy();

    const dexSwap = await ethers.getContractFactory("DexSwap");

    //@ts-ignore
    dexSwapContract = await dexSwap.deploy(erc20Contract.address);
  });

  describe("buyTokens()", async () => {
    it("should allow user to purchase at a 10000 wei to 1 token ratio", async function () {
      //Arrange
      const [owner, addr1] = await ethers.getSigners();
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      const dexTokenBalance = 5000;
      const ownerEtherBal = await ethers.provider.getBalance(owner.address);
      erc20Contract.transfer(dexSwapContract.address, ConvertTokenNoToBN(dexTokenBalance));

      const ethAmount = web3.utils.toWei("10000", "wei");

      //Act
      await dexSwapContract.connect(addr1).buyTokens({ value: ethAmount });

      //Assert
      const userAddBalance = await erc20Contract.balanceOf(addr1.address);
      const dexSwapContractTokenBal = await erc20Contract.balanceOf(dexSwapContract.address);
      const ownerEtherBalUpdated = await ethers.provider.getBalance(owner.address);
      const updatedTotalSales = await dexSwapContract.getTotalSales();

      const ownerEtherBalanceWei = ConvertEtherToWei(ownerEtherBal);
      const ownerEtherBalanceUpdatedWei = ConvertEtherToWei(ownerEtherBalUpdated);

      expect(ConvertTokenBNToNo(userAddBalance)).to.equal(1);
      expect(ConvertTokenBNToNo(dexSwapContractTokenBal)).to.equal(4999);
      expect(Number(ownerEtherBalanceWei)).to.greaterThan(Number(ownerEtherBalanceUpdatedWei));
      expect(Number(updatedTotalSales)).to.equal(1);
    });

    it("should throw an error when the user attempts purchase more tokens than the contract has", async function () {
      //Arrange
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      erc20Contract.transfer(dexSwapContract.address, ConvertTokenNoToBN(1));

      const ERROR_MSG_TEST = "Error: Requested Amount Exceeds Contract Token Amount";

      const ethAmount = web3.utils.toWei("99000", "wei");

      //Act
      //Assert
      await dexSwapContract.buyTokens({ value: ethAmount }).should.be.rejectedWith(ERROR_MSG_TEST);
    });
  });

  describe("sellTokens()", async () => {
    it("should allow user to sell at a rate of 5000 wei to 1 token ratio", async function () {
      //Arrange
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      const [owner] = await ethers.getSigners();

      const dexContractEtherBal = ethers.utils.parseEther("25.0");
      //give the dexSwap contract ether so it can buy tokens back
      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: dexContractEtherBal,
      });

      const tokenAmount = 5;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      const etherBalance = await ethers.provider.getBalance(owner.address);

      //Act

      //Allow dex contract permission to spend tokens
      await erc20Contract.approve(dexSwapContract.address, tokenAmountToSell);
      await dexSwapContract.sellTokens(tokenAmountToSell);

      //Assert
      const etherBalanceUpdated = await ethers.provider.getBalance(owner.address);
      const dexContractEtherBalUpdated = await ethers.provider.getBalance(dexSwapContract.address);
      const dexContractTotalSales = await dexSwapContract.getTotalSales();
      const dexContractTokenBalance = await erc20Contract.balanceOf(dexSwapContract.address);

      // const ownerEtherBalanceWei = ConvertEtherToWei(etherBalance);
      // const ownerEtherBalanceUpdatedWei = ConvertEtherToWei(etherBalanceUpdated);

      expect(ConvertTokenBNToNo(dexContractTokenBalance)).to.equal(tokenAmount);
      expect(Number(dexContractTotalSales)).to.equal(1);
      expect(Number(dexContractEtherBalUpdated)).to.lessThan(Number(dexContractEtherBal));
    });

    it("should throw an error when the user attempts to sell more tokens than they have", async function () {
      //Arrange
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      const [owner, addr1] = await ethers.getSigners();

      const dexContractEtherBal = ethers.utils.parseEther("25.0");
      //give the dexSwap contract ether so it can buy tokens back
      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: dexContractEtherBal,
      });

      const ERROR_MSG = "Error: You do not have this many tokens!";

      const tokenAmount = 1;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      //Act
      //Assert

      //Allow dex contract permission to spend tokens
      await erc20Contract.approve(dexSwapContract.address, tokenAmountToSell);

      //@ts-ignore
      await dexSwapContract.connect(addr1).sellTokens(tokenAmountToSell).should.be.rejectedWith(ERROR_MSG);
    });

    it("should throw an error when the user attempts to sell tokens but there is no ethereum", async function () {
      //Arrange
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      const [owner] = await ethers.getSigners();

      //Give the owner all the tokens
      erc20Contract.transfer(owner.address, await erc20Contract.totalSupply());

      const ERROR_MSG = "Error: Not enough Ether in contract";

      const tokenAmount = 1;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      //Act
      //Assert

      //Allow dex contract permission to spend tokens
      await erc20Contract.approve(dexSwapContract.address, tokenAmountToSell);

      //@ts-ignore
      await dexSwapContract.sellTokens(tokenAmountToSell).should.be.rejectedWith(ERROR_MSG);
    });
  });

  describe("getBuyRate()", async () => {
    it("Should return the buy rate for tokens", async function () {
      //Arrange
      await dexSwapContract.deployed();

      //Act
      const buyRate = await dexSwapContract.getBuyRate();

      //Assert
      expect(buyRate).to.equal(100);
    });
  });

  describe("getSellRate()", async () => {
    it("Should return the sell rate for tokens", async function () {
      //Arrange
      await dexSwapContract.deployed();

      //Act
      const sellRate = await dexSwapContract.getSellRate();

      //Assert
      expect(sellRate.toNumber()).to.equal(50);
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
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      await erc20Contract.transfer(dexSwapContract.address, await erc20Contract.totalSupply());

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

      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      await erc20Contract.transfer(owner.address, await erc20Contract.totalSupply());

      const tokenAmount = 5;
      const tokenAmountToSell = ConvertTokenNoToBN(tokenAmount);

      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: ethers.utils.parseEther("5.0"),
      });

      //Allow dex contract permission to spend tokens
      await erc20Contract.approve(dexSwapContract.address, tokenAmountToSell);

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
      await erc20Contract.deployed();
      await dexSwapContract.deployed();

      const tokenAmount = 5;
      const tokenAmountForContract = ConvertTokenNoToBN(tokenAmount);

      await erc20Contract.transfer(dexSwapContract.address, tokenAmountForContract);

      //Act
      const maximumBuy = await dexSwapContract.getMaximumBuy();

      //Assert
      expect(ConvertTokenBNToNo(maximumBuy)).to.equal(tokenAmount);
    });
  });

  describe("getMaximumSell()", async () => {
    it("Should get the maximum sell exchange rate available to the user", async function () {
      //Arrange
      await erc20Contract.deployed();
      await dexSwapContract.deployed();
      const [owner] = await ethers.getSigners();

      const etherWei = ethers.utils.parseEther("5.0");

      await owner.sendTransaction({
        to: dexSwapContract.address,
        value: etherWei,
      });

      //Act
      const maximumSell = await dexSwapContract.getMaximumSell();

      //Assert
      expect(ConvertEtherToWei(maximumSell)).to.equal(ConvertEtherToWei(etherWei));
    });
  });
});
