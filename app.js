const container = document.querySelector(".container");
const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const suich = document.querySelector(".suich");

start.addEventListener("click", (e) => {
  let saveName = prompt("Please type your name!");
  const player = Player(saveName);
  const CPU = Player("CPU");
  displayRefresher();
});

const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const addMarker = () => console.table(board);
  const winChecker = () => {
    let winner = "none";
    let winChecks = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],
      [board[0][0], board[1][1], board[2][2]],
      [board[2][0], board[1][1], board[0][2]],
    ];
    const XWins = (cell) => cell === "X";
    const OWins = (cell) => cell === "O";
    const Tie = (cell) => cell != "";
    const display = document.querySelector(".display__Score");
    for (let i = 0; i < winChecks.length; i++) {
      if (winChecks[i].every(XWins)) {
        winner = "X";
        display.textContent = `Winner: ${winner}`;
        container.className += " disable";
      } else if (winChecks[i].every(OWins)) {
        winner = "O";
        display.textContent = `Winner: ${winner}`;
        container.className += " disable";
      } else if (
        board[0].every(Tie) &&
        board[1].every(Tie) &&
        board[2].every(Tie)
      ) {
        winner = "Tie";
        display.textContent = `Winner: ${winner}`;
        container.className += " disable";
      }
    }
    return winner;
  };

  return { board, addMarker, winChecker };
})();

const displayRefresher = () => {
  let row = 0;
  let column = 0;
  const { board } = gameBoard;
  board.forEach((e) => {
    e.forEach((e) => {
      const div = document.createElement("div");
      div.setAttribute("data-row", row);
      div.setAttribute("data-column", column);
      div.className = "gameBoardSquare";
      div.textContent = e;
      div.addEventListener("click", (e) => {
        if (suich.className == "suich x") {
          if (board[e.target.dataset.row][e.target.dataset.column] == "") {
            e.target.textContent = "X";
            board[e.target.dataset.row][e.target.dataset.column] = "X";
          }
          gameBoard.winChecker();
        } else if (suich.className == "suich o") {
          if (board[e.target.dataset.row][e.target.dataset.column] == "") {
            e.target.textContent = "O";
            board[e.target.dataset.row][e.target.dataset.column] = "O";
          }
          gameBoard.winChecker();
        }
      });
      container.appendChild(div);
      column++;
      if (column > 2) {
        column = 0;
        row++;
      }
    });
  });
};

const Player = (name) => {
  this.name = name;
  score = "0";
  const sayMyScore = () => console.log(score);
  const editScore = (newScore) => (score = newScore);
  const sayMyName = () => console.log(name);

  return { sayMyName, sayMyScore, editScore, name };
};
