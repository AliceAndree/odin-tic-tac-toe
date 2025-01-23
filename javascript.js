let board = [];
let chosenType;
let computerType;

/* Gameboard Initialisation */

const Gameboard = (() => {
  const createGameboard = (squareAmount) => {
    const htmlBoard = document.querySelector("#board");

    for (let i = 0; i <= 3; i++) {
      const lineSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      const linePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      lineSvg.setAttribute("width", "15");
      lineSvg.setAttribute("height", "400");
      lineSvg.setAttribute("viewBow", "0 0 15 400");
      lineSvg.setAttribute("fill", "#F1E3D3");

      linePath.setAttribute("d", "M7.5 393L7.49998 8.00001");
      linePath.setAttribute("stroke", "white");
      linePath.setAttribute("stroke-width", "15");
      linePath.setAttribute("stroke-linecap", "round");

      lineSvg.appendChild(linePath);
      htmlBoard.appendChild(lineSvg);
    }

    const svgLines = htmlBoard.getElementsByTagName("svg");
    for (let i = 0; i < svgLines.length; i++) {
      svgLines[i].id = `line-${i + 1}`;
    }

    for (let i = 0; i <= 8; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute(`id`, `cell-${i + 1}`);
      htmlBoard.appendChild(cell);
    }

    for (let i = 0; i < squareAmount; i++) {
      board[i] = [];
      for (let j = 0; j < squareAmount; j++) {
        board[i][j] = null;
      }
    }
    return board;
  };
  return { createGameboard };
})();

Gameboard.createGameboard(3);

/* Player Instance */

const Player = (() => {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      chosenType = e.target.value;
      if (chosenType === "x") {
        computerType = "o";
      } else {
        computerType = "x";
      }
    });
  });
})();

const GameFlow = (() => {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const cellId = cell.id;
      console.log(cellId); // REMOVE
      return cellId;
    });
  });

  const humanPlayGame = (row, column) => {
    if (!board[row][column]) {
      board[row][column] = chosenType;
      return computerPlayGame();
    } else {
      console.log(`Please choose another box`);
    }
    return board;
  };

  const computerPlayGame = () => {
    function checkEmptyBox() {
      const randomRowIndex = Math.floor(Math.random() * 3);
      const randomColumnIndex = Math.floor(Math.random() * 3);

      if (!board[randomRowIndex][randomColumnIndex]) {
        board[randomRowIndex][randomColumnIndex] = computerType;
        win();
      } else if (
        !board[0].includes(null) &&
        !board[1].includes(null) &&
        !board[2].includes(null)
      ) {
        win();
      } else {
        console.log(`board[${randomRowIndex}][${randomColumnIndex}]`);
        checkEmptyBox();
        win();
      }
    }
    checkEmptyBox();
    return board;
  };

  function win() {
    const firstRow = board[0];
    const secondRow = board[1];
    const thirdRow = board[2];

    if (
      // first row wins
      (!firstRow.includes(null) &&
        firstRow[0] === firstRow[1] &&
        firstRow[0] === firstRow[2]) ||
      // first column wins
      (firstRow[0] !== null &&
        firstRow[0] === secondRow[0] &&
        firstRow[0] === thirdRow[0]) ||
      // diagonal from upper left to bottom right wins
      (firstRow[0] !== null &&
        firstRow[0] === secondRow[1] &&
        firstRow[0] === thirdRow[2])
    ) {
      getWinner(firstRow[0]);
    } else if (
      // second row wins
      (!secondRow.includes(null) &&
        secondRow[0] === secondRow[1] &&
        secondRow[0] === secondRow[2]) ||
      // second column wins
      (firstRow[1] !== null &&
        firstRow[1] === secondRow[1] &&
        firstRow[1] === thirdRow[1])
    ) {
      getWinner(secondRow[1]);
    } else if (
      // third row wins
      (!thirdRow.includes(null) &&
        thirdRow[0] === thirdRow[1] &&
        thirdRow[0] === thirdRow[2]) ||
      // third column wins
      (firstRow[2] !== null &&
        firstRow[2] === secondRow[2] &&
        firstRow[2] === thirdRow[2])
    ) {
      getWinner(thirdRow[2]);
    } else if (
      // diagonal from bottom left to upper right wins
      thirdRow[0] !== null &&
      thirdRow[0] === secondRow[1] &&
      thirdRow[0] === firstRow[2]
    ) {
      getWinner(thirdRow[0]);
    }
    function getWinner(boardElement) {
      if (boardElement === chosenType) {
        console.log(`You Won !!`);
      } else {
        console.log("Computer Won");
      }
    }
  }

  return { humanPlayGame, computerPlayGame };
})();
