//Letter constructor, 'displayLet" will display an underscore or letter or blank (if the word to be guessed has a space)
//'check' function changes boolean so the letter will display if it's guessed
function Letter(str) {
    this.str = str;
    this.guessed = false;
    this.displayLet = function() {
        if (this.alpha === " ") {
            return " ";
        }
        else if(!this.guessed) {
            return "_";
        }
        else {
            return this.str;
        }
    }
    this.check = function(userGuess) {
        if (userGuess === this.str) {
            this.guessed = true;
        }
    }
}

module.exports = Letter;