import { useCallback, useEffect } from "react";
import { getLoginStatusSelector, getSignerSelector } from "../../state/reducer";
import { ConvertTokenNoToBN } from "../../util/balanceHelper";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useSellTokens = () => {
  const signer = getSignerSelector();
  const { isLoggedIn } = getLoginStatusSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);

  useEffect(() => {
    if (isLoggedIn) {
      contract?.on("TokensSold", () => {
        //handle event
      });
    }
  }, []);

  const sellTokens = useCallback(
    async (amount: string) => {
      try {
        const tokensBN = ConvertTokenNoToBN(amount);
        const tx = await contract.sellTokens(tokensBN);
      } catch (e) {
        console.error(e);
      }
    },
    [contract, signer]
  );

  return { sellTokens };
};

export default useSellTokens;
