// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Game {
    uint8 private secretNumber;

    constructor() {
        secretNumber = 7; // Set the secret number to 7 for simplicity
    }

    function guess(uint8 number) public view returns (string memory) {
        if (number == secretNumber) {
            return "Congratulations! You guessed the correct number!";
        } else {
            return "Sorry, try again!";
        }
    }
}
