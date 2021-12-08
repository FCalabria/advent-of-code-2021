const input = require('./input.js')
const exampleInput = [16,1,2,0,4,2,7,1,2,14]


function getFuelCost(arr, position) {
  return arr.reduce((fuelCost, elementPosition) => fuelCost + Math.abs(elementPosition - position), 0)
}
function getFuelCostExp(arr, position) {
  return arr.reduce((fuelCost, elementPosition) => {
    const positionDiff = Math.abs(position - elementPosition)
    const moveCost = (positionDiff * (positionDiff + 1)) / 2
    return fuelCost + moveCost
  }, 0)
}

function calculatePositionsCost (arr) {
  const max = Math.max(...arr)
  const min = Math.min(...arr)
  const costs = new Map()
  for (let i = min; i <= max; i++) {
    costs.set(i, getFuelCostExp(arr, i))
  }
  return costs
}

function getCheapestMove (costsMap) {
  const iterator = costsMap.entries()
  let lowest = iterator.next().value
  let nextValue = lowest
  while (nextValue !== undefined) {
    if (nextValue[1] < lowest[1]) {
      lowest = nextValue
    }
    nextValue = iterator.next().value
  }
  return lowest[1]
}

function median (arr) {
  const sorted = arr.sort((a, b) => b - a)
  const midValue = (arr.length - 1) / 2  // -1 due to 0 index
  const isEvenLength = arr.length % 2 === 0
  return isEvenLength ? (sorted[midValue + 0.5] + sorted[midValue - 0.5 ]) / 2 : sorted[midValue]
}

const result1 = getFuelCost(input, median(input))
const result2 = getCheapestMove(calculatePositionsCost(input))
console.log('MC  |  result2', result2)

