import { ethers } from "ethers";
import { useEffect } from "react";
import { useAppDispatch } from "../state";
import {
  CONNECTOR_TYPE,
  getConnectionStatusSelector,
  getLoginStatusSelector,
  logUserIn,
  updateJsonRpcConnection,
  updateWeb3Provider,
} from "../state/reducer";
import { CHAIN_ID, RPC_URL } from "../util/providerHelper";

const useDetectWalletStatus = () => {
  const dispatcher = useAppDispatch();
  const { userAddress } = getLoginStatusSelector();
  const connectorStatus = getConnectionStatusSelector();

  useEffect(() => {
    const handleProviderSwitch = async () => {
      //@ts-ignore
      if (window?.ethereum) {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum, CHAIN_ID);
        const result = await provider.send("eth_requestAccounts", []);
        if (result) {
          dispatcher(updateWeb3Provider({ web3Provider: provider }));
        }
      }
    };
    handleProviderSwitch();
  }, []);

  useEffect(() => {
    if (connectorStatus !== CONNECTOR_TYPE.JSON_RPC) {
      const provider = new ethers.providers.JsonRpcProvider(RPC_URL, "any");
      dispatcher(updateJsonRpcConnection({ jsonRpcConnector: provider }));
    }
  }, []);

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

  function handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== userAddress) {
      dispatcher(logUserIn({ address: accounts[0].toString() }));
    }
  }
};

export default useDetectWalletStatus;
