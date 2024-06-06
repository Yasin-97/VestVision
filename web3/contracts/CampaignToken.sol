// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ITokenData.sol";

contract ProjectToken is ERC20, ITokenData {
    address public _projectOwner;

    string private _name;
    string private _symbol;
    uint256 private _totalSupply;
    uint256 private _projectOwnerShare;
    address private _teamAddress;
    uint256 private _teamShare;
    address private _advisorAddress;
    uint256 private _advisorShare;
    address private _earlyInvestorsAddress;
    uint256 private _earlyInvestorsShare;

    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 projectOwnerShare,
        address teamAddress,
        uint256 teamShare,
        address advisorAddress,
        uint256 advisorShare,
        address earlyInvestorsAddress,
        uint256 earlyInvestorsShare
    ) ERC20(name, symbol) {
        require(
            projectOwnerShare +
                teamShare +
                advisorShare +
                earlyInvestorsShare <=
                100,
            "Total share exceeds 100%"
        );

        // Set the project owner
        _projectOwner = msg.sender;
        _name = name;
        _symbol = symbol;
        _totalSupply = totalSupply;
        _projectOwnerShare = projectOwnerShare;
        _teamAddress = teamAddress;
        _teamShare = teamShare;
        _advisorAddress = advisorAddress;
        _advisorShare = advisorShare;
        _earlyInvestorsAddress = earlyInvestorsAddress;
        _earlyInvestorsShare = earlyInvestorsShare;

        // Calculate tokens for each party
        uint256 ownerTokens = (totalSupply * projectOwnerShare) / 100;
        uint256 teamTokens = (totalSupply * teamShare) / 100;
        uint256 advisorTokens = (totalSupply * advisorShare) / 100;
        uint256 reserveTokens = (totalSupply * earlyInvestorsShare) / 100;

        // Calculate public tokens by subtracting allocated tokens from initial supply
        uint256 publicTokens = totalSupply -
            (ownerTokens + teamTokens + advisorTokens + reserveTokens);

        // Mint tokens for each party
        _mint(_projectOwner, ownerTokens);
        if (teamAddress != address(0) && teamShare > 0) {
            _mint(teamAddress, teamTokens);
        }
        if (advisorAddress != address(0) && advisorShare > 0) {
            _mint(advisorAddress, advisorTokens);
        }
        if (earlyInvestorsAddress != address(0) && earlyInvestorsShare > 0) {
            _mint(earlyInvestorsAddress, reserveTokens);
        }
        // Mint the rest of the tokens to the contract for the public
        _mint(address(this), publicTokens);
    }

    function tokenData()
        external
        view
        override
        returns (
            string memory,
            string memory,
            uint256,
            address,
            uint256,
            address,
            uint256,
            address,
            uint256,
            address,
            uint256
        )
    {
        return (
            _name,
            _symbol,
            _totalSupply,
            _projectOwner,
            _projectOwnerShare,
            _teamAddress,
            _teamShare,
            _advisorAddress,
            _advisorShare,
            _earlyInvestorsAddress,
            _earlyInvestorsShare
        );
    }
}
