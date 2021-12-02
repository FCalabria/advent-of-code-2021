const input = require('./input.js')
const exampleInput = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263,
]

function calculateIncrease (inputData) {
  return inputData
    .reduce(
      (totalIncreases, currentRead, index) => index > 0 && currentRead > inputData[index - 1]
        ? ++totalIncreases
        : totalIncreases
    , 0)
}

const windows = []
input.forEach((read, i, arr) => {
  if (arr[i+2]) {
    windows.push(read + arr[i+1] + arr[i+2])
  }
})

const result1 = calculateIncrease(input)
const result2 = calculateIncrease(windows)
console.log(result1, result2)