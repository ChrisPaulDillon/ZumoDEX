import { useCallback, useEffect } from "react";
import useFireToast from "../../hooks/useFireToast";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";
import { ConvertTokenNoToBN } from "../../util/balanceHelper";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useSellTokens = () => {
  const signer = getSignerSelector();
  const { isLoggedIn } = getLoginStatusSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      contract?.on("TokensSold", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully sold TTD Tokens!");
      });
    }
  }, []);

  const sellTokens = useCallback(
    async (amount: Number) => {
      try {
        const tokensBN = ConvertTokenNoToBN(amount);
        const tx = await contract.sellTokens(tokensBN);
        console.log(tx);
      } catch (e) {
        console.error(e);
      }
    },
    [contract]
  );

  return { sellTokens };
};

export default useSellTokens;
