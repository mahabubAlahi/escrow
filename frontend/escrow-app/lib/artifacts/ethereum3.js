import Web3 from 'web3';


//let finalweb3;

const finalweb3 = async () => {
    // Modern dapp browsers...
    let web3;
    let finaweb3;
    if (typeof window.ethereum !== 'undefined') {
      web3 = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
        finaweb3 = new Web3(web3);
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      web3 = window.web3.currentProvider;
      finaweb3 = new Web3(web3);
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      web3 = new Web3.providers.HttpProvider('http://localhost:8545');
      finaweb3 = new Web3(web3);
    }
  
     return finaweb3;
  }

  export default finalweb3;