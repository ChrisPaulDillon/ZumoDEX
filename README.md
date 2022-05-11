# ZumoSwap!
A decentralised token exchange built with on the Ethereum testnet. 

Smart Contracts are built with Solidity, Hardhat, Chai & Mocha.

Front end is built with React, Chakra-UI, TypeScript, Jest, React Testing Library.

## Instructions
### Smart Contracts
Navigate to the smart_contracts folder and issue the following commands:
> npm install
 
> npx hardhat compile

> npx hardhat deploy --network testnet

### Front End
Navigate to the client folder and issue the following commands: 
> npm install

> npm run dev

Navigate to localhost:3000

### Testing

To test the front end, run the test runner inside the client folder
> npm run test

To test the smart contracts, run the test runner inside the smart contracts folder
> npx hardhat test
