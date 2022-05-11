import { useWeb3React } from "@web3-react/core";
import { getERC20Contract } from "contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import { ethers } from "ethers";
import { useCallback } from "react";

export const useApprove = () => {
  const { account } = useWeb3React();
  const erc20Contract = getERC20Contract(CONTRACT_ERC20);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await erc20Contract.approve(CONTRACT_DEXSWAP, ethers.constants.MaxUint256).send({ from: account });
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, erc20Contract]);

  return { onApprove: handleApprove };
};
