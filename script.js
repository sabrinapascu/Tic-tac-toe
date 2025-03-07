const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('buton');
const messageElement = document.getElementById('message');
const statusElement = document.getElementById('status');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] || checkWinner()) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    const winningCombination = checkWinner();
    if (winningCombination) {
        messageElement.textContent = `${currentPlayer} wins!`;
        highlightWinningCells(winningCombination);
        messageElement.classList.add('blink');
        statusElement.textContent = '';
    } else if (gameState.every(cell => cell)) {
        messageElement.textContent = 'Draw!';
        statusElement.textContent = '';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return combination;
        }
    }
    return null;
}

function highlightWinningCells(winningCombination) {
    winningCombination.forEach(index => {
        cells[index].style.backgroundColor = 'lightgreen';
    });
}

function restartGame() {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#f0f0f0';
    });
    messageElement.textContent = '';
    messageElement.classList.remove('blink');
    statusElement.textContent = `${currentPlayer}'s turn`;
}

