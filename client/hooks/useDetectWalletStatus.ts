import { ethers } from "ethers";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState, useAppDispatch } from "../state";
import { logUserIn, updateWeb3Provider } from "../state/reducer";
import { CHAIN_ID } from "../util/providerHelper";

const useDetectWalletStatus = () => {
  const dispatcher = useAppDispatch();
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);

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
