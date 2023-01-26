export interface IIteration {
  width: number
  height: number
  aliveCells: IPosition[]
}

export interface IPosition {
  x: number
  y: number
}

export interface IGamePlan {
  cols: number
  rows: number
  map: any[][]
}
