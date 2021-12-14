const input = require('./input.js');
const exampleInput = [
  5483143223,
  2745854711,
  5264556173,
  6141336146,
  6357385478,
  4167524645,
  2176841721,
  6882881134,
  4846848554,
  5283751526
]
const exampleSmall = [
  11111,
  19991,
  19191,
  19991,
  11111
]

function prepInput (arr) {
  return arr.map(num => num.toString().split('').map(s => parseInt(s)))
}

function addAdjacent (x, y, matrix) {
  const northRow = matrix[y - 1]
  const southRow = matrix[y + 1]
  const NW = northRow && northRow[x - 1]
  const N = northRow && northRow[x]
  const NE = northRow && northRow[x + 1]
  const W = matrix[y][x - 1]
  const E = matrix[y][x + 1]
  const SW = southRow && southRow[x - 1]
  const S = southRow && southRow[x]
  const SE = southRow && southRow[x + 1]
  if (NW) { ++northRow[x-1] }
  if (N) { ++northRow[x] }
  if (NE) { ++northRow[x+1] }
  if (W) { ++matrix[y][x-1] }
  if (E) { ++matrix[y][x+1] }
  if (SW) { ++southRow[x-1] }
  if (S) { ++southRow[x] }
  if (SE) { ++southRow[x+1] }
}
function flash(x, y, newFlashes, flashedInStep, value, matrix) {
  const stringCoords = `${y},${x}`
  if (value > 9 && !flashedInStep.has(stringCoords)) {
    newFlashes.add(stringCoords)
    flashedInStep.add(stringCoords)
    addAdjacent(x, y, matrix)
  }
}

function step (octopusMatrix) {
  let newMatrix = octopusMatrix.map(line => line.map(value => ++value))
  const flashedInStep = new Set()
  let newFlashes = new Set()
  do {
    newFlashes = new Set()
    newMatrix.forEach((line, y) => {
      line.forEach((value, x) => {
        flash(x, y, newFlashes, flashedInStep, value, newMatrix)
      })
    })
  } while (newFlashes.size !== 0);
  return {
    matrix: newMatrix.map(line => line.map(value => value > 9 ? 0 : value)),
    flashes: flashedInStep.size
  }
}

function getFirstResult (matrix, steps) {
  let output = matrix
  let flashes = 0
  for (let i = 0; i < steps; i++) {
    const result = step(output)
    output = result.matrix
    flashes = flashes + result.flashes
  }
  return {output, flashes}
}

function getSecondResult (matrix) {
  let output = matrix
  let stepNumber = 0
  function outputIsFullZero () {
    return output.flat().every(v => v === 0)
  }
  do {
    ++stepNumber
    output = step(output).matrix
  } while (!outputIsFullZero());
  return stepNumber
}

// console.log(getFirstResult(prepInput(input), 100))
console.log(getSecondResult(prepInput(input)))