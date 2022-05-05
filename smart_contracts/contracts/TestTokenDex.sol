pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestTokenDex is ERC20 {
    uint256 constant initialSupply = 500000000000000 * (10**2);

    constructor() ERC20("TestTokenDex", "TTD") {
        _mint(msg.sender, initialSupply);
    }
}
