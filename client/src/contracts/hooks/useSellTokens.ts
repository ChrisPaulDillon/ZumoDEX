import { useCallback } from "react";
import { getSignerSelector } from "../../state/reducer";
import { ConvertTokenNoToBN } from "../../util/balanceHelper";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useSellTokens = () => {
  const signer = getSignerSelector();
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);

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
    [contract, signer]
  );

  return { sellTokens };
};

export default useSellTokens;
