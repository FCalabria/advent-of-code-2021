const input = require('./input.js');
const exampleInput = `[({(<(())[]>[[{[]{<()<>>
    [(()[<>])]({[<{<<[]>>(
    {([(<{}[<>[]}>{[]{[(<()>
    (((({<>}<{<{<>}{[]{[]{}
    [[<[([]))<([[{}[[()]]]
    [{[{({}]{}}([{[{{{}}([]
    {<[[]]>}<{[{[{[]{()[[[]
    [<(<(<(<{}))><([]([]()
    <{([([[(<>()){}]>(<<{{
    <{([{{}}[<[[[<>{}]]]>[]]`
function parseInput(inp) {
  return inp.split('\n').map(string => string.trim().split(''))
}

function calculateErrorCode(charsArr) {
  const DICTIONARY = {
    '(': -3,
    ')': 3,
    '[': -57,
    ']': 57,
    '{': -1197,
    '}': 1197,
    '<': -25137,
    '>': 25137
  }
  let pile = []
  for (let i = 0; i < charsArr.length; i++) {
    const char = charsArr[i];
    const charValue = DICTIONARY[char]
    const expected = pile[pile.length - 1]
    if (charValue < 0) {
      pile.push(charValue)
    } else if (charValue + expected === 0) {
      pile.pop()
    } else {
      return charValue
    }
  }
  return 0
}

function getFirstResult(arr) {
  return arr.reduce((errorSum, charsArr) => {
    const errorCode = calculateErrorCode(charsArr)
    return errorSum + errorCode
  }, 0)
}

function completeLine(charsArr) {
  const DICTIONARY = {
    '(': 1,
    ')': -1,
    '[': 2,
    ']': -2,
    '{': 3,
    '}': -3,
    '<': 4,
    '>': -4
  }
  let pile = []
  for (let i = 0; i < charsArr.length; i++) {
    const char = charsArr[i];
    const charValue = DICTIONARY[char]
    const expected = pile[pile.length - 1]
    if (charValue > 0) {
      pile.push(charValue)
    } else if (charValue + expected === 0) {
      pile.pop()
    }
  }
  return pile.reverse()
}

function calculateCompletitionPoints (valuesArr) {
  return valuesArr.reduce((sum, value) => sum * 5 + value, 0)
}

function getSecondResult (arr) {
  const allPoints = arr
    .filter(charsArr => !calculateErrorCode(charsArr))
    .map(completeLine)
    .map(calculateCompletitionPoints)
    .sort((a, b) => a - b)
  return allPoints[(allPoints.length - 1) / 2]
}

// console.log(getFirstResult(parseInput(input)))
console.log(getSecondResult(parseInput(input)))