//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyTestContract is ERC20 {
    
    address public admin;
    address[] tokenHoldersDatabase;
    
    event TransferSent(address _from, address _destAddr, uint _amount);
    

    constructor() ERC20('Testy', 'TTY') {
        _mint(msg.sender, 20000 * 10 ** decimals());
        admin = msg.sender;
       tokenHoldersDatabase.push(msg.sender);
    }

 
    function mint(address to, uint amount) external{
        _mint(to, amount);
    }
    
    
    function burn(uint amount) external{
        _burn(msg.sender, amount); 
    }

    function updateBalance(address account) internal {
      uint256 increment =  balanceOf(account) * 1 / 100;
      _mint(account, increment);
   }

   function updateNewTokenHolderInDatabase(address account) internal {
       uint index = 0;
      for (index = 0; index < tokenHoldersDatabase.length; index++) {
         if (account == tokenHoldersDatabase[index]) {
            break;   
         }
      }
      
      if (index == tokenHoldersDatabase.length) {
          tokenHoldersDatabase.push(account);
      }
   }

   function updateTokenHoldersDeposit() internal {
        uint index = 0;
        for (index = 0; index < tokenHoldersDatabase.length; index++) {
            updateBalance(tokenHoldersDatabase[index]);
        }
   }

    function _transfer(address from, address to, uint256 value) override internal {
        super._transfer(from, to, value);
        updateNewTokenHolderInDatabase(to);
        updateTokenHoldersDeposit();
        emit TransferSent(from,to,value);
    }
}