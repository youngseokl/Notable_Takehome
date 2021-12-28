const fs = require('fs')
const getTransformedText = () => {
    let rawdata = fs.readFileSync('input.json')
    let input = JSON.parse(rawdata).text
    // function logic
    const stringToNum = {
        "one": 1,
        "two": 2,
        "three": 3,
        "four": 4,
        "five": 5,
        "six": 6,
        "seven": 7,
        "eight": 8,
        "nine": 9
    }
    let prevNumber = -1
    let isNumber = false;
    let newSentencesArray = []
    const sentencesArray = input.split(/(Number )/)
    sentencesArray.forEach((sentence) => {
        if (sentence == "Number ") {
            isNumber = true;
        } else if (isNumber) {
            isNumber = false;
            let number
            const numberInStr = sentence.split(" ")[0]
            if (numberInStr == "next") {
                number = ++prevNumber
            } else {
                number = stringToNum[numberInStr]
                prevNumber = number
            }
            const newSentence = "\n" + number.toString() + 
                ". " +
                sentence.charAt(sentence.indexOf(" ")+1).toUpperCase() + 
                sentence.substr(numberInStr.length+2, sentence.length-1);
            newSentencesArray.push(newSentence)
        } else {
            newSentencesArray.push(sentence)
        }
    })
    return newSentencesArray.join('')

}
const output = getTransformedText()
console.log(output)
