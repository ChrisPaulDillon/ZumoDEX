import { CONTRACT_DEXSWAP } from "contracts/contracts";
import { ethers } from "ethers";
import useRefresh from "hooks/useRefresh";
import { useEffect } from "react";
import { useAppDispatch } from "state";
import { ConvertTokenBalanceFromBN } from "util/balanceHelper";
import { getConnectionStatusSelector, getSignerSelector, updateDexInfo } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";

const useGetDexInfo = () => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchDexInfo = async () => {
      const dexSwapContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
      try {
        const buyRate = await dexSwapContract.getBuyRate();
        const sellRate = await dexSwapContract.getSellRate();
        const totalSales = await dexSwapContract.getTotalSales();
        const dexTokenBalance = await dexSwapContract.getMaximumBuy();
        const dexEtherBalance = await dexSwapContract.getMaximumSell();
        const dexTokenBalanceNo = ConvertTokenBalanceFromBN(dexTokenBalance);
        const dexEtherBalanceNo = ethers.utils.formatEther(dexEtherBalance);

        dispatch(
          updateDexInfo({
            dexInfo: {
              buyRate: buyRate,
              sellRate: sellRate,
              totalSales: totalSales,
              exchangeTokenBalance: dexTokenBalanceNo,
              exchangeEtherBalance: Number(dexEtherBalanceNo),
            },
          })
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchDexInfo();
  }, [signer, connectorStatus, fastRefresh]);
};

export default useGetDexInfo;
