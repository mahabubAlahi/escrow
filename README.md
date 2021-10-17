## Go to the Project's root directory

       1. npm install

## Go to frontend directory and install the packages

       2. cd frontend/escrow-app
       3. npm install

## Compiling the Contract
First, go to the projects root directory and run

       4. npx hardhat compile

## Deploying and using a local network / blockchain

   For easy testing purposes, we deploy our project in the local network. In the testing node, we get free       accounts with fake ethers which we can easily import in the MetaMask and test it
   To deploy to the local network, you first need to start the local test node just open one terminal and run

       5. npx hardhat node

   When we run this command, you should see a list of addresses and private keys. These are 20 test accounts and     addresses created for us that we can use to deploy and test our smart contracts. Each account is also loaded      up with 10,000 fake Ether.
   ***Note: We should always open this terminal and never quit it

## Now open another terminal and run the following command

      6. npx hardhat run scripts/deploy.js --network localhost

   Once this script is executed, the smart contract should be deployed to the local test network and we should be    then able to start interacting with it.

## Configure MetaMask Wallet

   To send transactions to the smart contract, we will need to connect our MetaMask wallet using the accounts       created when we ran `npx hardhat node`. In the list of contracts that the CLI logs out, you should see both       an Account number as well as a Private Key. 

   We can import this account into MetaMask in order to start using some of the fake Eth available there. To do    so,
       a. first open MetaMask, login and update the network to be Localhost 8545:
       b. Next, in MetaMask click on Import Account from the accounts menu:
       c. Copy then paste one of the Private Keys logged out by the CLI and click Import. Once the account is           imported, you should see the Eth in the account:
   ***Note: For this Project's testing we need to import 3 or 4 accounts

## Connecting the React client

   Open another terminal and go to the 'frontend/escrow-app' directory

      7. cd frontend/escrow-app
      8. npm run dev

   it should start the react server at `localhost:3008`

   When the app loads, you should be able to fetch the escrow app. You should also be able to make updates to the    escrow app by signing the contract with your MetaMask wallet and spending the fake Ether.



##########################################################################################################
                                      Project Description
##########################################################################################################

In this project, there are 2 portals
      a. Depositor Portal
      b. Arbitor Portal

In the Depositor Portal, there are 3 features
      a. Create Deposit (Anyone can create Deposit)
      b. WithDraw Deposit (If anyone has existing deposit, they can withdraw the deposit after 24 hours of the          creation)
      c. Confirm Deposit (If the depositor get service from the recipient, they need to confirm it for unlocking          the deposit)

In the Arbitor Portal, there are 3 features
      a. Unlock a Deposit (Only Arbitor can unlock any deposit)
      b. Depositor's List (Arbitor can see all the depositor's list)
      c. Deposit's Details (Arbitor can see any Depositor's all the deposits detail)

  ***Note: Those who compile and deploy the contract will be the Arbitor


##############################################################################################################
                                  Some MetaMask Error and Other Error Description
##############################################################################################################

1. For testing feature like create deposit, unlock a deposit when we copy account from MetaMask and paste it in    the 'Recipient Address' or 'Depositor Address' and switch to another account, it might cause
            a. 'Invalid parameters: must provide an Ethereum address.' error

   It is a metamask issue, So to solve this error everytime after switching to another account just refresh the      page and fill up the information

2. There is another error in MetaMask is that,
            b. '[ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"code":-                         32000,"message":"Nonce too high. Expected nonce to be 0 but got 3. Note that transactions can't                   be queued when automining."}}}''

    It is a metamask issue, try reseting your metamask accounts (settings > advanced > reset account). It was         getting 'incorrect nonce' errors and some other weird ones, it stemmed from the fact the local  develop chain     uses a persistent mnemonic (unlike ganache, which spins up a new one each time). At that time, metamask was       getting confused by the old transactions in previous run start launches getting mixed in with new ones after      fresh deployments

3. Smart contract's 'require' statement throw error when the condition is not met. It is a part of our project.
            c. '[ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"code":-                32603,"message":"Error: VM Exception while processing transaction: reverted with reason string                 'You can not withdraw earlier than 24 hours after deposit!'","data":                {"txHash":"0xb18de20250941817dbd21ec48db60b7da75ee34a67ea77794b6e70f68424ddb4"}}}}''

For sampling, in this error you can see that, reason string 'You can not withdraw earlier than 24 hours after deposit!', it says to withdraw any deposit you have to wait for 24 hours after creating the deposit. 

For this type of error, just read the 'reason string' portion you will find the solution. For this error solution, when we withdraw the deposit after 24 hours the withdraw transaction will be worked perfectly

      For this project 'reason string' will be look like:
               a. 'You Already have a deposit ongoing!'
               b. 'You have no deposit available to withdraw'
               c. 'You can not withdraw earlier than 24 hours after deposit!'
               d. 'Your service is already completed or withdrawn'
               e. 'Your already get your service'
               f. 'Only Arbitor can unlock any deposit'
               g. 'There is no deposit available to this _depositor'
               h. 'Service is not delivered yet'
               i. 'This Depositor's service is already completed or withdrawn'

   ***Note: To understand the 'reason string' look into the 'EscrowFinal.sol' contract file.

               
####################################################################################
If you have any problem feel free to contact with me: 
         Email: mahabubalahi9531@gmail.com