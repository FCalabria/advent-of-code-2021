const input = require('./input.js')
const exampleInput = [3,4,3,1,2]


function transformInput (arr) {
  return arr.reduce((map, element) => {
    let prevValue = map.get(element) | 0
    map.set(element, ++prevValue)
    return map
  }, new Map())
}

function passDay (school) {
  const olderSchool = new Map()
  for (let i = 8; i >= 0; i--) {
    const newQuantity = school.get(i + 1) || 0
    olderSchool.set(i, newQuantity)
  }
  const newFish = school.get(0) || 0
  olderSchool.set(8, newFish)
  olderSchool.set(6, olderSchool.get(6) + newFish)
  return olderSchool
}

function passTime (school, days) {
  let newSchool
  for (let i = 0; i < days; i++) {
    newSchool = passDay(newSchool || school)
  }
  return newSchool
}

function calculateTotalFish (school) {
  let total = 0
  school.forEach((quantity) => total = total + quantity)
  return total
}

const result1 = calculateTotalFish(passTime(transformInput(input), 80))
const result2 = calculateTotalFish(passTime(transformInput(input), 256))