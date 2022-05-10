import { useEffect } from "react";
import { getERC20Contract } from "../contractHelper";
import { getConnectionStatusSelector, getSignerSelector, updateTokenInfo } from "../../state/reducer";
import { getTokenBalance } from "../../util/balanceHelper";
import { useAppDispatch } from "state";

const useGetTokenInfo = (tokenAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTokenStats = async () => {
      const contract = getERC20Contract(tokenAddress, signer);
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        dispatch(updateTokenInfo({ tokenInfo: { name: name, symbol: symbol, totalSupply: getTokenBalance(totalSupply) } }));
      } catch (e) {
        console.error(e);
      }
    };

    fetchTokenStats();
  }, [tokenAddress, connectorStatus]);
};

export default useGetTokenInfo;
