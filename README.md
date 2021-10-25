# Crypto Projects - Smart contracts & Javascript

To run the code, you will need hardhat installed locally. Change the Alchemy/Infura keys to match your keys. You will also be required to install openZeppelin, ethers-hardhat. See hardhatconfig.js for other requirements.
Questions for ref- 
Q1 - smart contract treasury that exchanges tokens with its own token - Automatically
Q2 - ERC20 token that gives 1% incentive to existing holders on every transaction

## Setting up response to Q1 - Smart Contract treasury
 
1. Compile the hardhat project. On gitbash / command prompt, run the following command
   ````
   npx hardhat compile 
   ````

2. Create Fake WETH and USDC from ERC20 contract. Did not use the implementations found in [https://github.com/WETH10/WETH10/blob/main/contracts/WETH10.sol]. Use the script deployTreasuryTokens.js.

On gitbash / command prompt, run the following command

````
npx hardhat --network ropsten run scripts/deployTreasuryTokens.js
````

3. Note the addresses of the 3 contracts deployed - FeeCollector (Treasury), WETH and USDC. Send a few WETH and USDC to your wallet. Lets call this wallet the "Deployer Wallet".

4. Send a few WETH and USDC to another wallet, call this the "User Wallet". Make sure you have add all the contracts to the User Wallet - so you can see it on your metamask.

5. Start the script "treasuryListener.js". You will need to use same address as the one that you used to deploy. the code will take care of this aspect.
   
````
npx hardhat --network ropsten run scripts/treasuryListener.js
````

6. Transfer 1 WETH from the User Wallet to the Address of the FeeCollector contract. Observe the listener script. Once the transaction is completed you will get a tx hash.
   You would have gotten Fee tokens in your user wallet automatically. Quantity of tokens = 1 * Price of ETH.

## Setting up response to Q2 - Smart Contract treasury

1. Compile the hardhat project. On gitbash / command prompt, run the following command
   ````
   npx hardhat compile 
   ````
2. Deploy the script locally and on ropsten using the following commands:


````
npx hardhat --network ropsten run scripts/deployInflationToken.js
npx hardhat --network localhost run scripts/deployInflationToken.js
````
(For local deployment, please run 
````
npx hardhat node
```` 
in another bash/cmd)

3. Verify that the hardhat tests work. Basic tests like verifying token name, totalsupply, transfer and 1% increased balance post transfer are implemented.

````
npx hardhat test
````

4. <b>Playing with the code on Ropsten</b>: Note the address of the Inflation Token from step 2. Add this to multiple wallets. Send the token to these wallets. Upon every transfer you will note that the balance on every account goes by 1%. An example deployment token has been provided in the formal submission.
