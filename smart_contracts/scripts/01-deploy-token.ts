import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import verifyContract from "../util/verifyContract";
import { LOCAL_CHAINS } from "../util/deployerHelper";

const deployToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying token");
  const token = await deploy("TestTokenDex", {
    from: deployer,
    args: [],
    log: true,
    //waitConfirmations
  });
  log(`Deployed Token to Address: ${token.address}`);

  if (!LOCAL_CHAINS.includes(network.name) && process.env.BSCSCAN_API) {
    await verifyContract(token.address, []);
  }
};

export default deployToken;
