const input = require('./input.js')
const exampleInput = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
]

class Grid extends Array {
  constructor(width, height) {
    super(width)
    for (let i = 0; i < this.length; i++) {
      this[i] = new Array(height).fill(0)
    }
  }
  markLine({ x1, x2, y1, y2 }, acceptDiagonal) {
    const slope = (y2 - y1) / (x2- x1)
    if (Math.abs(slope) === Infinity) {
      // Vertical
      for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        this[i][x1] += 1
      }
    } else if (slope === 0) {
      // Horizontal
      // Could use same formula than for diagonal, but the acceptDiagonal requires a different "if" anyway
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        this[y1][i] += 1
      }
    } else if (acceptDiagonal) {
      // Diagonal
      let j = slope === 1 ? Math.min(y1, y2) : Math.max(y1, y2)
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++, j = j + (1 * slope)) {
        this[j][i] += 1
      }
    }
  }
  static getGridSize(coords) {
    return coords.reduce(({width, height}, coord) => {
      const maxX = Math.max(coord.x1, coord.x2)
      const maxY = Math.max(coord.y1, coord.y2)
      if (maxX >= width) {
        width = maxX + 1
      }
      if (maxY >= height) {
        height = maxY + 1
      }
      return {width, height}
    }, {width: 0, height: 0})
  }
  get debug () {
    return this.join('\n').replace(/0/g, '.').replace(/,/g, '')
  }
  get dangerousPointsCount () {
    return this.flat().filter(v => v >= 2).length
  }
}

function transformInput(arr) {
  return arr.map(coords => {
    const [, x1, y1, x2, y2] = coords.match(/(\d*),(\d*) -> (\d*),(\d*)/)
    return {
      x1: parseInt(x1),
      y1: parseInt(y1),
      x2: parseInt(x2),
      y2: parseInt(y2)
    }
  })
}

function getGridAndCoords(arr) {
  const coords = transformInput(arr)
  const gridSize = Grid.getGridSize(coords)
  const grid = new Grid(gridSize.width, gridSize.height)
  return [grid, coords]
}

function getFirstResult (arr) {
  const [grid, coords] = getGridAndCoords(arr)
  coords.forEach((v) => grid.markLine(v))
  return grid.dangerousPointsCount
}

function getSecondResult (arr) {
  const [grid, coords] = getGridAndCoords(arr)
  coords.forEach((v) => grid.markLine(v, true))
  return grid.dangerousPointsCount
}
// console.log(getFirstResult(input))
console.log(getSecondResult(input))