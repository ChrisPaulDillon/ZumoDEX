import { useEffect, useState } from "react";
import { getERC20Contract } from "../contractHelper";
import { getSignerSelector } from "../../state/reducer";

export interface ITokenInfo {
  name: string;
  symbol: string;
  totalSupply: Number;
}

const useGetTokenInfo = (tokenAddress: string) => {
  const signer = getSignerSelector();
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
        setTokenInfo({ name: name, symbol: symbol, totalSupply: totalSupply });
      } catch (e) {
        console.error(e);
      }
    };

    fetchTokenStats();
  }, [tokenAddress]);

  return tokenInfo;
};

export default useGetTokenInfo;
