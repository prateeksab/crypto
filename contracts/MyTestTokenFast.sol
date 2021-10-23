//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract MyTestContractFast is ERC20 {
    
    address public admin;
    address private _previous_addr;
    mapping(address => address) private _address_link;
    constructor() ERC20('Testy Fast', 'TFY') {
        _mint(msg.sender, 20000 * 10 ** decimals());
        admin = msg.sender;
       _address_link[admin] = address(0);
       _previous_addr = admin;
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

   function updateNewTokenHolderInDatabaseFast(address account) internal {
       address link_addr = _address_link[account];
       if (address(0) == link_addr) {
           _address_link[_previous_addr] = account;
           _previous_addr = account;
       } 
   }
   
   function updateTokenHoldersDepositFast() internal {
       address holder_address = admin;
        do {
            updateBalance(holder_address);
            holder_address = _address_link[holder_address];
       } while (holder_address != address(0)); 
   }
   
    function _transfer(address from, address to, uint256 value) override internal {
        super._transfer(from, to, value);
        updateNewTokenHolderInDatabaseFast(to);
        updateTokenHoldersDepositFast();
    }
    
}