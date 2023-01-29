const container = document.querySelector(".container ");
const start = document.querySelector(".start");
const restart = document.querySelector(".restart");
const swap = document.querySelector(".swap");

swap.addEventListener("click", (e) => {
  if (swap.className == "swap x") swap.className = "swap o";
  else if (swap.className == "swap o") swap.className = "swap x";
});

/* gameBoard module, it's basically a factory function that calls itself at the end of it's definition, later on i can call any method i created within the gameBoard factory by just writing gameBoard.method();. */
const gameBoard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  /* winChecker consists of a function that checks whether or not someone has a winning combination on the board, this function gets called everytime a player makes a move. */
  const boardSetter = () => {
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
          if (
            board[e.target.dataset.row][e.target.dataset.column] == "" &&
            swap.className == "swap x"
          ) {
            e.target.textContent = "X";
            board[e.target.dataset.row][e.target.dataset.column] = "X";
            gameFlow.winCheck();
            if (container.className != "container disable") gameFlow.cpuMove();
          } else if (
            board[e.target.dataset.row][e.target.dataset.column] == "" &&
            swap.className == "swap o"
          ) {
            e.target.textContent = "O";
            board[e.target.dataset.row][e.target.dataset.column] = "O";
            gameFlow.winCheck();
            if (container.className != "container disable") gameFlow.cpuMove();
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

  return { board, boardSetter };
})();

const gameFlow = (() => {
  const startMatch = () => {
    let saveName = prompt("Please type your name!");
    const player = Player(saveName);
    const CPU = Player("CPU");
    start.className = "start disable";
    gameBoard.boardSetter();
  };

  const restartMatch = () => {
    displayManager.clearBoard();
    container.className = "container";
    start.className = "start";
  };
  //#TODO
  const cpuMove = (playerCPU) => {
    let gameBoardSquare = document.querySelectorAll(".gameBoardSquare");
    gameBoardSquare = [...gameBoardSquare].filter((e) => e.textContent == "");
    let randomIndex = Math.floor(Math.random() * gameBoardSquare.length);
    console.log(gameBoardSquare[randomIndex]);
    if (gameBoardSquare[randomIndex].textContent == "") {
      gameBoardSquare[randomIndex].textContent = "O";
      gameBoard.board[gameBoardSquare[randomIndex].dataset.row][
        gameBoardSquare[randomIndex].dataset.column
      ] = "O";
      gameFlow.winCheck();
    } else cpuMove();
  };

  const winCheck = () => {
    let { board } = gameBoard;
    // Define the winner variable.
    let winner = "none";
    /* the winChecks array consists of a multidimensional array containing every possible win condition in Tic Tac Toe. */
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
    // Define the callback functions that'll be used further down.
    const XWins = (cell) => cell === "X";
    const OWins = (cell) => cell === "O";
    const Tie = (cell) => cell != "";
    // Select the game score display
    const display = document.querySelector(".display__Score");
    /* For each win combination on the winChecks array we use the "every()" function to check whether one of the combinations is full of either "X", "O" or "".
    Depending on the outcome of the game the "winner" variable will change and the contents of the display will change to give visual feedback to the user. */
    for (let i = 0; i < winChecks.length; i++) {
      if (winChecks[i].every(XWins)) {
        winner = "X";
        container.className = "container disable";
        console.log("winner x");
        console.table(gameBoard.board);
      } else if (winChecks[i].every(OWins)) {
        winner = "O";
        container.className = "container disable";
        console.log("winner o");
        console.table(gameBoard.board);
      } else if (
        board[0].every(Tie) &&
        board[1].every(Tie) &&
        board[2].every(Tie)
      ) {
        winner = "Tie";
        console.log("tie");
        container.className = "container disable";
      }
    }
    return winner;
  };

  return { winCheck, startMatch, restartMatch, cpuMove };
})();

const displayManager = (() => {
  const clearBoard = () => {
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
  };
  return { clearBoard };
})();

const Player = (name) => {
  this.name = name;
  score = "0";
  const sayMyScore = () => console.log(score);
  const editScore = (newScore) => (score = newScore);
  const sayMyName = () => console.log(name);
  const XorO = (e) => {
    if (swap.className == "swap x") return "o";
    else if (swap.className == "swap o") return "x";
  };
  const editXorO = () => {
    if (swap.className == "swap x") swap.className == "swap o";
    else swap.className == "swap o";
  };

  return { sayMyName, sayMyScore, editScore, XorO, editXorO, name };
};

start.addEventListener("click", gameFlow.startMatch);
restart.addEventListener("click", gameFlow.restartMatch);
