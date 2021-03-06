import { useEffect } from "react";
import { getERC20Contract } from "../contractHelper";
import { getLoginStatusSelector, getSignerSelector, updateUserTokenBalance } from "../../state/reducer";
import { ConvertTokenBalanceFromBN } from "../../util/balanceHelper";
import { useAppDispatch } from "../../state";
import { CONTRACT_ERC20 } from "../../contracts/contracts";

const useBalanceOf = () => {
  const { isLoggedIn, userAddress } = getLoginStatusSelector();
  const signer = getSignerSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) {
        return;
      }
      const contract = getERC20Contract(CONTRACT_ERC20, signer);
      try {
        const res = await contract.balanceOf(userAddress);
        dispatch(updateUserTokenBalance({ tokenBalance: ConvertTokenBalanceFromBN(res) }));
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userAddress]);
};

export default useBalanceOf;
