import { getDexSwapContract, getERC20Contract } from "contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import useFireToast from "hooks/useFireToast";
import { useEffect } from "react";
import { getLoginStatusSelector } from "state/reducer";
import { getSignerSelector } from "../../state/reducer";

const useContractEventListener = () => {
  const { isLoggedIn } = getLoginStatusSelector();
  const signer = getSignerSelector();
  const dexContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
  const toast = useFireToast();

  useEffect(() => {
    if (isLoggedIn) {
      dexContract?.on("TokensPurchased", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully bought TTD Tokens!");
      });

      dexContract?.on("TokensSold", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully sold TTD Tokens!");
      });

      erc20Contract?.on("Approval", (owner, spender, amount) => {
        toast.Positive("Success", "Approved, ready to purchase");
      });
    }
  }, [signer]);
};

export default useContractEventListener;
