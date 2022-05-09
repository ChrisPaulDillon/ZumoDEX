import { ethers } from "ethers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { IAppState, useAppDispatch } from "../../state";
import { getSignerSelector, updateEtherBalance } from "../../state/reducer";

const useGetEthBalance = () => {
  const { account } = useActiveWeb3React();
  const provider = getSignerSelector();
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEthBalance = async () => {
      const balance = await provider.getBalance(account!);
      const userBalance = ethers.utils.formatEther(balance);
      dispatch(updateEtherBalance({etherBalance: Number(userBalance)}))
    };

    if (isLoggedIn) {
      getEthBalance();
    }
  }, [isLoggedIn]);
};

export default useGetEthBalance;
