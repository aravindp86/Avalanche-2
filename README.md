# Ethereum ATM DApp 

This readme file provides an overview of the Ethereum ATM (Automated Teller Machine) decentralized application (DApp) implemented using Solidity for the smart contract and React for the user interface. The DApp allows users to interact with an Ethereum smart contract to perform various financial transactions, such as depositing and withdrawing funds, and managing shares.

## Smart Contract

The Ethereum ATM smart contract is written in Solidity and is deployed on the Ethereum blockchain. The key functionalities of the smart contract include:

- **Deposit and Withdrawal**: The owner of the contract (presumably the bank) can deposit and withdraw funds from the contract.

- **Shares Management**: The owner can mint and burn shares for specific addresses, and users can transfer shares between addresses.

- **Balance Inquiry**: Users can check their account balance and share balances.

For a detailed explanation of the smart contract functions, refer to the inline comments in the `Assessment.sol` file.

## Frontend (React)

The front end of the DApp is implemented using React and interacts with the Ethereum blockchain through the MetaMask wallet. Here are some key features of the frontend:

- **Account Connection**: Users need to connect their MetaMask wallet to the DApp to interact with the smart contract.

- **User Information Display**: Once connected, user information such as account holder name, age, account type, college, account address, and account balance is displayed.

- **Transaction Operations**: Users can deposit and withdraw funds from their account, and the DApp updates the balance accordingly. Users can also print a mini statement showing the last 5 transactions.

- **Theme Switching**: Users can switch between different themes (default, dark, light, purple) to customize the appearance of the DApp.

## Getting Started

To run the DApp locally, follow these steps:
 # Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

## Dependencies

- **Solidity**: Used for writing smart contracts.
- **React**: Used for building the user interface.
- **MetaMask**: Required for wallet connection and Ethereum transactions.

### Author 

Arvind

arvind.p866@gmail.com

