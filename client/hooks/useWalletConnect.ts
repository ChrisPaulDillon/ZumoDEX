import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../state";
import { logUserOut, logUserIn } from "../state/reducer";
import { CHAIN_ID, injectedWalletConnector } from "../util/providerHelper";
import useFireToast from "./useFireToast";

const useWalletConnect = () => {
  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const [error, setError] = useState<string>("");
  const toast = useFireToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (active) {
      dispatch(logUserIn({ address: account! }));
    }
  }, [active]);

  const login = () => {
    try {
      activate(injectedWalletConnector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          setError(error.toString());
          toast.Negative("Error", "You are currently on the wrong chain, please switch to the testnet!");
          //@ts-ignore
          if (window.ethereum.networkVersion !== CHAIN_ID) {
            try {
              //@ts-ignore
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x" + CHAIN_ID }],
              });
              dispatch(logUserIn({ address: account! }));
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
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const logout = () => {
    try {
      deactivate();
      dispatch(logUserOut());
    } catch (ex) {
      console.log(ex);
    }
  };

  return { active, login, logout, error, account };
};

export default useWalletConnect;
