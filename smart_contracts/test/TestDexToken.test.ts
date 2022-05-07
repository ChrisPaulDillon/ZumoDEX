import { expect } from "chai";
import { ethers } from "hardhat";

describe("TestTokenDex", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("TestTokenDex");

    const testTokenDexContract = await Token.deploy();

    const ownerBalance = await testTokenDexContract.balanceOf(owner.address);
    const totalSupply = await testTokenDexContract.totalSupply();

    expect(ownerBalance).to.equal(totalSupply);
  });
});
