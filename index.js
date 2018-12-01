//NPM modules to obtain player input (letter guesses) and to add color to the display
var Word = require("./word.js");
var inquirer = require('inquirer');


wordList = ["PLANE", "SINCE", "OBJECT", "STRING", "DISPLAY", "AFRICA", "GUESS", "TOAD", "CHAIN", "BIRD", "DEPEND", "MOVING", "ANIMAL", "DONKEY"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//Chooses a word from the word array, uses the word constructor to create the proper display and functionality;
//'chosenWord' is used for comparison later to check if the word is solved
function startGame() {
    if (wordList.length<2) {
        wordList = ["PLANE", "SINCE", "OBJECT", "STRING", "DISPLAY", "AFRICA", "GUESS", "TOAD", "CHAIN", "BIRD", "DEPEND", "MOVING", "ANIMAL", "DONKEY"];
    }
    select = Math.floor(Math.random()*wordList.length);
    chosenWord = wordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        wordList.splice(select, 1);
    }
    console.log("\nYou get 8 letter guesses to find the Correct Word.\n")
    promptUser();
}

//Allows the user to input a letter guess, restarts the game if player is out of wrong guesses.
function promptUser() {
    if (counter<8) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name: "letter",

                message: "\nPick a letter and press enter. "
            }
        ]).then(function(data) {
                checkAnswer(data);
        });
    }
    else{
      
        console.log("\nSorry, you're out of guesses.\n");
    
        console.log(chosenWord);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks that the user's input is in correct format and compares the letter to gameWord to see if guess is correct
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]+$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
          
            console.log("\nSorry, wrong letter!\n");
            counter++;
            console.log((8 - counter) + " guesses remaining");
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter a letter, one at a time.\n");
        promptUser();
    }
}

//If the user's guess is correct, the word array displays the word with the guessed letter(s), 
//If the entire word is correct (filled in), the game restarts.
function rightGuess() {
    
    console.log("\nYou guessed correctly.\n");
    if (chosenWord.replace(/ /g,"") == (gameWord.showWord()).replace(/ /g,"")) {
        console.log(gameWord.showWord());    
        console.log('\nYou win!!\n');
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}

startGame();
