const fs = require('fs');

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Escrow = await ethers.getContractFactory("EscrowFinal");
    const escrow = await Escrow.deploy();
  
    console.log("Escrow address:", escrow.address);

    const data = {
      address: escrow.address
    };
    fs.writeFileSync('frontend/escrow-app/lib/artifacts/Address.json', JSON.stringify(data));
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });