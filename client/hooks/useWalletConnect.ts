import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injectedWalletConnector } from "../util/providerHelper";
import web3 from "../util/web3";
import useFireToast from "./useFireToast";

const useWalletConnect = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const toast = useFireToast();

  const login = () => {
    console.log("calling login");

    try {
      activate(injectedWalletConnector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          setError(error.toString());
          toast.Negative(
            "Error",
            "You are currently on the wrong chain, please switch to the testnet!"
          );
          //@ts-ignore
          if (window.ethereum.networkVersion !== 97) {
            try {
              //@ts-ignore
              await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: web3.utils.toHex(97) }],
              });
            } catch (err) {
              // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                //@ts-ignore
                await window.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainName: "Binance Smartchain Testnet",
                      chainId: web3.utils.toHex(97),
                      nativeCurrency: {
                        name: "BNB",
                        decimals: 18,
                        symbol: "BNB",
                      },
                      rpcUrls: [
                        "https://data-seed-prebsc-1-s1.binance.org:8545/",
                      ],
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
    } catch (ex) {
      console.log(ex);
    }
  };

  return { active, login, logout, error, account };
};

export default useWalletConnect;
