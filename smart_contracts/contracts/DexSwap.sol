pragma solidity ^0.8.0;

import "./TestTokenDex.sol";

contract DexSwap {
    TestTokenDex public token;
    uint256 private buyRate = 10000;
    uint256 private sellRate = 5000;
    uint256 private totalSales = 0;
    address private _owner = "";

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
        _owner = msg.sender;
    }

    function buyTokens() public payable {
        // Calculate the number of tokens to buy
        uint256 tokenAmount = msg.value / buyRate;

        require(token.balanceOf(address(this)) >= tokenAmount, "Error: Requested Amount Exceeds Contract Token Amount");

        uint256 weiTax = msg.value / 2;
        payable(_owner).transfer(weiTax);
        
        token.transfer(msg.sender, weiTax);

        totalSales = totalSales + 1;

        emit TokensPurchased(msg.sender, address(token), weiTax, buyRate);
    }

    function sellTokens(uint256 _amount) public {
        // User can't sell more tokens than they have
        require(token.balanceOf(msg.sender) >= _amount, "You do not have this many tokens!");

        // Calculate the amount of Ether to redeem
        uint256 etherAmount = _amount * buyRate;

        require(address(this).balance >= etherAmount, "Error: Not enough Ether in contract");

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);

        // Emit an event
        emit TokensSold(msg.sender, address(token), _amount, buyRate);
        totalSales = totalSales + 1;
    }

    function getMaximumBuy() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getMaximumSell() public view returns (uint256) {
        return address(this).balance;
    }

    function getBuyRate() public view returns (uint256) {
        return buyRate;
    }

    function getSellRate() public view returns (uint256) {
        return sellRate;
    }

     function getTotalSales() public view returns (uint256) {
        return totalSales;
    }

    //allows ether to be freely sent to the contract 
    receive () external payable { }   
}
