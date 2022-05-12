import { CONTRACT_DEXSWAP, CONTRACT_ERC20 } from "contracts/contracts";
import { ethers } from "ethers";
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
        const dexTokenBalance = await erc20Contract.balanceOf(dexSwapContract.address);
        const dexTokenBalanceNo = ConvertTokenBalanceFromBN(dexTokenBalance);
        const maxBuy = Number(ConvertEtherToTTD(dexTokenBalanceNo.toString()));

        // const exchangeEtherBalance = await signer.getBalance(dexSwapContract.address);
        // console.log(exchangeEtherBalance);

        // const exchangeEtherBalanceNo = ethers.utils.formatEther(exchangeEtherBalance);

        // const maxSell = ConvertEtherToTTD(exchangeEtherBalance.toString());
        // console.log(maxSell);

        // const etherBalNo = ethers.utils.formatEther(etherBalance);
        // const maxSell = Number(CovertTDDToEther(etherBalNo));
        // console.log(etherBalNo);

        // console.log(maxSell);

        dispatch(
          updateDexInfo({
            dexInfo: {
              buyRate: buyRate,
              sellRate: sellRate,
              totalSales: totalSales,
              exchangeTokenBalance: dexTokenBalanceNo,
              maximumBuy: maxBuy,
              exchangeEtherBalance: Number(0),
              maximumSell: Number(0),
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
