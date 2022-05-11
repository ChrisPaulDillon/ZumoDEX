import { useEffect } from "react";
import { getERC20Contract } from "../contractHelper";
import { getConnectionStatusSelector, getSignerSelector, updateTokenInfo } from "../../state/reducer";
import { ConvertTokenBalanceFromBN } from "../../util/balanceHelper";
import { useAppDispatch } from "state";
import useRefresh from "hooks/useRefresh";

const useGetTokenInfo = (tokenAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchTokenStats = async () => {
      const contract = getERC20Contract(tokenAddress, signer);
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        dispatch(updateTokenInfo({ tokenInfo: { name: name, symbol: symbol, totalSupply: ConvertTokenBalanceFromBN(totalSupply) } }));
      } catch (e) {
        console.error(e);
      }
    };

    fetchTokenStats();
  }, [tokenAddress, connectorStatus, fastRefresh]);
};

export default useGetTokenInfo;
