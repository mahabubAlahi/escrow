import { ethers } from 'ethers'


const finalweb3 = async () => {
  // Modern dapp browsers...
  let web3;
  let finaweb3;
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access
      await window.ethereum.enable();
      finaweb3 = new ethers.providers.Web3Provider(window.ethereum)
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
  }
  // Legacy dapp browsers...
  else if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    finaweb3 = new ethers.providers.Web3Provider(window.web3.currentProvider)
  }
  // If no injected web3 instance is detected, fall back to HardHat Local
  else {
    finaweb3 = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  }

   return finaweb3;
}


export default finalweb3;
