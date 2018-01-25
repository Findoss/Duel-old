// vendor
const app = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const log = require('../libs/log');

// configs
const runes = require('./configs/runes');
const server = require('./configs/server');
const crypto = require('crypto');

// classes
const Changes = require('./classes/changes');
const Board = require('./classes/board');
const Lobby = require('./classes/lobby');
const Step = require('./classes/step');
const Player = require('./classes/Player');

const lobby = new Lobby();
const game = {};

io.on('connection', (socket) => {
  const userName = socket.id.slice(0, 5);
  log('server', `[.] ${userName} connected`);

  socket.on('msg', (msg) => {
    log('client', `[→] msg: ${msg}`);
  });

  socket.on('lobby/ready', (name) => {
    lobby.addPlayer(socket, name);
    if (lobby.isThereAnEnemy()) {
      //
      const id = crypto.randomBytes(4).toString('hex').toUpperCase();

      const players = lobby.pairOfPlayers();
      players[0].socket.join(id);
      players[1].socket.join(id);

      game[id] = {
        changes: new Changes(),
        board: new Board(runes, id),
        playerOne: new Player(players[0].name),
        playerTwo: new Player(players[1].name),
        step: new Step(),
        round: 0
      };

      game[id].changes.add('loadGame', {
        gameID: id,
        newBoard: game[id].board.getBoard(),
        playerOne: game[id].playerOne.getPlayer(),
        playerTwo: game[id].playerTwo.getPlayer(),
        step: game[id].step.getStep()
      });
      io.to(id).emit('changes', game[id].changes.release());
      //
    } else {
      socket.emit('changes', [{ event: 'waitOpponent', data: 0 }]);
    }
  });

  socket.on('game/connect', (id) => {
    if (Object.hasOwnProperty.call(game, id)) {
      socket.join(id);
      game[id].changes.add('loadGame', {
        gameID: id,
        newBoard: game[id].board.getBoard(),
        playerOne: game[id].playerOne.getPlayer(),
        playerTwo: game[id].playerTwo.getPlayer(),
        step: game[id].step.getStep()
      });
      socket.emit('changes', game[id].changes.release());
    } else {
      socket.emit('changes', [{ event: 'noGame', data: 0 }]);
    }
  });

  socket.on('disconnect', () => {
    lobby.deletePlayer(socket);
    log('server', `[.] ${userName} disconnected`);
  });

  // GAME
  socket.on('board/suggestion', (id) => {
    game[id].changes.add('showSuggestion', game[id].board.findMoves());
    socket.emit('changes', game[id].changes.release());
  });

  socket.on('board/swap', (id, coordOne, coordTwo) => {
    if (!Board.isEqualCoords(coordOne, coordTwo) &&
         Board.isAdjacent(coordOne, coordTwo)) {
      game[id].changes.add('swapRune', game[id].board.swap(coordOne, coordTwo));
      game[id].board.findClusters(coordOne);
      game[id].board.findClusters(coordTwo);
      if (game[id].board.isClusters()) {
        do {
          game[id].changes.add('deleteRune', game[id].board.deleteClusters());
          game[id].changes.add('dropRunes', game[id].board.drop());
          game[id].changes.add('refillBoard', game[id].board.refill());
          game[id].board.findAllClusters();
        } while (game[id].board.isClusters());
        game[id].changes.add('nextStep', game[id].step.nextStep());
      } else {
        game[id].changes.add('swapRune', game[id].board.swap(coordOne, coordTwo));
        game[id].board.cleanClusters();
      }
    } else {
      io.to(id).emit('msg', 'error');
    }
    io.to(id).emit('changes', game[id].changes.release());
  });
});

http.listen(server.port, () => {
  log('server', `listening on localhost:${server.port}`);
});
