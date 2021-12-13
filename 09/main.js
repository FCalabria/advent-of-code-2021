const input = require('./input.js');
const exampleInput = [
  '2199943210',
  '3987894921',
  '9856789892',
  '8767896789',
  '9899965678'
]

function isLow(splitted, value, x, y) {
  const maxX = splitted[0].length - 1
  const maxY = splitted.length - 1
  const top = y !== 0 ? splitted[y - 1][x] : 10
  const bottom = y < maxY ? splitted[y + 1][x] : 10
  const left = x !== 0 ? splitted[y][x - 1] : 10
  const right = x < maxX ? splitted[y][x + 1] : 10
  return value < top && value < bottom && value < left && value < right
}

function prepData (rawData) {
  return rawData.map(str => str.split('').map(s => parseInt(s)))
}

function getLowPointsSum(mapArr) {
  const splitted = prepData(mapArr)
  return splitted.reduce((totalSum, valuesArr, y) => {
    return valuesArr.reduce((lineSum, value, x) => {
      return isLow(splitted, value, x, y) ? lineSum + value + 1 : lineSum
    }, 0) + totalSum
  }, 0)
}

function getLowPointsCoords (mapArr) {
  return mapArr.reduce((allCoords, valuesArr, y) => {
    valuesArr.forEach((value, x) => {
      if (isLow(mapArr, value, x, y)) {
        allCoords.push({x, y})
      }
    })
    return allCoords
  }, [])
}

function getBasinCoords (basinLowest, arr) {
  const basinCoords = new Set()
  basinCoords.add(JSON.stringify(basinLowest))
  const maxX = arr[0].length - 1
  const maxY = arr.length - 1
  function getPointConnections ({x, y}) {
    const prevHztl = {x: Math.max(x-1, 0), y}
    const nextHztl = {x: Math.min(x+1, maxX), y}
    const prevVert = {x, y: Math.max(y-1, 0)}
    const nextVert = {x, y: Math.min(y+1, maxY)}
    return [prevHztl, nextHztl, prevVert, nextVert]
      .filter(({x, y}) =>  arr[y][x] !== 9)
      .map(JSON.stringify)
  }
  let prevBasinCount = 0
  do {
    prevBasinCount = basinCoords.size
    basinCoords.forEach(coord => {
      const connections = getPointConnections(JSON.parse(coord))
      connections.forEach(c => {
        basinCoords.add(c)
      })
    })
  } while (basinCoords.size > prevBasinCount);
  return basinCoords
}

// const result1 = getLowPointsSum(input)
// console.log('MC  |  result1', result1)
function getSecondResult () {
  const data = prepData(input)
  const basinsSizes = getLowPointsCoords(data)
  .map(coords => {
    const set = getBasinCoords(coords, data)
    return set.size
  })
  .sort((a, b) => b - a)
  return basinsSizes.slice(0, 3).reduce((prod, n) => prod * n, 1)
}
console.log('MC  |  getSecondResult  |  getSecondResult', getSecondResult())