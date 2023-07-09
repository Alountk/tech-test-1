const MIN_CELL = 0
const MAX_CELL = 255

const clamp = value => {
  console.log({ value })
  if (value > MAX_CELL) return MIN_CELL
  if (value < MIN_CELL) return MAX_CELL
  return value
}

function translate (string) {
  const memory = [0]

  let pointer = 0
  let index = 0
  let output = ''

  const arrayOfInstructions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] ??= 0
    },
    '👈': () => {
      pointer--
      memory[pointer] ??= 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        index = arrayOfInstructions.indexOf('🤛', index)
      }
    },
    '🤛': () => {
      if (memory[pointer] !== 0) {
        index = arrayOfInstructions.lastIndexOf('🤜', index)
      }
    },
    '👊': () => {
      output += String.fromCharCode(memory[pointer])
    }
  }

  while (index < arrayOfInstructions.length) {
    const action = arrayOfInstructions[index]
    actions[action]()
    console.log({ action, index, pointer })
    index++
  }

  return output
}

console.log(translate('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊'))

module.exports = translate
