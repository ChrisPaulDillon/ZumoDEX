import { getERC20Contract } from "../../contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "../../contracts/contracts";
import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import { useAppDispatch } from "../../state";
import { getLoginStatusSelector, getSignerSelector, updateTokenIsSpendable } from "../../state/reducer";

export const useApprove = () => {
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const signer = getSignerSelector();
  const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      erc20Contract?.on("Approval", (owner, spender, amount) => {
        dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
      });
    }
  }, []);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await erc20Contract.approve(CONTRACT_DEXSWAP, ethers.constants.MaxUint256).send({ from: userAddress });
      dispatch(updateTokenIsSpendable({ isTokenSpendable: true }));
    } catch (e) {
      return false;
    }
  }, [userAddress, erc20Contract]);

  return { onApprove: handleApprove };
};
