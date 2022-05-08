import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IAppState, useAppDispatch } from "../state";
import { logUserIn } from "../state/reducer";

const useDetectWalletStatus = () => {
  const dispatcher = useAppDispatch();
  const userAddress = useSelector(
    (state: IAppState) => state.state.userAddress
  );

  useEffect(() => {
    //@ts-ignore
    if (window?.ethereum) {
      console.log("web3 detected, opinion respected");
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
