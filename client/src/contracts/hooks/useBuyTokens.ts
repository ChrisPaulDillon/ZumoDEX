import { ethers } from "ethers";
import { useCallback, useEffect } from "react";
import useFireToast from "../../hooks/useFireToast";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();
  const { isLoggedIn, userAddress } = getLoginStatusSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      contract?.on("TokensPurchased", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully bought TTD Tokens!");
      });
    }
  }, []);

  const buyTokens = useCallback(
    async (amount: Number) => {
      try {
        const wei = ethers.utils.parseEther(amount.toString());
        const tx = await contract.buyTokens({ value: wei });
        console.log(tx);
      } catch (e) {
        console.error(e);
      }
    },
    [contract]
  );

  return { buyTokens };
};

export default useBuyTokens;
