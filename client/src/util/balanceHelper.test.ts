import { ethers } from "ethers";
import { ConvertTokenBalanceFromBN, ConvertTokenNoToBN } from "./balanceHelper";

describe("ConvertTokenNoToBN", () => {
  it("should convert balance to big number with an additional two decimals", () => {
    const tokenBalance = 1000000000;
    const result = ConvertTokenNoToBN(tokenBalance.toString());
    expect(result.toNumber().toString().length).toEqual(tokenBalance.toString().length + 2);
  });
});

describe("ConvertTokenBalanceFromBN", () => {
  it("should convert balance from a BigNumber with two less decimal places", () => {
    const tokenBalanceBN = ethers.BigNumber.from(1000000000);
    const result = ConvertTokenBalanceFromBN(tokenBalanceBN);
    expect(result.toString().length).toEqual(tokenBalanceBN.toString().length - 2);
  });
});
