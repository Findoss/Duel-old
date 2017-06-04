class Utils {

  constructor() {}

  resizeGame(game) {
    game.scale.scaleMode = 2;
    game.scale.setShowAll();
    game.scale.refresh();
  }

}

var utils = new Utils();


/*
let t0 = performance.now();
  //  function() {}
let t1 = performance.now();
console.log((t1 - t0).toFixed(4), "ms");
*/