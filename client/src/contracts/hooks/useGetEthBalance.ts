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
  const provider = getSignerSelector();
  const connectionStatus = getConnectionStatusSelector();
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEthBalance = async () => {
      try {
        const balance = await provider.getBalance(userAddress!);
        const userBalance = ethers.utils.formatEther(balance);
        dispatch(updateEtherBalance({ etherBalance: Number(userBalance) }));
      } catch (e) {
        console.log(e);
      }
    };

    if (connectionStatus === CONNECTOR_TYPE.WALLET_CONNECT) {
      getEthBalance();
    }
  }, [isLoggedIn, connectorStatus, provider]);
};

export default useGetEthBalance;
