import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [theme, setTheme] = useState('default'); // Default theme
  const [transactions, setTransactions] = useState([]);
  const [manualAmount, setManualAmount] = useState('');

  // Account Information
  const accountInfo = {
    holderName: "Arvind",
    age: 21,
    accountType: "Savings",
    college: "IIT Bangalore",
  };

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      const balanceInWei = await atm.getBalance();
      const balanceInEth = ethers.utils.formatUnits(balanceInWei, 'ether');
      setBalance(parseInt(balanceInEth, 10));
    }
  }

  const deposit = async () => {
    const amount = prompt('Enter the amount to deposit:');
    if (atm && amount) {
      let tx = await atm.deposit(ethers.utils.parseEther(amount));
      await tx.wait();
      getBalance();
      updateTransactions(`Deposit ${amount} ETH`);
    }
  }

  const withdraw = async () => {
    const amount = prompt('Enter the amount to withdraw:');
    if (atm && amount) {
      let tx = await atm.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      getBalance();
      updateTransactions(`Withdraw ${amount} ETH`);
    }
  }

  const updateTransactions = (action) => {
    const updatedTransactions = [...transactions, { action, timestamp: new Date().toLocaleString() }];
    setTransactions(updatedTransactions.slice(-5)); // Keep the last 5 transactions
  }

  const printMiniStatement = () => {
    if (transactions.length === 0) {
      alert("No transactions available.");
    } else {
      let receipt = "Digital Receipt:\n";
      transactions.forEach((transaction, index) => {
        receipt += `${index + 1}. ${transaction.action} at ${transaction.timestamp}\n`;
      });

      alert(receipt);
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Account Holder Name: {accountInfo.holderName}</p>
        <p>Age: {accountInfo.age}</p>
        <p>Account Type: {accountInfo.accountType}</p>
        <p>College: {accountInfo.college}</p>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
        <button onClick={printMiniStatement}>Print Mini Statement</button>
      </div>
    )
  }

  const switchTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const getThemeStyles = () => {
    const themes = {
      default: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonColor: '#3498db',
      },
      dark: {
        backgroundColor: '#2c3e50',
        textColor: '#ffffff',
        buttonColor: '#e74c3c',
      },
      light: {
        backgroundColor: '#ecf0f1',
        textColor: '#2c3e50',
        buttonColor: '#2ecc71',
      },
      purple: {
        backgroundColor: '#8e44ad',
        textColor: '#ffffff',
        buttonColor: '#f39c12',
      },
    };

    return themes[theme];
  };

  const themeStyles = getThemeStyles();

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container" style={{ background: themeStyles.backgroundColor, color: themeStyles.textColor }}>
      <header><h1>Welcome  Arvind to IIT Banglore</h1></header>
      {initUser()}
      <div>
        <button onClick={() => switchTheme('default')}>Default Theme</button>
        <button onClick={() => switchTheme('dark')}>Dark Theme</button>
        <button onClick={() => switchTheme('light')}>Light Theme</button>
        <button onClick={() => switchTheme('purple')}>Purple Theme</button>
        {/* Add more theme buttons as needed */}
      </div>
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
