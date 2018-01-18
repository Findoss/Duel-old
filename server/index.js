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
    changes.add('suggestion', board.findMoves())
    io.emit('changes', changes.release())
  })

  socket.on('board/swap', (coordOne, coordTwo) => {
    if (!board.isEqualCoords(coordOne, coordTwo) &&
         board.isAdjacent(coordOne, coordTwo)) {
      board.swap(coordOne, coordTwo)
      board.findClusters(coordOne)
      board.findClusters(coordTwo)
      if (board.isClusters()) {
        changes.add('swap', [coordOne, coordTwo])
        do {
          changes.add('delete', board.deleteClusters())
          changes.add('drop', board.drop())
          changes.add('refill', board.refill())
          board.findAllClusters()
        } while (board.isClusters())
      } else {
        board.swap(coordOne, coordTwo)
        board.cleanClusters()
        changes.add('fakeSwap', [coordOne, coordTwo])
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
