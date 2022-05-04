import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { RPC_URL } from './providerHelper'

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

// const getWeb3WithArchivedNodeProvider = () => {
//   const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 } as HttpProviderOptions)
//   return new Web3(archivedHttpProvider)
// }

export { getWeb3NoAccount }
export default web3NoAccount
