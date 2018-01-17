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
    io.emit('board/load', board.generationBoard())
  })

  socket.on('board/suggestion', () => {
    io.emit('board/suggestion', board.findMoves())
  })

  socket.on('board/swap', (coordOne, coordTwo) => {
    if (!board.isEqualCoords(coordOne, coordTwo) &&
         board.isAdjacent(coordOne, coordTwo)) {
      board.swap(coordOne, coordTwo)
      board.findClusters(coordOne)
      board.findClusters(coordTwo)
      if (board.isClusters()) {
        changes.add('board/swap', [coordOne, coordTwo])
        do {
          changes.add('board/deleteRunes', board.deleteClusters())
          changes.add('board/drop', board.drop())
          changes.add('board/refill', board.refill())
          board.findAllClusters()
        } while (board.isClusters())
        io.emit('changes', changes)
        changes.clean()
      } else {
        board.swap(coordOne, coordTwo)
        board.cleanClusters()
        io.emit('board/fakeSwap', [coordOne, coordTwo])
      }
    } else {
      io.emit('msg', 'error')
    }
  })

  socket.on('disconnect', () => {
    log('server', `[.] ${userName} disconnected`)
  })
})

http.listen(8080, () => {
  log('server', 'listening on localhost:8080')
})
