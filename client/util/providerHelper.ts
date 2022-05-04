import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'

import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545'

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL)

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}
