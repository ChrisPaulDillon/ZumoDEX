import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { getERC20Contract } from "../contracts/contractHelper";
import useActiveWeb3React from "./useActiveWeb3React";

export interface ITokenInfo {
  name: string;
  symbol: string;
  totalSupply: BigNumber;
}

const useGetTokenInfo = (tokenAddress: string) => {
  const { library, account } = useActiveWeb3React();
  const [tokenInfo, setTokenInfo] = useState<ITokenInfo>({
    name: "",
    symbol: "",
    totalSupply: new BigNumber(0),
  });

  useEffect(() => {
    const fetchTokenStats = async () => {
      const contract = getERC20Contract(tokenAddress, library);
      try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const totalSupply = await contract.methods.totalSupply().call();
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
