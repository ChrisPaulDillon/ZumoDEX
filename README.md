# ZumoSwap!

A decentralised token exchange built on the Ethereum testnet.

Smart Contracts are built with Solidity, Hardhat, Chai & Mocha.

Front end is built with React, Chakra-UI, TypeScript, Jest, React Testing Library.

## Instructions

### Smart Contracts

Navigate to the smart_contracts folder and issue the following commands:

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
