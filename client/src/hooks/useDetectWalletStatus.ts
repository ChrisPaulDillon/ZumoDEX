import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch } from "../state";
import {
  CONNECTOR_TYPE,
  getConnectionStatusSelector,
  logUserIn,
  logUserOut,
  updateJsonRpcConnection,
  updateWeb3Provider,
} from "../state/reducer";
import { CHAIN_ID, RPC_URL } from "../util/providerHelper";
import useFireToast from "./useFireToast";

const useDetectWalletStatus = () => {
  const dispatcher = useAppDispatch();
  const connectorStatus = getConnectionStatusSelector();
  const toast = useFireToast();

  // useEffect(() => {
  //   const handleProviderSwitch = async () => {
  //     //@ts-ignore
  //     if (window?.ethereum) {
  //       //@ts-ignore
  //       const provider = new ethers.providers.Web3Provider(window.ethereum, CHAIN_ID);
  //       const result = await provider.send("eth_requestAccounts", []);
  //       if (result) {
  //         dispatcher(updateWeb3Provider({ web3Provider: provider }));
  //       }
  //     }
  //   };
  //   handleProviderSwitch();
  // }, []);

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
        .then(handleAccountsChanged)
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
   * Helper function for when the user logs in or out of their wallet
   */
  function handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
      return;
    }
    dispatcher(logUserIn({ address: accounts[0].toString() }));
  }

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
};

export default useDetectWalletStatus;
