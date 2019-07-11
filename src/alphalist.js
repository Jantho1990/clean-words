// Spits out lists of words starting with the passed in letter.
// Number of words spit out can be customized.

const fs = require('fs')
const path = require('path')

const words = JSON.parse(fs.readFileSync(path.join('.', 'clean_words.json'), 'utf8'))

// Get the arguments
// Arg1 = Output directory
// Arg2 = Letter
// Arg3 = Number of words to output.
const outputPath = process.argv[2] || false
const listLetter = process.argv[3] || 'all'
const outputAmount = process.argv[4] || 100

function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

const wordPool = {}
words.forEach((word, i) => {
    const letter = word.toLowerCase().substr(0, 1)
    if (listLetter === 'all' || letter === listLetter.toLowerCase()) {
        if (wordPool[letter] === undefined) {
            wordPool[letter] = []
        }

        wordPool[letter].push(word)
    }
})

console.log(`Word pool count: ${wordPool.a.length}`)

console.log('Word pool generated. Filtering words...')

const wordList = []
Object.values(wordPool).forEach(list => {
    const max = list.length > outputAmount
        ? outputAmount
        : list.length
    
    for (let i = 0; i < max; i++) {
        let w = randomInt(list.length)
        let randomWord = list[w]
        if (!wordList.includes(randomWord)) {
            wordList.push(randomWord)
        }
    }
})

if (outputPath) {
    fs.writeFileSync(path.join(outputPath, `word_list_${listLetter}.json`), JSON.stringify(wordList), { encoding: 'utf8'}, err => {
        if (err) {
            throw err
        }

        console.log(`File written to ${outputPath}`)
    })
}