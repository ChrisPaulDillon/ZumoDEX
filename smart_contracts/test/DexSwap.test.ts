import { expect } from "chai";
import { ethers } from "hardhat";
import { DexSwap, TestTokenDex } from "../typechain-types";

describe("TestTokenDex", function() {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        
        const Token = await ethers.getContractFactory("TestTokenDex");
    
        const testTokenDex = await Token.deploy();
    
        const ownerBalance = await testTokenDex.balanceOf(owner.address);
        const totalSupply = await testTokenDex.totalSupply();

        expect(ownerBalance).to.equal(totalSupply)
})
});

// describe("DexSwap", function () {
//   let dexSwapContract: DexSwap;
//   let testDexTokenContract: TestTokenDex

//   beforeEach(async () => {
//     const TestTokenDex = await ethers.getContractFactory("TestTokenDex");
//     //@ts-ignore
//     testDexTokenContract = await TestTokenDex.deploy();

//     const DexSwap = await ethers.getContractFactory("DexSwap");
//     //@ts-ignore
//     dexSwapContract = await DexSwap.deploy({
//         from: 0x1e43E4e6e65403A6B64Ccb4FBD23306aCEAe9f1B,
//         args: [testDexTokenContract.address],
//         log: true,
//       });
//   });

//     it("should return 5 when given parameters are 2 and 3", async function () {
//       await dexSwapContract.deployed();

//       const sum = await dexSwapContract.buyTokens({ from: "0x1e43E4e6e65403A6B64Ccb4FBD23306aCEAe9f1B", value: web3.utils.toWei('1', 'ether')});
//         console.log(sum)
//       expect(sum).to.be.not.undefined;
//       expect(sum).to.be.not.null;
//       expect(sum).to.be.not.NaN;
//       expect(sum).to.equal(5);
//     });
// });