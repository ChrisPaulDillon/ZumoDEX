import hre from "hardhat";

const VerifyContract = async (
  contractAddress: string,
  args: any[],
  contractPath?: string
) => {
  console.log(`Verifying contract: ${contractAddress}`);
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: contractPath,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
};

export default VerifyContract;
