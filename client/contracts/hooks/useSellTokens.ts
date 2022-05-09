import { ethers } from "ethers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useFireToast from "../../hooks/useFireToast";
import { IAppState } from "../../state";
import { getSignerSelector } from "../../state/reducer";
import { ConvertTokenNoToBN } from "../../util/balanceHelper";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useSellTokens = () => {
  const signer = getSignerSelector();
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      contract?.on("TokensPurchased", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully bought TTD Tokens!");
      });
    }
  }, []);

  const sellTokens = async (amount: Number) => {
    try {
      const tokensBN = ConvertTokenNoToBN(amount);
      const tx = await contract.sellTokens(tokensBN);
      console.log(tx);
    } catch (e) {
      console.error(e);
    }
  };
  return { sellTokens };
};

export default useSellTokens;
