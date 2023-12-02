// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    mapping(address => uint256) public shares;  // Mapping to track the shares for each address

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event MintShares(address indexed shareholder, uint256 amount);
    event BurnShares(address indexed shareholder, uint256 amount);
    event TransferShares(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function deposit(uint256 _depositAmount) public payable {
        uint256 _previousBalance = balance;

        require(msg.sender == owner, "You are not the owner of this account");

        balance += _depositAmount;

        assert(balance == _previousBalance + _depositAmount);

        emit Deposit(_depositAmount);
    }

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        require(balance >= _withdrawAmount, "Insufficient balance");

        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));

        emit Withdraw(_withdrawAmount);
    }

    function mintShares(address _shareholder, uint256 _mintAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");

        shares[_shareholder] += _mintAmount;

        emit MintShares(_shareholder, _mintAmount);
    }

    function burnShares(address _shareholder, uint256 _burnAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        require(shares[_shareholder] >= _burnAmount, "Insufficient shares balance");

        shares[_shareholder] -= _burnAmount;

        emit BurnShares(_shareholder, _burnAmount);
    }

    function transferShares(address _to, uint256 _transferAmount) public {
        require(shares[msg.sender] >= _transferAmount, "Insufficient shares balance");

        shares[msg.sender] -= _transferAmount;
        shares[_to] += _transferAmount;

        emit TransferShares(msg.sender, _to, _transferAmount);
    }

    function getShareBalance(address _shareholder) public view returns (uint256) {
        return shares[_shareholder];
    }
}

