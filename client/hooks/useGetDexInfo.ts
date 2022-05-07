import { useEffect, useState } from "react";
import { getDexSwapContract } from "../contracts/contractHelper";
import useActiveWeb3React from "./useActiveWeb3React";

export interface IDexInfo {
  buyRate: string;
  sellRate: string;
  totalSales: number;
}

const useGetDexInfo = (dexSwapAddress: string) => {
  const { library } = useActiveWeb3React();
  const [dexInfo, setDexInfo] = useState<IDexInfo>({
    buyRate: "",
    sellRate: "",
    totalSales: 0,
  });

  useEffect(() => {
    const fetchDexInfo = async () => {
      const contract = getDexSwapContract(dexSwapAddress, library);
      try {
        const buyRate = await contract.methods.getBuyRate().call();
        const sellRate = await contract.methods.getSellRate().call();
        const totalSales = await contract.methods.getTotalSales().call();

        setDexInfo({
          buyRate: buyRate,
          sellRate: sellRate,
          totalSales: totalSales.toNumber(),
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchDexInfo();
  }, [dexSwapAddress]);

  return dexInfo;
};

export default useGetDexInfo;
