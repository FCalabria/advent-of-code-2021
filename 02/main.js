const input = require('./input.js')
const exampleInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
]

function getMoves(orders) {
  return orders.reduce((moves, order) => {
    const [direction, steps] = order.split(' ')
    moves[direction] = (moves[direction] || 0) + parseInt(steps)
    return moves
  }, {})
}

function getMovesWithAim(orders) {
  return orders.reduce((moves, order) => {
    const [direction, s] = order.split(' ')
    let steps = parseInt(s)
    switch (direction) {
      case 'forward':
        moves.forward = moves.forward + steps
        moves.down = moves.down + steps * moves.aim
        break;
      case 'up':
        moves.aim = moves.aim - steps
        break;
      case 'down':
        moves.aim = moves.aim + steps
        break;
      default:
        console.log('not dealt with', order)
        break;
    }
    return moves
  }, {
    aim: 0,
    forward: 0,
    down: 0
  })
}

const moves1 = getMoves(input)
const moves2 = getMovesWithAim(input)

const result1 = moves1.forward * (moves1.down - moves1.up)
const result2 = moves2.forward * moves2.down
console.log(result2)