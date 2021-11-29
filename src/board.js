class Board {
  constructor() {
    this.board = ['', '', '', '', '', '', '', '', ''];
  }

  getBoardCell(index) {
    if (index > this.board.length) return;
    return this.board[index];
  }

  setBoardCell(index, sign) {
    if (index > this.board.length) return;
    this.board[index] = sign;
  }

  resetBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = '';
    }
  }
}

export default Board;
