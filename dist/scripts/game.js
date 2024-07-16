async function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 0 || guess > 255) {
        alert('Please enter a valid number between 0 and 255.');
        return;
    }

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const contractAddress = '0x51F38364A1aFa0D6EaBd0f8b7cE87f01Dd673C68'; // Update with your deployed contract address
            const contractABI = [
                {
                    "inputs": [
                        {
                            "internalType": "uint8",
                            "name": "number",
                            "type": "uint8"
                        }
                    ],
                    "name": "guess",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];

            const contract = new web3.eth.Contract(contractABI, contractAddress);

            const result = await contract.methods.guess(guess).call();

            document.getElementById('result').textContent = result;
        } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById('result').textContent = 'An error occurred. Please try again.';
        }
    } else {
        console.error('Web3 provider not found. Please install MetaMask.');
        document.getElementById('result').textContent = 'Web3 provider not found. Please install MetaMask.';
    }
}

// Fetch data when the window loads
window.onload = () => {
    document.getElementById('result').textContent = 'Enter a number and submit your guess!';
};
