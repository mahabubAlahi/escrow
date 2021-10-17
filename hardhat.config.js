/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 const INFURA_URL = 'https://rinkeby.infura.io/v3/954d698cf76f4a948fe92a95f852c823';

 const PRIVATE_KEY = '177c0a5aa9ba90f490fedbbc913de4c2189584e448d67b187fabc6dce6e7cc36';

module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './frontend/escrow-app/lib/artifacts',
  },
  networks: {
    rinkeby: {
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    hardhat: {
      chainId: 1337
    }
  },
};
