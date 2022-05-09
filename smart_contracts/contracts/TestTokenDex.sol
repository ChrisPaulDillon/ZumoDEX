pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestTokenDex is ERC20 {
    uint256 constant _initial_supply = 500000000000000 * (10**2);
    
    constructor() ERC20("TestTokenDex", "TTD") {
        _mint(msg.sender, _initial_supply);
    }

     function decimals() public view virtual override returns (uint8) {
        return 2;
    }
}
