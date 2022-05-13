import { CONTRACT_DEXSWAP } from "contracts/contracts";
import useRefresh from "hooks/useRefresh";
import { useEffect } from "react";
import { useAppDispatch } from "state";
import { ConvertTokenBalanceFromBN, ConvertTokenNoToBN } from "util/balanceHelper";
import web3Instance from "util/web3";
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
        const dexEtherBalanceNo = web3Instance.utils.fromWei(dexEtherBalance.toString());

        dispatch(
          updateDexInfo({
            dexInfo: {
              buyRate: ConvertTokenNoToBN(buyRate.toString())!.toString(),
              sellRate: ConvertTokenNoToBN(sellRate.toString())!.toString(),
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
