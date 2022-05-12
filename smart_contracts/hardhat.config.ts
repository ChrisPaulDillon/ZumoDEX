/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { solidity } from "ethereum-waffle";
import chaiAsPromised from "chai-as-promised";

var chai = require("chai");
//used for bignumber comparison in unit tests
chai.use(solidity);
chai.use(chaiAsPromised).should();

dotenvConfig({ path: resolve(__dirname, "./.env") });

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

const config: HardhatUserConfig = {
  defaultNetwork: "testnet",
  solidity: "0.8.8",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    testnet: {
      url: process.env.RINKEBY_API,
      chainId: 4,
      gas: 2100000,
      gasPrice: 20000000000,
      accounts: [process.env.MNEMONIC!],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

export default config;
