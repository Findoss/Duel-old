// vendor
const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)
const log = require('../libs/log')

// configs
const runes = require('./configs/runes')
const crypto = require('crypto')

// classes
const Changes = require('./classes/changes')
const Board = require('./classes/board')
const Lobby = require('./classes/lobby')

const lobby = new Lobby()
const game = {}

io.on('connection', (socket) => {
  let userName = socket.id.slice(0, 5)
  log('server', `[.] ${userName} connected`)

  socket.on('msg', (msg) => {
    log('client', `[→] msg: ${msg}`)
  })

  socket.on('lobby/ready', () => {
    if (lobby.isWaitOpponent()) {
      //
      let id = crypto.randomBytes(8).toString('hex').toUpperCase()
      console.log(id)

      game[id] = {
        changes: new Changes(),
        board: new Board(runes, id)
      }

      let socketOpp = lobby.shiftPlayer()

      socketOpp.join(id)
      socket.join(id)

      game[id].changes.add('loadBoard', {id, newBoard: game[id].board.generationBoard()})

      io.to(id).emit('changes', game[id].changes.release())
    } else {
      lobby.addPlayer(socket)
      socket.emit('changes', [{event: 'waitOpponent', data: 0}])
    }
  })

  socket.on('board/suggestion', (id) => {
    game[id].changes.add('showSuggestion', game[id].board.findMoves())
    io.to(id).emit('changes', game[id].changes.release())
  })

  socket.on('board/swap', (id, coordOne, coordTwo) => {
    if (!game[id].board.isEqualCoords(coordOne, coordTwo) &&
         game[id].board.isAdjacent(coordOne, coordTwo)) {
      game[id].changes.add('swapRune', game[id].board.swap(coordOne, coordTwo))
      game[id].board.findClusters(coordOne)
      game[id].board.findClusters(coordTwo)
      if (game[id].board.isClusters()) {
        do {
          game[id].changes.add('deleteRune', game[id].board.deleteClusters())
          game[id].changes.add('dropRunes', game[id].board.drop())
          game[id].changes.add('refillBoard', game[id].board.refill())
          game[id].board.findAllClusters()
        } while (game[id].board.isClusters())
      } else {
        game[id].changes.add('swapRune', game[id].board.swap(coordOne, coordTwo))
        game[id].board.cleanClusters()
      }
    } else {
      io.to(id).emit('msg', 'error')
    }
    io.to(id).emit('changes', game[id].changes.release())
  })

  socket.on('disconnect', () => {
    lobby.shiftPlayer()
    log('server', `[.] ${userName} disconnected`)
  })
})

http.listen(8080, () => {
  log('server', 'listening on localhost:8080')
})
