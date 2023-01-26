const Game = require('./universe.ts')

const game = new Game()
let currentState = game.init()

for (let x = 0; x < 5; x++) {
  const prevState = currentState
  console.log(currentState.aliveCells)
  currentState = game.iterate(prevState.aliveCells)
}
