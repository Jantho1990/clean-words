const fs = require('fs')
const path = require('path')

const wordsFilePath = require('word-list')
const words = fs.readFileSync(wordsFilePath, 'utf8').split('\n')
const badWords = require('badwords/array')

// Get the arguments
const outputPath = process.argv[2] || false
console.log(outputPath)

let tmpct = 0
const cleanWords = words.filter((word, i) => {
    if (i % 10000 === 0) {
        console.log(`Processed ${i} words. On: ${word}`)
    }

    for (let badWord of badWords) {
        if (badWord.toLowerCase() === word.toLowerCase() ||
            word.toLowerCase().includes(badWord.toLowerCase())) {
            return false
        }
    }

    return true
})

console.log(`Starting Word Count: ${words.length}`)
console.log(`Filtered Words Count: ${cleanWords.length}`)

if (outputPath) {
    fs.writeFileSync(path.join(outputPath, 'clean_words.json'), JSON.stringify(cleanWords), { encoding: 'utf8'}, err => {
        if (err) {
            throw err
        }

        console.log(`File written to ${outputPath}`)
    })
}