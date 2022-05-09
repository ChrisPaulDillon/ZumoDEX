import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { IAppState } from "../../state";
import { getSignerSelector } from "../../state/reducer";

const useGetEthBalance = () => {
  const { account } = useActiveWeb3React();
  const [ethBalance, setEthBalance] = useState<Number>();
  const provider = getSignerSelector();
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);

  useEffect(() => {
    const getEthBalance = async () => {
      const balance = await provider.getBalance(account!);
      const userBalance = ethers.utils.formatEther(balance);
      setEthBalance(Number(userBalance));
    };

    if (isLoggedIn) {
      getEthBalance();
    }
  }, [isLoggedIn]);

  return ethBalance;
};

export default useGetEthBalance;
