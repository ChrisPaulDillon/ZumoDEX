import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import useRefresh from "hooks/useRefresh";
import { useEffect } from "react";
import { useAppDispatch } from "state";
import { ConvertEtherToTTD, ConvertTokenBalanceFromBN } from "util/balanceHelper";
import { getConnectionStatusSelector, getSignerSelector, updateDexInfo } from "../../state/reducer";
import { getDexSwapContract, getERC20Contract } from "../contractHelper";

const useGetDexInfo = () => {
  const signer = getSignerSelector();
  const connectorStatus = getConnectionStatusSelector();
  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchDexInfo = async () => {
      const dexSwapContract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
      const erc20Contract = getERC20Contract(CONTRACT_ERC20, signer);
      try {
        const buyRate = await dexSwapContract.getBuyRate();
        const sellRate = await dexSwapContract.getSellRate();
        const totalSales = await dexSwapContract.getTotalSales();
        const dexTokenBalance = await erc20Contract.balanceOf(CONTRACT_DEXSWAP);
        const dexTokenBalanceNo = ConvertTokenBalanceFromBN(dexTokenBalance);
        dispatch(
          updateDexInfo({
            dexInfo: {
              buyRate: buyRate,
              sellRate: sellRate,
              totalSales: totalSales,
              exchangeTokenBalance: dexTokenBalanceNo,
              maximumBuy: Number(ConvertEtherToTTD(dexTokenBalanceNo.toString())),
            },
          })
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchDexInfo();
  }, [connectorStatus, fastRefresh]);
};

export default useGetDexInfo;
