import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { IAppState } from "../../state";
import { getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";

export interface IDexInfo {
  buyRate: string;
  sellRate: string;
  totalSales: number;
}

const useGetDexInfo = (dexSwapAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);

  const [dexInfo, setDexInfo] = useState<IDexInfo>({
    buyRate: "",
    sellRate: "",
    totalSales: 0,
  });

  useEffect(() => {
    const fetchDexInfo = async () => {
      const contract = getDexSwapContract(dexSwapAddress, signer);
      try {
        const buyRate = await contract.getBuyRate();
        const sellRate = await contract.getSellRate();
        const totalSales = await contract.getTotalSales();
        setDexInfo({
          buyRate: buyRate,
          sellRate: sellRate,
          totalSales: totalSales,
        });
      } catch (e) {
        console.error(e);
      }
    };

    fetchDexInfo();
  }, [dexSwapAddress, connectorStatus]);

  return dexInfo;
};

export default useGetDexInfo;
