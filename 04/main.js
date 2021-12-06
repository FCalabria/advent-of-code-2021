const input = require('./input.js')
const exampleInput = [
'7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',

'22 13 17 11  0',
' 8  2 23  4 24',
'21  9 14 16  7',
' 6 10  3 18  5',
' 1 12 20 15 19',

' 3 15  0  2 22',
' 9 18 13 17  5',
'19  8  7 25 23',
'20 11 10 24  4',
'14 21 16 12  6',

'14 21 17 24  4',
'10 16 15  9 19',
'18  8 23 26 20',
'22 11 13  6  5',
' 2  0 12  3  7',
]

class Carton extends Array {
  #markedPerColumn;
  constructor (length) {
    super(length)
    this.#markedPerColumn = new Array(length).fill(0)
  }
  addLine(lineString, lineIndex) {
    this[lineIndex] = lineString.split(' ').filter((v) => !!v)
  }
  mark(number) {
    for (const line of this) {
      const numberIndex = line.findIndex(n => n === number)
      if (numberIndex !== -1) {
        line[numberIndex] = 'X'
        this.#markedPerColumn[numberIndex] += 1
        break;
      }
    }
  }

  get bingo () {
    const hasLine = this.join('|').match(/(X,){4}X/)
    const hasColumn = this.#markedPerColumn.includes(this.length)
    return hasLine || hasColumn
  }
  get unmarkedSum () {
    return this.reduce((sum, line) => {
      const lineSum = line.reduce((lineSum, n) => {
        if (n !== 'X') {
          lineSum += parseInt(n)
        }
        return lineSum
      }, 0)
      return sum += lineSum
    }, 0)
  }

  winningResult (ballNumber) {
    return parseInt(ballNumber) * this.unmarkedSum
  }
}


function processInput(i) {
  const [balls, ...cartons] = i
  const result = {
    balls: balls.split(','),
    cartons: cartons.reduce((c, line, i) => {
      const cartonIndex = Math.floor(i/5)
      if (!c[cartonIndex]) {
        c[cartonIndex] = new Carton(5)
      }
      const lineIndex = i % 5
      c[cartonIndex].addLine(line, lineIndex)
      return c
    }, [])
  }
  return result
}

function findWinningCarton(rawInput) {
  const {balls, cartons} = processInput(rawInput)
  for (const ballNumber of balls) {
    for (const c of cartons) {
      c.mark(ballNumber)
      if (c.bingo) {
        return {carton: c, number: ballNumber};
      }
    }
  }
}

function findLosingCarton(rawInput) {
  const {balls, cartons} = processInput(rawInput)
  return cartons
    .map(c => {
      let turn = 0
      for (const ballNumber of balls) {
          c.mark(ballNumber)
          if (c.bingo) {
            return {carton: c, number: ballNumber, turn };
          }
          ++turn
      }
    })
    .sort((c1, c2) => c2.turn - c1.turn)[0]
}

const winningCombo = findWinningCarton(input)
const result1 = winningCombo.carton.winningResult(winningCombo.number)

const loosingCombo = findLosingCarton(input)
const result2 = loosingCombo.carton.winningResult(loosingCombo.number)
console.log('MC  |  result2', result2)
