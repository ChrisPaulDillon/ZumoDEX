import { useWeb3React } from "@web3-react/core";
import { getDexSwapContract } from "contracts/contractHelper";
import { CONTRACT_DEXSWAP } from "contracts/contracts";
import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch } from "../../state";
import {
  CONNECTOR_TYPE,
  getConnectionStatusSelector,
  getLoginStatusSelector,
  getSignerSelector,
  updateEtherBalance,
} from "../../state/reducer";

const useGetEthBalance = () => {
  const { account } = useWeb3React();
  const provider = getSignerSelector();
  const connectionStatus = getConnectionStatusSelector();
  const { isLoggedIn } = getLoginStatusSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEthBalance = async () => {
      try {
        const balance = await provider.getBalance(account!);
        const userBalance = ethers.utils.formatEther(balance);
        dispatch(updateEtherBalance({ etherBalance: Number(userBalance) }));
      } catch (e) {
        console.log(e);
      }
    };

    if (connectionStatus === CONNECTOR_TYPE.WALLET_CONNECT && isLoggedIn) {
      getEthBalance();
    }
  }, [isLoggedIn, connectorStatus, provider]);
};

export default useGetEthBalance;
