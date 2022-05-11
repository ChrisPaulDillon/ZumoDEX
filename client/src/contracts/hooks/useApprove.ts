import { getERC20Contract } from "contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import { ethers } from "ethers";
import useFireToast from "hooks/useFireToast";
import { useCallback, useEffect } from "react";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";

export const useApprove = () => {
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const signer = getSignerSelector();
  const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      erc20Contract?.on("Approval", (owner, spender, amount) => {
        toast.Positive("Success", "Approved, ready to purchase");
      });
    }
  }, [userAddress]);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await erc20Contract.approve(CONTRACT_DEXSWAP, ethers.constants.MaxUint256).send({ from: userAddress });
      return tx;
    } catch (e) {
      return false;
    }
  }, [userAddress, erc20Contract]);

  return { onApprove: handleApprove };
};
