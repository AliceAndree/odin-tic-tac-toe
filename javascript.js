let circle;
let cross;
let chosenType;
let computerType;

/* Gameboard Initialisation */

const Gameboard = (() => {
  const createGameboard = () => {
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

      lineSvg.classList.add("line");
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
  };

  const createSymbols = () => {
    circle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const circlePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );

    circle.classList.add("circle");
    circle.setAttribute("width", "93");
    circle.setAttribute("height", "93");
    circle.setAttribute("viewBox", "0 0 93 93");
    circle.setAttribute("fill", "none");

    circlePath.setAttribute("cx", "46.5");
    circlePath.setAttribute("cy", "46.5");
    circlePath.setAttribute("r", "39");
    circlePath.setAttribute("stroke", "#21D4B0");
    circlePath.setAttribute("stroke-width", "15");

    circle.appendChild(circlePath);

    cross = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const crossPathOne = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    const crossPathTwo = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    cross.classList.add("cross");
    cross.setAttribute("width", "93");
    cross.setAttribute("height", "94");
    cross.setAttribute("viewBox", "0 0 93 94");
    cross.setAttribute("fill", "none");

    crossPathOne.setAttribute("d", "M8.41272 8L85.1746 84.7619");
    crossPathOne.setAttribute("stroke", "#fa61a1");
    crossPathOne.setAttribute("stroke-width", "15");
    crossPathOne.setAttribute("stroke-linecap", "round");

    crossPathTwo.setAttribute("d", "M84.762 9.2381L8.00006 86");
    crossPathTwo.setAttribute("stroke", "#fa61a1");
    crossPathTwo.setAttribute("stroke-width", "15");
    crossPathTwo.setAttribute("stroke-linecap", "round");

    cross.appendChild(crossPathOne);
    cross.appendChild(crossPathTwo);

    chosenType = cross;
    computerType = circle;

    return circle, cross, chosenType;
  };
  return { createGameboard, createSymbols };
})();

Gameboard.createGameboard(3);
Gameboard.createSymbols();

/* Player Instance */

const Player = (() => {
  const getPlayerName = () => {
    const playerName = document.querySelector("#player").value;
    return playerName;
  };

  const buttons = document
    .querySelector("#symbol-buttons")
    .querySelectorAll("button");
  const cells = document.querySelectorAll(".cell");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (
        !cells[0].innerHTML &&
        !cells[1].innerHTML &&
        !cells[2].innerHTML &&
        !cells[3].innerHTML &&
        !cells[4].innerHTML &&
        !cells[5].innerHTML &&
        !cells[6].innerHTML &&
        !cells[7].innerHTML &&
        !cells[8].innerHTML
      ) {
        buttons.forEach((button) => button.classList.remove("active"));
        button.classList.add("active");
        chosenType = e.target.value;
        if (chosenType === "x") {
          chosenType = cross;
          computerType = circle;
        } else {
          chosenType = circle;
          computerType = cross;
        }
      }
    });
  });
  return { getPlayerName };
})();

const GameFlow = (() => {
  let playerWins = false;
  let computerWins = false;
  const resetButton = document.querySelector("#reset-button");
  const cells = document.querySelectorAll(".cell");
  const modal = document.querySelector("#modal");
  const winner = document.querySelector("#winner");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (cell.innerHTML === "") {
        const cellId = cell.id;
        let curentCell = document.querySelector(`#${cellId}`);
        const symbol = chosenType.cloneNode(true);
        curentCell.appendChild(symbol);

        if (!win() && !playerWins) {
          computerPlayGame();
        }
      }
    });
  });

  const computerPlayGame = () => {
    const cells = document.querySelectorAll(".cell");
    function checkEmptyBox() {
      const randomId = Math.floor(Math.random() * 9) + 1;
      const randomCell = document.querySelector(`#cell-${randomId}`);

      if (randomCell.innerHTML === "") {
        const symbol = computerType.cloneNode(true);
        randomCell.appendChild(symbol);
      } else if (
        cells[0].innerHTML &&
        cells[1].innerHTML &&
        cells[2].innerHTML &&
        cells[3].innerHTML &&
        cells[4].innerHTML &&
        cells[5].innerHTML &&
        cells[6].innerHTML &&
        cells[7].innerHTML &&
        cells[8].innerHTML
      ) {
        if (playerWins === false && computerWins === false)
          winner.textContent = "It's a Draw";
        setTimeout(function () {
          modal.showModal();
          resetGame();
        }, 500);
      } else {
        checkEmptyBox();
      }
      win();
    }
    checkEmptyBox();
  };

  function win() {
    if (
      // first row wins
      (cells[0].innerHTML &&
        cells[0].innerHTML === cells[1].innerHTML &&
        cells[0].innerHTML === cells[2].innerHTML) ||
      // first column wins
      (cells[0].innerHTML &&
        cells[0].innerHTML === cells[3].innerHTML &&
        cells[0].innerHTML === cells[6].innerHTML) ||
      // diagonal from upper left to bottom right wins
      (cells[0].innerHTML &&
        cells[0].innerHTML === cells[4].innerHTML &&
        cells[0].innerHTML === cells[8].innerHTML)
    ) {
      getWinner(cells[0]);
      return true;
    } else if (
      // second row wins
      (cells[3].innerHTML &&
        cells[3].innerHTML === cells[4].innerHTML &&
        cells[3].innerHTML === cells[5].innerHTML) ||
      // second column wins
      (cells[1].innerHTML &&
        cells[1].innerHTML === cells[4].innerHTML &&
        cells[1].innerHTML === cells[7].innerHTML)
    ) {
      getWinner(cells[4]);
      return true;
    } else if (
      // third row wins
      (cells[6].innerHTML &&
        cells[6].innerHTML === cells[7].innerHTML &&
        cells[6].innerHTML === cells[8].innerHTML) ||
      // third column wins
      (cells[2].innerHTML &&
        cells[2].innerHTML === cells[5].innerHTML &&
        cells[2].innerHTML === cells[8].innerHTML)
    ) {
      getWinner(cells[8]);
      return true;
    } else if (
      // diagonal from bottom left to upper right wins
      cells[6].innerHTML &&
      cells[6].innerHTML === cells[4].innerHTML &&
      cells[6].innerHTML === cells[2].innerHTML
    ) {
      getWinner(cells[6]);
      return true;
    }

    function getWinner(boardElement) {
      boardElement = boardElement.childNodes[0];

      if (boardElement.isEqualNode(chosenType)) {
        playerWins = true;
        if (Player.getPlayerName()) {
          winner.textContent = `${Player.getPlayerName()} Wins`;
        } else {
          winner.textContent = "You Win";
        }
      } else {
        computerWins = true;
        winner.textContent = "Computer Wins";
      }
      setTimeout(function () {
        modal.showModal();
        resetGame();
      }, 500);
    }
  }

  function resetGame() {
    cells.forEach((cell) => {
      cell.innerHTML = "";
    });
    document.querySelector("#player").value = "";
    playerWins = false;
    computerWins = false;
  }

  resetButton.addEventListener("click", () => {
    resetButton.classList.add("active");
    setTimeout(() => {
      resetButton.classList.remove("active");
    }, 200);
    resetGame();
  });

  modal.addEventListener("click", () => {
    modal.close();
  });

  return { computerPlayGame };
})();
