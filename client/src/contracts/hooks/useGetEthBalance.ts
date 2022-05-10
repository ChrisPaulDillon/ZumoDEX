import { ethers } from "ethers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState, useAppDispatch } from "../../state";
import { getSignerSelector, updateEtherBalance } from "../../state/reducer";

const useGetEthBalance = () => {
  const provider = getSignerSelector();
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);
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
