class PlayGame extends Phaser.State {

  init() {
    this.game.time.advancedTiming = true;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    console.log("param = "+param.key);
  }

  preload() {
    // загрузка текстур рун
    for (let i = 0; i < 6; i++) {
      this.game.load.spritesheet(textureRune.fileName+i, texturePath+textureRune.fileName+i+".png", textureRune.size.width, textureRune.size.height, 12);
    }
  }

  create() {
    let testBoard = testBoard_5;

    var board = new Board();
    var view = new View(this);
    board.load(testBoard);
    view.renderBoard(board.board, textureRune, false);
    queue.push(view.renderBoard(board.board, textureRune, true, 10, 100));

    var board2 = new Board();
    var view2 = new View(this);
    var debug = new Debug(board2, view2);

    board2.onSwap.add(function (coordRunes) {
      console.log("по событию отдаем на рендр");
      queue.push(view2.renderSwap(coordRunes[0], coordRunes[1]));
    }, this);

    board.onSwap.add(function (coordRunes) {
      queue.push(view.renderSwap(coordRunes[0], coordRunes[1]));
    }, this);

    board2.load(testBoard);
    queue.push(view2.renderBoard(board2.board, textureRune, true, 10, 100, 900));

    console.log("отправлено в свап");
    board2.swap([2, 4], [3, 4]);
    //debug.boardConsole();
    //debug.boardViewConsole();
    

    console.log("отправлено в свап");
    board2.swap([2, 4], [3, 4]);
    
    //debug.boardConsole();
    //debug.boardViewConsole();

    //board2.deleteClusters();
    //queue.push(view2.renderDel(board2.board));
    //queue.push(view2.renderBoard(board2.board, textureRune, true, 10, 900));
/*  
    while (board2.findClusters().length) {

      board2.deleteClusters();
      queue.push(view2.renderDel(board2.board));
      debug.test("del", testBoard_5_del);

      board2.drop();
      //queue.push(view2.renderBoard(board2.board, textureRune, true, 10, 900));

      //board2.fill();
      //queue.push(view2.renderBoard(board2.board, textureRune, true, 10, 900));
    }

    debug.test("drop_2", testBoard_5_drop_2);
    console.log(board2.swap([4, 4], [2, 1]));
*/
  }

  update() {
    utils.resizeGame(this.game);
    queue.play();
  }

  render() {

    DEBUG && this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 20, 50, DEBUG_color, DEBUG_font);
  }

  runeClick(rune, param, coord) {
    console.log(coord);
  }
}