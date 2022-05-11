import { useWeb3React } from "@web3-react/core";
import { getERC20Contract } from "contracts/contractHelper";
import { CONTRACT_ERC20 } from "contracts/contracts";
import { Contract, ethers } from "ethers";
import { useCallback } from "react";

export const useApprove = (lpContract: Contract) => {
  const { account } = useWeb3React();
  const erc20Contract = getERC20Contract(CONTRACT_ERC20);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await erc20Contract.approve(erc20Contract.options.address, ethers.constants.MaxUint256).send({ from: account });
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, lpContract, erc20Contract]);

  return { onApprove: handleApprove };
};
