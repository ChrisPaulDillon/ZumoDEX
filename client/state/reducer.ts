import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { RPC_URL } from "../util/providerHelper";

//We fallback on a json rpc connection if the user does not have a web3 wallet installed
export enum CONNECTOR_TYPE {
  JSON_RPC,
  WALLET_CONNECT,
}

export interface IGlobalState {
  userAddress: string | undefined;
  isLoggedIn: boolean;
  connectorType: CONNECTOR_TYPE;
  web3Provider: Web3Provider | undefined;
  jsonRpcProvider: JsonRpcProvider;
}

export const initialState: IGlobalState = {
  userAddress: "",
  isLoggedIn: false,
  connectorType: CONNECTOR_TYPE.JSON_RPC,
  web3Provider: undefined,
  jsonRpcProvider: new ethers.providers.JsonRpcProvider(RPC_URL, "any"),
};

export const logUserIn = createAction<{ address: string }>("state/logUserIn");
export const logUserOut = createAction("state/logUserOut");
export const updateWeb3Provider = createAction<{
  web3Provider: Web3Provider;
}>("state/updateConnectionType");

export default createReducer(initialState, (builder) =>
  builder
    .addCase(logUserIn, (state: IGlobalState, { payload: { address } }) => {
      state.userAddress = address;
      state.isLoggedIn = true;
    })
    .addCase(logUserOut, (state: IGlobalState) => {
      state.userAddress = undefined;
      state.isLoggedIn = false;
    })
    .addCase(updateWeb3Provider, (state: IGlobalState, { payload: { web3Provider } }) => {
      state.connectorType = CONNECTOR_TYPE.WALLET_CONNECT;
      state.web3Provider = web3Provider;
    })
);
