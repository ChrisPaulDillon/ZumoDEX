import { useEffect, useState } from "react";
import { getERC20Contract } from "../contractHelper";
import { getConnectionStatusSelector, getSignerSelector } from "../../state/reducer";
import { getTokenBalance } from "../../util/balanceHelper";

export interface ITokenInfo {
  name: string;
  symbol: string;
  totalSupply: Number;
}

const useGetTokenInfo = (tokenAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();

  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>({
    name: "",
    symbol: "",
    totalSupply: 0,
  });

  useEffect(() => {
    const fetchTokenStats = async () => {
      const contract = getERC20Contract(tokenAddress, signer);
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        setTokenInfo({ name: name, symbol: symbol, totalSupply: getTokenBalance(totalSupply) });
      } catch (e) {
        console.error(e);
      }
    };

    fetchTokenStats();
  }, [tokenAddress, connectorStatus]);

  return tokenInfo;
};

export default useGetTokenInfo;
