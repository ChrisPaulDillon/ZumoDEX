import { useEffect, useState } from "react";
import useActiveWeb3React from "./useActiveWeb3React";
import web3NoAccount from "../util/web3";

const useGetEthBalance = () => {
  const { account } = useActiveWeb3React();
  const [ethBalance, setEthBalance] = useState<Number>();

  useEffect(() => {
    const getEthBalance = async () => {
      const balance = await web3NoAccount.eth.getBalance(account!);
      const userBalance = web3NoAccount.utils.fromWei(balance);
      setEthBalance(Number(userBalance));
    };

    if (account) {
      getEthBalance();
    }
  }, [account]);

  return ethBalance;
};

export default useGetEthBalance;
