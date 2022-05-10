import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch } from "../../state";
import {
  getConnectionStatusSelector,
  getLoginStatusSelector,
  getSignerSelector,
  updateEtherBalance,
} from "../../state/reducer";

const useGetEthBalance = () => {
  const provider = getSignerSelector();
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEthBalance = async () => {
      const balance = await provider.getBalance(userAddress!);
      const userBalance = ethers.utils.formatEther(balance);
      dispatch(updateEtherBalance({ etherBalance: Number(userBalance) }));
    };

    if (isLoggedIn) {
      getEthBalance();
    }
  }, [isLoggedIn, connectorStatus]);
};

export default useGetEthBalance;
