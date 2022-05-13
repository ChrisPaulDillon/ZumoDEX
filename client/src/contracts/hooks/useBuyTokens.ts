import { ethers } from "ethers";
import useFireToast from "hooks/useFireToast";
import { useCallback, useEffect } from "react";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();
  const { isLoggedIn } = getLoginStatusSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const dexContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      dexContract?.on("TokensPurchased", () => {
        toast.Positive("Success", "Successfully bought TTD Tokens!");
      });
    }
  }, [isLoggedIn]);

  const buyTokens = useCallback(
    async (amount: string) => {
      try {
        const wei = ethers.utils.parseEther(amount);
        await contract.buyTokens({ value: wei });
      } catch (e) {
        console.error(e);
      }
    },
    [contract, signer]
  );

  return { buyTokens };
};

export default useBuyTokens;
