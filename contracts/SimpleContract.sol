//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract SimpleContract{
    event MyEvent (
        uint indexed id,
        uint indexed date,
        string value
    );

    uint nextID;
    string private value;

    constructor(string memory _value) {
        console.log("Deploying a Simple Contract with value :", _value);
        value = _value;
    }

    function emitEvent() external {
        emit MyEvent(nextID,block.timestamp,value);
        nextID++;
    }
}