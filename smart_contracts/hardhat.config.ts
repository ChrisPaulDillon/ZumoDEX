/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 import "hardhat-deploy";
 import "@nomiclabs/hardhat-ethers";
 import "@nomiclabs/hardhat-etherscan";
 import "@typechain/hardhat";
 import {HardhatUserConfig} from 'hardhat/config';
 import { config as dotenvConfig } from "dotenv";
 import { resolve } from "path";
 
 dotenvConfig({ path: resolve(__dirname, "./.env") });
 
 // Ensure that we have all the environment variables we need.
 const mnemonic: string | undefined = process.env.MNEMONIC;
 if (!mnemonic) {
   throw new Error("Please set your MNEMONIC in a .env file");
 }
 
 const config: HardhatUserConfig = {
   defaultNetwork: "hardhat",
   solidity: "0.8.8",
   networks: {
     hardhat: {
       chainId: 31337,
     },
     localhost: {
       chainId: 31337
     },
     testnet: {
       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
       chainId: 97,
       gas: 2100000,
       gasPrice: 20000000000,
       accounts: {mnemonic: process.env.MNEMONIC}
     },
     mainnet: {
       url: "https://bsc-dataseed.binance.org/",
       chainId: 56,
       gas: 2100000,
       gasPrice: 20000000000,
       accounts: {mnemonic: process.env.MNEMONIC}
     }
   },
   etherscan: {
     apiKey: {
       bscTestnet: process.env.BSCSCAN_API
     }
   },
   namedAccounts: {
     deployer: {
       default: 0,
     },
   }
 }
 
 export default config;