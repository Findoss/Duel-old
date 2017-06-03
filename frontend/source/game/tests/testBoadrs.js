function comparisonBoard(savedBoard, newBoard) {
  for (let i = 0; i < savedBoard.length; i++) {
    for (let j = 0; j < savedBoard[i].length; j++) {
      if (savedBoard[i][j] != newBoard[i][j].type) {
        return false
      }
    }
  }
  return true
}

const testBoard_1 = [
[1, 2, 3, 4, 5, 0],
[0, 1, 2, 3, 4, 5],
[0, 5, 0, 1, 2, 3],
[1, 5, 4, 0, 2, 1],
[5, 3, 1, 4, 1, 5],
[0, 1, 1, 2, 1, 1]];

const testBoard_1_drop = [
[0, 2, 0, 0, 5, 0],
[0, 1, 3, 4, 4, 5],
[0, 5, 2, 3, 2, 3],
[1, 5, 4, 1, 2, 1],
[1, 3, 1, 4, 1, 5],
[5, 1, 1, 2, 1, 1]];