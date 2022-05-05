import hre from "hardhat"

const verifyContract = async (contractAddress: string, args: any[]) => {
  console.log(`Verifying contract: ${contractAddress}`)
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
      contract: "contracts/ChrisCoin.sol:ChrisCoin"
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      console.log(e)
    }
  }
}

export default verifyContract