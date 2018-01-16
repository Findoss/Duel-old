// vendor
const app = require('express')
const http = require('http').Server(app)
const io = require('socket.io')(http)

// configs
const runes = require('./configs/runes')
const key = 'generationRuneKey'

// classes
const Board = require('./classes/board')
const log = require('../libs/log')

const board = new Board(runes, key)

io.on('connection', (socket) => {
  let userName = socket.id.slice(0, 5)
  log('server', `[.] ${userName} connected`)

  socket.on('msg', (msg) => {
    log('client', `[→] msg: ${msg}`)
  })

  socket.on('lobby/ready', () => {
    log('server',
        '[.] generation board',
        '[←] new board',
        '[←] all suggestion')
    io.emit('generation', board.generationBoard())
    io.emit('suggestion', board.findMoves())
  })

  socket.on('board/pick', (coord) => {
    log('client', '[→] pick: ' + coord)
    if (board.isActiveRune()) {
      if (!board.isEqualCoords(coord, board.activeRune)) {
        if (board.isAdjacent(coord, board.activeRune)) {
          board.swap(coord, board.activeRune)
          board.findClusters(coord)
          board.findClusters(board.activeRune)
          if (board.isClusters()) {
            log('server',
                '[←] swap',
                '[←] deactive rune')
            io.emit('swap', [coord, board.activeRune])
            io.emit('deactive', board.deActiveRune())
            do {
              log('server',
                  '[←] delete rune clusters',
                  '[←] drop runes',
                  '[←] refill runes')
              io.emit('deleteRunes', board.deleteClusters())
              io.emit('drop', board.drop())
              io.emit('refill', board.refill())
              board.findAllClusters()
            } while (board.isClusters())
          } else {
            board.swap(coord, board.activeRune)
            log('server', '[←] fake swap')
            io.emit('swap', [coord, board.activeRune])
            io.emit('swap', [coord, board.activeRune])
          }
          log('server', '[←] all suggestion')
          io.emit('suggestion', board.findMoves())
        } else {
          log('server',
              '[←] deactive rune',
              '[←] pick new active rune')
          io.emit('deactive', board.deActiveRune())
          io.emit('active', board.pickActiveRune(coord))
        }
      } else {
        log('server', '[←] deactive rune')
        io.emit('deactive', board.deActiveRune())
      }
    } else {
      log('server', '[←] pick active rune')
      io.emit('active', board.pickActiveRune(coord))
    }
  })

  socket.on('disconnect', () => {
    log('server', '[.] user disconnected')
  })
})

http.listen(8080, () => {
  log('server', 'listening on localhost:8080')
})
