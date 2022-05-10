import { useEffect, useState } from "react";
import { getERC20Contract } from "../contractHelper";
import { getSignerSelector } from "../../state/reducer";
import { getTokenBalance } from "../../util/balanceHelper";
import { useSelector } from "react-redux";
import { IAppState } from "../../state";

const useBalanceOf = (tokenAddress: string) => {
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const [balanceState, setBalanceState] = useState<Number>(0);
  const signer = getSignerSelector();

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getERC20Contract(tokenAddress, signer);
      try {
        const res = await contract.balanceOf(userAddress);
        setBalanceState(getTokenBalance(res));
      } catch (e) {
        console.error(e);
      }
    };

    if (isLoggedIn) {
      fetchBalance();
    }
  }, [userAddress, tokenAddress]);

  return balanceState;
};

export default useBalanceOf;
