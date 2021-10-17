import { ethers, Contract } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json';

const escrowAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const token = new Contract(
          escrowAddress,
          Escrow.abi,
          signer
        );

        resolve({signerAddress, token});
      }
      resolve({signerAddress: undefined, token: undefined});
    });
  });

export default getBlockchain;