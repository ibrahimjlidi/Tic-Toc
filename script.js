// Selecting elements
const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

// Game constants
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

let isOTurn;

// Initializing the game
startGame();

// Restart button event listener
restartButton.addEventListener('click', startGame);

// Function to start the game
function startGame() {
  isOTurn = false;
  cells.forEach(cell => {
    cell.classList.remove(X_CLASS, O_CLASS);
    cell.textContent = '';
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setStatusDisplay(`Player X's turn`);
}

// Handling cell click
function handleClick(e) {
  const cell = e.target;
  const currentClass = isOTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setStatusDisplay(`Player ${isOTurn ? "O" : "X"}'s turn`);
  }
}

// Placing mark in the cell
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

// Swapping turns
function swapTurns() {
  isOTurn = !isOTurn;
}

// Updating status display
function setStatusDisplay(message) {
  statusDisplay.textContent = message;
}

// Checking for win
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => 
    combination.every(index => cells[index].classList.contains(currentClass))
  );
}

// Checking for draw
function isDraw() {
  return [...cells].every(cell => 
    cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
  );
}

// Ending the game
function endGame(draw) {
  if (draw) {
    setStatusDisplay('Draw!');
  } else {
    setStatusDisplay(`Player ${isOTurn ? "O" : "X"} Wins!`);
  }
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });
}
