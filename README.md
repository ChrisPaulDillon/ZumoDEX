# ZumoSwap!

A decentralised token exchange built on the Ethereum testnet.

Smart Contracts are built with Solidity, Hardhat, Chai & Mocha.

Front end is built with React, Chakra-UI, TypeScript, Jest, React Testing Library.

## Requirements

Please install the Web3 wallet extension MetaMask as this will be used to interact with the smart contracts and a private key is required if you wish to
deploy the contracts on the testnet.

## Instructions

### Smart Contracts

Navigate to the smart_contracts folder and create a .env file within the smart_contracts folder. Add the following:

> MNEMONIC="YOUR_API_KEY"

> RINKEBY_API="YOUR_API_KEY"

Then perform the following commands:

> npm install

> npx hardhat compile

> npx hardhat deploy --network testnet

### Front End

Create a .env file within the client folder. Add the following:

> NEXT_PUBLIC_RINKEBY_API="YOUR_API_KEY"

Navigate to the client folder and issue the following commands:

> npm install

> npm run build

> npm run dev

Navigate to localhost:3000

### Testing

To test the front end, run the test runner inside the client folder

> npm run test

To test the smart contracts, run the test runner inside the smart contracts folder

> npx hardhat test
