//Word constructor uses letter.js to create inputted word using 'makeWord'
var Letter = require("./letter.js");

function Word(wordAr) {
    this.wordAr = wordAr;
    this.testWord = [];
    this.makeWord = function() {
        for (var i=0; i<wordAr.length; i++) {
            var lett = new Letter(wordAr[i]);
            this.testWord.push(lett);
        }
    }
    this.showWord = function() {
        var wordDisplay = [];
        for (var i=0; i<this.testWord.length; i++) {
            wordDisplay.push(this.testWord[i].displayLet());
        }
        return wordDisplay.join(" ");
    }
    this.checkGuess = function(myGuess) {
        for (var i=0; i<this.testWord.length; i++) {
            this.testWord[i].check(myGuess);
        }
    }
}

module.exports = Word;