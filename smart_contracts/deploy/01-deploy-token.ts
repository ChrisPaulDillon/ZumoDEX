import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import VerifyContract from "../util/VerifyContract";
import { LOCAL_CHAINS } from "../util/DeployerHelper";

const deployToken: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  //@ts-ignore
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying token");
  const token = await deploy("TestTokenDex", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`Deployed Token to Address: ${token.address}`);

  if (!LOCAL_CHAINS.includes(network.name) && process.env.BSCSCAN_API) {
    await VerifyContract(
      token.address,
      [],
      "contracts/TestTokenDex.sol:TestTokenDex"
    );
  }
};

export default deployToken;
