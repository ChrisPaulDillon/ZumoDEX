import { ethers } from "ethers";
import { getSignerSelector } from "../../state/reducer";
import { getDexSwapContract } from "../contractHelper";
import { CONTRACT_DEXSWAP } from "../contracts";

const useBuyTokens = () => {
  const signer = getSignerSelector();

    const buyTokens = async () => {
      const contract = getDexSwapContract(CONTRACT_DEXSWAP, signer);
      try {
        const tx = await contract.buyTokens({value: ethers.utils.parseEther("0.1")});
        console.log(tx);
        
      } catch (e) {
        console.error(e);
      }
    };
    return {buyTokens}
};

export default useBuyTokens;
