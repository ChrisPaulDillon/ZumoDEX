import { useEffect } from "react";
import { useAppDispatch } from "state";
import { getConnectionStatusSelector, getSignerSelector, updateDexInfo } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";

const useGetDexInfo = (dexSwapAddress: string) => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchDexInfo = async () => {
      const contract = getDexSwapContract(dexSwapAddress, signer);
      try {
        const buyRate = await contract.getBuyRate();
        const sellRate = await contract.getSellRate();
        const totalSales = await contract.getTotalSales();
        dispatch(
          updateDexInfo({
            dexInfo: {
              buyRate: buyRate,
              sellRate: sellRate,
              totalSales: totalSales,
            },
          })
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchDexInfo();
  }, [dexSwapAddress, connectorStatus]);
};

export default useGetDexInfo;
