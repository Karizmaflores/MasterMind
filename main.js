'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// function printBoard prints board to screen
const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

// function generateSolution creates a random combination of 4 letters from a-h to serve as a game solution
const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// function generateHint matches user guess to correct positions or letters of solution
const generateHint = (guess) =>  {
  let solutionArray = solution.split('');
  let guessArray = guess.split('');
  let correctLetterLocations = 0; //solutionArray.filter......
  for (let i = 0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++;
      solutionArray[i] = null;
    }
  }

  let correctLetters = 0;
  for (let i = 0; i < solutionArray.length; i++) {
    const targetIndex = solutionArray.indexOf(guessArray[i]);
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }
  return `${correctLetterLocations}-${correctLetters}`;
}

// function mastermind checks for user win if guess is equal to solution
const mastermind = (guess) => {
 solution = 'abcd'; // Comment this out to generate a random solution
  if (solution === guess) {
    console.log("You guessed it!");
    return "You guessed it!";
  }


  const hint = generateHint(guess);
  board.push(`${guess}-${hint}`);
  console.log('Guess: ', guess, 'Hint: ', hint);

  if (board.length === 10){
    return `You ran out of turns! The solution was ${solution}`;
  }
  else {
    return "Guess again.";
  }
}

// function getPrompt displays mastermind game play
const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}