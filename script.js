const board = document.getElementById("game-board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      status.textContent = `${cells[a]} wins! 🎉`;
      return;
    }
  }

  if (!cells.includes("")) {
    gameActive = false;
    status.textContent = "It's a draw! 😐";
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!cells[index] && gameActive) {
    cells[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  cells.fill("");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  drawBoard();
}

function drawBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleClick);
    board.appendChild(div);
  });
}

resetBtn.addEventListener("click", resetGame);
resetGame();
