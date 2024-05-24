// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface ITokenData {
    function tokenData()
        external
        view
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
        );
}
