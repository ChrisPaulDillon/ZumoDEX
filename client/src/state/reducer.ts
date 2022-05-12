import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IAppState } from ".";

export interface ITokenInfo {
  name: string;
  symbol: string;
  totalSupply: number;
}

export interface IDexInfo {
  buyRate: string;
  sellRate: string;
  totalSales: number;
  exchangeTokenBalance: number;
  maximumBuy: number;
  exchangeEtherBalance: number;
  maximumSell: number;
}

//We fallback on a json rpc connection if the user does not have a web3 wallet installed
export enum CONNECTOR_TYPE {
  NOT_CONNECTED = "Not Connected",
  JSON_RPC = "Connected to Json RPC",
  WALLET_CONNECT = "Connected to Wallet",
}

export interface IGlobalState {
  userAddress: string | undefined;
  isLoggedIn: boolean;
  etherBalance: number;
  userTokenBalance: number;
  isTokenSpendable: boolean;
  connectorStatus: CONNECTOR_TYPE;
  web3Provider: Web3Provider | undefined;
  jsonRpcProvider: JsonRpcProvider | undefined;
  dexInfo: IDexInfo;
  tokenInfo: ITokenInfo;
  contractCallLoading: boolean;
}

export const initialState: IGlobalState = {
  userAddress: "",
  isLoggedIn: false,
  etherBalance: 0,
  userTokenBalance: 0,
  isTokenSpendable: false,
  connectorStatus: CONNECTOR_TYPE.NOT_CONNECTED,
  web3Provider: undefined,
  jsonRpcProvider: undefined,
  dexInfo: { buyRate: "", sellRate: "", totalSales: 0, exchangeTokenBalance: 0, maximumBuy: 0, exchangeEtherBalance: 0, maximumSell: 0 },
  tokenInfo: { name: "", symbol: "", totalSupply: 0 },
  contractCallLoading: false,
};

export const logUserIn = createAction<{ address: string }>("state/logUserIn");
export const logUserOut = createAction("state/logUserOut");
export const updateEtherBalance = createAction<{ etherBalance: number }>("state/updateEtherBalance");
export const updateWeb3Provider = createAction<{
  web3Provider: Web3Provider;
}>("state/updateWeb3Provider");
export const updateJsonRpcConnection = createAction<{
  jsonRpcConnector: JsonRpcProvider;
}>("state/updateJsonRpcConnection");
export const updateDexInfo = createAction<{
  dexInfo: IDexInfo;
}>("state/updateDexInfo");
export const updateTokenInfo = createAction<{
  tokenInfo: ITokenInfo;
}>("state/tokenInfo");
export const updateUserTokenBalance = createAction<{
  tokenBalance: number;
}>("state/updateUserTokenBalance");
export const updateTokenIsSpendable = createAction<{
  isTokenSpendable: boolean;
}>("state/updateTokenIsSpendable");

export const updateContractCallLoading = createAction<{
  contractCallLoading: boolean;
}>("state/updateContractCallLoading");

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
      state.connectorStatus = CONNECTOR_TYPE.WALLET_CONNECT;
      state.web3Provider = web3Provider;
    })
    .addCase(updateJsonRpcConnection, (state: IGlobalState, { payload: { jsonRpcConnector } }) => {
      state.connectorStatus = CONNECTOR_TYPE.JSON_RPC;
      state.jsonRpcProvider = jsonRpcConnector;
    })
    .addCase(updateEtherBalance, (state: IGlobalState, { payload: { etherBalance } }) => {
      state.etherBalance = etherBalance;
    })
    .addCase(updateDexInfo, (state: IGlobalState, { payload: { dexInfo } }) => {
      state.dexInfo = dexInfo;
    })
    .addCase(updateTokenInfo, (state: IGlobalState, { payload: { tokenInfo } }) => {
      state.tokenInfo = tokenInfo;
    })
    .addCase(updateUserTokenBalance, (state: IGlobalState, { payload: { tokenBalance } }) => {
      state.userTokenBalance = tokenBalance;
    })
    .addCase(updateTokenIsSpendable, (state: IGlobalState, { payload: { isTokenSpendable } }) => {
      state.isTokenSpendable = isTokenSpendable;
    })
    .addCase(updateContractCallLoading, (state: IGlobalState, { payload: { contractCallLoading } }) => {
      state.contractCallLoading = contractCallLoading;
    })
);

export const getSignerSelector = (): JsonRpcSigner | JsonRpcProvider => {
  const jsonRpcProvider = useSelector((state: IAppState) => state.state.jsonRpcProvider);
  const web3Provider = useSelector((state: IAppState) => state.state.web3Provider);
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);
  return connectorStatus === CONNECTOR_TYPE.JSON_RPC ? jsonRpcProvider! : web3Provider?.getSigner()!;
};

export const getLoginStatusSelector = () => {
  const isLoggedIn = useSelector((state: IAppState) => state.state.isLoggedIn);
  const userAddress = useSelector((state: IAppState) => state.state.userAddress);
  return { isLoggedIn, userAddress };
};

export const getConnectionStatusSelector = (): CONNECTOR_TYPE => {
  const connectorStatus = useSelector((state: IAppState) => state.state.connectorStatus);
  return connectorStatus;
};

export const getEtherBalanceSelector = (): number => {
  const etherBalance = useSelector((state: IAppState) => state.state.etherBalance);
  return etherBalance;
};

export const getDexInfoSelector = (): IDexInfo => {
  const dexInfo = useSelector((state: IAppState) => state.state.dexInfo);
  return dexInfo;
};

export const getTokenInfoSelector = (): ITokenInfo => {
  const tokenInfo = useSelector((state: IAppState) => state.state.tokenInfo);
  return tokenInfo;
};

export const getUserTokenBalanceSelector = (): number => {
  const userTokenBalance = useSelector((state: IAppState) => state.state.userTokenBalance);
  return userTokenBalance;
};

export const getIsTokenSpendable = (): boolean => {
  const isTokenSpendable = useSelector((state: IAppState) => state.state.isTokenSpendable);
  return isTokenSpendable;
};
