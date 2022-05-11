import { getDexSwapContract, getERC20Contract } from "contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import useFireToast from "hooks/useFireToast";
import { useEffect } from "react";
import { CONNECTOR_TYPE, getConnectionStatusSelector, getLoginStatusSelector } from "state/reducer";
import { getSignerSelector } from "../../state/reducer";

const useContractEventListener = () => {
  const { isLoggedIn } = getLoginStatusSelector();
  const signer = getSignerSelector();
  const connectionStatus = getConnectionStatusSelector();
  const dexContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
  const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
  const toast = useFireToast();
  const id = "test-toast";

  useEffect(() => {
    if (connectionStatus === CONNECTOR_TYPE.WALLET_CONNECT) {
      dexContract?.on("TokensPurchased", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully bought TTD Tokens!");
      });

      dexContract?.on("TokensSold", (account, token, amount, rate) => {
        toast.Positive("Success", "Successfully sold TTD Tokens!");
      });
    }
  }, [signer, dexContract]);

  useEffect(() => {
    if (connectionStatus === CONNECTOR_TYPE.WALLET_CONNECT) {
      erc20Contract?.on("Approval", (owner, spender, amount) => {
        if (!toast.isActive(id)) {
          toast.Positive("Success", "Approved, ready to purchase", id);
        }
      });
    }
  }, [erc20Contract]);
};

export default useContractEventListener;
