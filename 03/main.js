const input = require('./input.js')

const exampleInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

function getColumnsSum (arr) {
  return arr.reduce((sum, current) => {
    current.split('').forEach((num, i) => {
      if (!sum[i]) {sum[i] = 0}
      sum[i] += parseInt(num)
    })
    return sum
  }, [])
}

function getBinaries(sum, length) {
  const higherBinary = sum.map(s => s >= length/2 ? 1 : 0).join('')
  const lowerBinary = higherBinary.replace(/\d/g, m => m === '1' ? '0' : '1')
  return [higherBinary, lowerBinary]
}

function getDecimalProduct(a, b) {
  return parseInt(a, 2) * parseInt(b, 2)
}

function getComsuption(sum, length) {
  const [binaryGamma, binaryEpsilon] = getBinaries(sum, length)
  return getDecimalProduct(binaryGamma, binaryEpsilon)
}

function filterByNumber (arr, position, higherOrLower) {
  const binaryCompare = getBinaries(getColumnsSum(arr), arr.length)[higherOrLower]
  const filteredArr = arr.filter(b => b[position] === binaryCompare[position] )
  if (filteredArr.length > 1) {
    return filterByNumber(filteredArr, ++position, higherOrLower)
  } else {
    return filteredArr[0]
  }
}

const result1 = getComsuption(getColumnsSum(input), input.length)
const result2 = getDecimalProduct(filterByNumber(input, 0, 0), filterByNumber(input, 0, 1))
console.log('MC  |  result2', result2)