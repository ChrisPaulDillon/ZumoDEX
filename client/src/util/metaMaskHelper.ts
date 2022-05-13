import { CHAIN_ID } from "./providerHelper";

/**
 * Helper function for when the user logs in or out of their wallet
 */
export const handleAccountsChanged = async (accounts: string | any[]) => {
  if (accounts.length === 0) {
    console.log("Please connect to MetaMask.");
    return;
  }
  return accounts[0].toString();
};

/**
 * Helper function for switching the user to the correct network
 */
export const handleNetworkSwitch = async () => {
  //@ts-ignore
  if (window.ethereum.networkVersion !== CHAIN_ID) {
    try {
      //@ts-ignore
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + CHAIN_ID }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      //@ts-ignore
      if (err.code === 4902) {
        //@ts-ignore
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Rinkeby Testnet",
              chainId: "0x" + CHAIN_ID,
              nativeCurrency: {
                name: "ETH",
                decimals: 18,
                symbol: "ETH",
              },
              rpcUrls: [process.env.RINKEBY_API],
            },
          ],
        });
      }
    }
  }
};
