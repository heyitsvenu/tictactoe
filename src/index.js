import Player from './player';
import Board from './board';

const board = new Board();

class Controller {
  constructor() {
    this.playerX = new Player('X');
    this.playerO = new Player('O');
    this.round = 1;
    this.isOver = false;
  }

  getCurrentPlayerSign() {
    return this.round % 2 === 1
      ? this.playerX.getSign()
      : this.playerO.getSign();
  }

  checkWinner(cellIndex) {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winningConditions
      .filter((combination) => combination.includes(Number(cellIndex)))
      .some((posComb) =>
        posComb.every((index) => {
          return board.getBoardCell(index) === this.getCurrentPlayerSign();
        })
      );
  }

  playRound(cellIndex) {
    board.setBoardCell(cellIndex, this.getCurrentPlayerSign());
    if (this.checkWinner(cellIndex)) {
      // declare winner
      ui.setMessage(`Player ${this.getCurrentPlayerSign()} Won`);
      this.isOver = true;
      return;
    }
    if (this.round == 9) {
      // declare draw
      ui.setMessage(`It's a Draw`);
      this.isOver = true;
      return;
    }
    this.round++;
    ui.setTurnMessage(
      `<span class="player">${this.getCurrentPlayerSign()}</span>'s Turn`
    );
  }

  reset() {
    this.round = 1;
    this.isOver = false;
  }
}

const game = new Controller();

class UI {
  constructor() {
    this.cells = document.querySelectorAll('.cell');
    this.resultMessage = document.querySelector('.resultMessage');
    this.turnMessage = document.querySelector('.turnMessage');
    this.player = document.querySelector('.player');
    this.restartBtn = document.querySelector('.restartBtn');
  }

  updateBoard() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].textContent = board.getBoardCell(i);
    }
  }

  setMessage(message) {
    this.resultMessage.textContent = message;
    this.resultMessage.classList.add('won');
    this.turnMessage.style.display = 'none';
  }

  setTurnMessage(message) {
    this.turnMessage.innerHTML = message;
  }

  resetMessage() {
    this.resultMessage.classList.remove('won');
    this.turnMessage.style.display = 'block';
    this.setTurnMessage(`<span class="player">X</span>'s Turn`);
  }
}

const ui = new UI();

ui.cells.forEach((cell) => {
  cell.addEventListener('click', (e) => {
    if (game.isOver || e.target.textContent !== '') return;
    game.playRound(e.target.dataset.id);
    ui.updateBoard();
  });
});

ui.restartBtn.addEventListener('click', (e) => {
  board.resetBoard();
  game.reset();
  ui.updateBoard();
  ui.resetMessage();
});
