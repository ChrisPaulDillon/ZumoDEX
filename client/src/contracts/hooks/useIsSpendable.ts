import { getERC20Contract } from "../../contracts/contractHelper";
import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "../../contracts/contracts";
import { useEffect } from "react";
import { useAppDispatch } from "../../state";
import { getLoginStatusSelector, getSignerSelector, updateTokenIsSpendable } from "../../state/reducer";
import { ConvertTokenBalanceFromBN } from "../../util/balanceHelper";

const useIsSpendable = () => {
  const signer = getSignerSelector();
  const { userAddress, isLoggedIn } = getLoginStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const canDexSpend = async () => {
      const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
      try {
        const tx = await erc20Contract.allowance(userAddress, CONTRACT_DEXSWAP);
        const allowanceNo = ConvertTokenBalanceFromBN(tx);
        dispatch(updateTokenIsSpendable({ isTokenSpendable: allowanceNo > 0 }));
      } catch (e) {
        console.log(e);
      }
    };
    if (isLoggedIn) {
      canDexSpend();
    }
  }, [userAddress, isLoggedIn]);
};

export default useIsSpendable;
