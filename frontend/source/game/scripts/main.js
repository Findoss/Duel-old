var game = new Phaser.Game(1920, 1080, Phaser.AUTO);

//game.state.add('Boot', Boot);
//game.state.add('Preloader', Preloader);
//game.state.add('MainMenu', MainMenu);
game.state.add("PlayGame", PlayGame);

var param = {
  key: true
};

game.state.start("PlayGame", true, false, param);