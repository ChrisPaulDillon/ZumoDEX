import BigNumber from "bignumber.js";

export const BIG_TEN = new BigNumber(10);

export const getBalanceNumber = (balance: BigNumber, decimals = 18) => {
  return getBalanceAmount(balance, decimals).toNumber();
};

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals));
};
