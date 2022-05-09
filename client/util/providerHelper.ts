import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";

import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

export const RPC_URL = process.env.NEXT_PUBLIC_RINKEBY_API;

export const CHAIN_ID = 4;

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);

export const injectedWalletConnector = new InjectedConnector({
  supportedChainIds: [CHAIN_ID],
});

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}
