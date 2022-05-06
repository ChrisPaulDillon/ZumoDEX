pragma solidity ^0.8.0;

import "./TestTokenDex.sol";

contract DexSwap {
    TestTokenDex public token;
    uint256 public buyRate = 10000;
    uint256 public sellRate = 5000;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(TestTokenDex _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        // Calculate the number of tokens to buy
        uint256 tokenAmount = msg.value / buyRate;

        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, buyRate);
    }

    function sellTokens(uint256 _amount) public {
        // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount);

        // Calculate the amount of Ether to redeem
        uint256 etherAmount = _amount * buyRate;

        // Require that EthSwap has enough Ether
        require(address(this).balance >= etherAmount);

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, buyRate);
    }

    //allows ether to be freely sent to the contract 
    receive () external payable { }   
}
