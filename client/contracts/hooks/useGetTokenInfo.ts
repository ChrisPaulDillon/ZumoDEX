import { useEffect, useState } from "react";
import { getERC20Contract } from "../contractHelper";
import { getSignerSelector } from "../../state/reducer";
import { ethers } from "ethers";
import { getTokenBalance } from "../../util/balanceHelper";
import { useSelector } from "react-redux";
import { IAppState } from "../../state";

export interface ITokenInfo {
  name: string;
  symbol: string;
  totalSupply: Number;
}

const useGetTokenInfo = (tokenAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);

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
