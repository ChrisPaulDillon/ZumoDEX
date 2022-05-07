import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { getERC20Contract } from "../contracts/contractHelper";
import { getProviderOrSigner } from "../util/providerHelper";
import useActiveWeb3React from "./useActiveWeb3React";

const useBalanceOf = (tokenAddress: string) => {
  const { library, account } = useActiveWeb3React();
  //const contract = useERC20(tokenAddress)
  const [balanceState, setBalanceState] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getERC20Contract(tokenAddress, library);
      try {
        const res = await contract.methods.balanceOf(account).call();
        setBalanceState(new BigNumber(res));
      } catch (e) {
        console.error(e);
        setBalanceState(new BigNumber(0));
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [account, tokenAddress]);

  return balanceState;
};

export default useBalanceOf;
