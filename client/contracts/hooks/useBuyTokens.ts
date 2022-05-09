import { ethers } from "ethers";
import { getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();

    const buyTokens = async (amount: Number) => {
      const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
      try {
        const wei = ethers.utils.parseEther(amount.toString());
        const tx = await contract.buyTokens({value: wei});
        console.log(tx);
        
      } catch (e) {
        console.error(e);
      }
    };
    return {buyTokens}
};

export default useBuyTokens;
