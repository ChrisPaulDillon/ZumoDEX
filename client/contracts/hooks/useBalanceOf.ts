import { useEffect, useState } from "react";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { getERC20Contract } from "../contractHelper";
import { getSignerSelector } from "../../state/reducer";

const useBalanceOf = (tokenAddress: string) => {
  const { library, account } = useActiveWeb3React();
  const [balanceState, setBalanceState] = useState<Number>(0);
  const signer = getSignerSelector();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getERC20Contract(tokenAddress, signer);
      try {
        const res = await contract.balanceOf(account);
        setBalanceState(res);
      } catch (e) {
        console.error(e);
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress]);

  return balanceState;
};

export default useBalanceOf;
