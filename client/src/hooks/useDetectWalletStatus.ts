import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect } from "react";
import { handleAccountsChanged, handleNetworkSwitch } from "util/metaMaskHelper";
import { useAppDispatch } from "../state";
import {
  CONNECTOR_TYPE,
  getConnectionStatusSelector,
  logUserIn,
  logUserOut,
  updateJsonRpcConnection,
  updateWeb3Provider,
} from "../state/reducer";
import { CHAIN_ID, injectedWalletConnector, RPC_URL } from "../util/providerHelper";
import useFireToast from "./useFireToast";

const useDetectWalletStatus = () => {
  const { active, account, activate, deactivate } = useWeb3React();
  const dispatcher = useAppDispatch();
  const connectorStatus = getConnectionStatusSelector();
  const toast = useFireToast();

  useEffect(() => {
    if (active) {
      dispatcher(logUserIn({ address: account! }));
    }
  }, [active]);

  const login = () => {
    try {
      activate(injectedWalletConnector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          toast.Negative("Error", "You are currently on the wrong chain, please switch to the testnet!");
          //@ts-ignore
          await handleNetworkSwitch();
        }
        //@ts-ignore
        const requestAccount = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (requestAccount?.length > 0) {
          dispatcher(logUserIn({ address: requestAccount[0] }));
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const logout = () => {
    try {
      deactivate();
      dispatcher(logUserOut());
    } catch (ex) {
      console.log(ex);
    }
  };

  /*
   * Uses json RPC as a fallback if a web3 wallet is not detected
   */
  useEffect(() => {
    const getRPCProvider = async () => {
      //@ts-ignore
      if (window?.ethereum === undefined) {
        if (connectorStatus !== CONNECTOR_TYPE.JSON_RPC && RPC_URL) {
          const provider = await new ethers.providers.JsonRpcProvider(RPC_URL, 4);
          dispatcher(updateJsonRpcConnection({ jsonRpcConnector: provider }));
        } else {
          toast.Warning("Warning", "Json RPC url could not be found, please make sure your configuration is correct!");
        }
      }
    };
    getRPCProvider();
  }, []);

  /**
   * handles automatically requesting the user to login to metamask if the wallet is detected
   */
  useEffect(() => {
    //@ts-ignore
    if (window?.ethereum) {
      //@ts-ignore
      window?.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNetworkSwitch)
        .then(handleAccountsChanged)
        .then((account: string) => dispatcher(logUserIn({ address: account })))
        .catch((err: { code: number }) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    }
  }, []);

  /**
   * Listener for detecting a user has logged in or out of their web3 wallet,
   * also creates a new provider based on wallet detection
   */
  useEffect(() => {
    //@ts-ignore
    if (window?.ethereum) {
      //@ts-ignore
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          dispatcher(logUserIn({ address: accounts[0].toString() }));
        } else {
          dispatcher(logUserOut());
        }
      });
      //@ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum, CHAIN_ID);
      dispatcher(updateWeb3Provider({ web3Provider: provider }));
    }
  }, []);

  return { active, login, logout, account };
};

export default useDetectWalletStatus;
