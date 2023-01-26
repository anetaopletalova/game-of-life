import {IIteration, IPosition} from './types'
const {initAlivePercentage, gamePlanWidth, gamePlanHeight} = require('./config')

class Cell {
  position: IPosition
  isAlive: boolean

  constructor(x: number, y: number, isAlive: boolean) {
    this.position = {x, y}
    this.isAlive = isAlive
  }

  setState(isAlive: boolean) {
    this.isAlive = isAlive
  }
}

class GamePlan {
  cols: number
  rows: number

  constructor(cols: number = gamePlanWidth, rows: number = gamePlanHeight) {
    this.cols = cols
    this.rows = rows
  }

  initMap(randomize: boolean): Cell[][] {
    const map = [...Array(this.rows)].map((_, idx) =>
      Array(this.cols)
        .fill(undefined)
        .map((_, i) => {
          const rand = Math.random()
          let randomAlive = false
          if (randomize && rand < initAlivePercentage) {
            randomAlive = true
          }
          return new Cell(idx, i, randomAlive)
        }),
    )

    return map
  }

  init(): IIteration {
    const currentMap = this.initMap(true)
    const aliveCells: IPosition[] = this.getAliveCellsPosFromMap(currentMap)

    return {width: this.cols, height: this.rows, aliveCells}
  }

  createMap(prevAliveCells: IPosition[]): Cell[][] {
    const currentMap = this.initMap(false)
    prevAliveCells.forEach((cell) => {
      currentMap[cell.x][cell.y].isAlive = true
    })
    return currentMap
  }

  getAliveCellsPosFromMap(map: Cell[][]): IPosition[] {
    const alive: IPosition[] = []
    map.flat().forEach((cell) => cell.isAlive && alive.push(cell.position))
    return alive
  }

  iterate(prevAliveCells: IPosition[]): IIteration {
    const prevMap = this.createMap(prevAliveCells)

    const newMap = JSON.parse(JSON.stringify(prevMap))
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let numOfLivingNeighbors = 0

        for (let m = -1; m < 2; m++) {
          for (let n = -1; n < 2; n++) {
            if (
              i + m >= 0 &&
              i + m < this.rows &&
              j + n >= 0 &&
              j + n < this.cols
            ) {
              prevMap[i + m][j + n].isAlive && (numOfLivingNeighbors += 1)
            }
          }
        }

        if (prevMap[i][j].isAlive) numOfLivingNeighbors -= 1

        if (prevMap[i][j].isAlive && numOfLivingNeighbors < 2)
          newMap[i][j].isAlive = false
        else if (prevMap[i][j].isAlive && numOfLivingNeighbors > 3)
          newMap[i][j].isAlive = false
        else if (!prevMap[i][j].isAlive && numOfLivingNeighbors == 3)
          newMap[i][j].isAlive = true
      }
    }

    const aliveCells: IPosition[] = this.getAliveCellsPosFromMap(newMap)

    return {width: this.cols, height: this.rows, aliveCells}
  }
}

module.exports = GamePlan
