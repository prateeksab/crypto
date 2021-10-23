// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WETH is ERC20{
    address public owner;
    uint256 public balance;

    constructor() ERC20('wrappedETH', 'WETH') {
        _mint(msg.sender, 20000 * 10 ** decimals());
        owner = msg.sender;
    }
}