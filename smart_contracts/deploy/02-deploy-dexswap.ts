import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import VerifyContract from "../util/VerifyContract";
import { LOCAL_CHAINS } from "../util/DeployerHelper";

const deployDexSwap: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = await get("TestTokenDex");

  log("Deploying DexSwap");
  const dexSwap = await deploy("DexSwap", {
    from: deployer,
    args: [token.address],
    log: true,
  });
  log(`Deployed DexSwap to Address: ${dexSwap.address}`);

  if (!LOCAL_CHAINS.includes(network.name) && process.env.ETHERSCAN_API) {
    await VerifyContract(dexSwap.address, [token.address]);
  }
};

export default deployDexSwap;
