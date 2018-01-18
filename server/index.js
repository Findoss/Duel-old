// vendor
const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)

// configs
const runes = require('./configs/runes')
const key = 'generationRuneKey'

// classes
const Changes = require('./classes/changes')
const Board = require('./classes/board')
const log = require('../libs/log')

const changes = new Changes()
const board = new Board(runes, key)

io.on('connection', (socket) => {
  let userName = socket.id.slice(0, 5)
  log('server', `[.] ${userName} connected`)

  socket.on('msg', (msg) => {
    log('client', `[→] msg: ${msg}`)
  })

  socket.on('lobby/ready', () => {
    changes.add('loadBoard', board.generationBoard())
    io.emit('changes', changes.release())
  })

  socket.on('board/suggestion', () => {
    changes.add('showSuggestion', board.findMoves())
    io.emit('changes', changes.release())
  })

  socket.on('board/swap', (coordOne, coordTwo) => {
    if (!board.isEqualCoords(coordOne, coordTwo) &&
         board.isAdjacent(coordOne, coordTwo)) {
      changes.add('swapRune', board.swap(coordOne, coordTwo))
      board.findClusters(coordOne)
      board.findClusters(coordTwo)
      if (board.isClusters()) {
        do {
          changes.add('deleteRune', board.deleteClusters())
          changes.add('dropRunes', board.drop())
          changes.add('refillBoard', board.refill())
          board.findAllClusters()
        } while (board.isClusters())
      } else {
        changes.add('swapRune', board.swap(coordOne, coordTwo))
        board.cleanClusters()
      }
    } else {
      io.emit('msg', 'error')
    }
    io.emit('changes', changes.release())
  })

  socket.on('disconnect', () => {
    log('server', `[.] ${userName} disconnected`)
  })
})

http.listen(8080, () => {
  log('server', 'listening on localhost:8080')
})
