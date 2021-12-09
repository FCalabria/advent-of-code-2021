const input = require('./input.js')
const exampleInput = [
  'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
  'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
  'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
  'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
  'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
  'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
  'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
  'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
  'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
  'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce',
]

function parseInput(arr) {
  return arr.map(str => {
    const [, puzzleKey, puzzleOutput] = str.match(/([\w ]*) \| ([\w ]*)/)
    return {
      keys: puzzleKey.split(' '),
      output: puzzleOutput.split(' ')
    }
  })
}

const UNIQUE_SEGMENTS_QUANTITY = {
  // Quantity : number
  2: 1,
  4: 4,
  3: 7,
  7: 8
}
function countUniqueNumbers(arr) {
  return arr
    .filter(outValue => Object.keys(UNIQUE_SEGMENTS_QUANTITY)
      .includes(outValue.length.toString())
    ).length
}

function getAllUniqueNumbers(lecturesArr) {
  return lecturesArr.reduce((count, lecture) => count + countUniqueNumbers(lecture.output), 0)
}

/*
 * Returns a map in form correctWire: letter
 */
function getWires(keys) {
  const wires = {}
  const allLetters = keys.join('').split('')
  const OCURRENCES = {
    4: 'e',
    6: 'b',
    7: 'dg', // D is in 4
    8: 'ca', // C is in 4
    9: 'f'
  }
  const realOcurrences = allLetters.reduce((map, l) => {
    if (!map[l]) {
      map[l] = 1
    } else {
      map[l] = map[l] + 1
    }
    return map
  }, {})
  for (const l in realOcurrences) {
    let options = OCURRENCES[realOcurrences[l]]
    if (options.length > 1) {
      const four = keys.find(k => k.length === 4)
      const isInFour = four.includes(l)
      const regex = isInFour ? /[g,a]/ : /[d,c]/
      options = options.replace(regex, '')
    }
    wires[options] = l
  }
  return wires
}

function sortLettersInWord (w) {
  return w.split('').sort().join('')
}

function getNumbersMap (keys) {
  const wires = getWires(keys)
  let numbersMap = keys.reduce((map, key) => {
    const sortedKey = sortLettersInWord(key)
    if (Object.keys(UNIQUE_SEGMENTS_QUANTITY).includes(key.length.toString())) {
      map[sortedKey] = UNIQUE_SEGMENTS_QUANTITY[key.length]
    } else {
      let n
      if (key.length === 6) {
        if (!key.includes(wires.d)) {
          n = 0
        } else {
          n = key.includes(wires.c) ? 9 : 6
        }
      } else {
        if (key.includes(wires.b)) {
          n = 5
        } else {
          n = key.includes(wires.e) ? 2 : 3
        }
      }
      map[sortedKey] = n
    }
    return map
  }, {})
  return numbersMap
}

function getResult2() {
  const parsedInput = parseInput(input)
  const realOutput = parsedInput.map(i => {
    const numbersMap = getNumbersMap(i.keys)
    return i.output
      .map(codedNumber => numbersMap[sortLettersInWord(codedNumber)])
      .join('')
  }).reduce((sum, n) => sum + parseInt(n), 0)
  return realOutput
}

const result1 = getAllUniqueNumbers(parseInput(input))
// console.log('MC  |  result1', result1)
console.log(getResult2())