//prevents you from using undeclared variables
'use strict';

//Lesson in DRY (Don't repeat yourself)

const generate = () => {
  document.querySelector('.message').textContent = 'Start guessing...';
  return Math.trunc(Math.random() * 20) + 1;
};

const WinRound = guess => {
  document.querySelector('.number').textContent = guess;
  score += 10;
  scoreDisplay.textContent = score;
  alreadyGuessed = true;
};

let score = 0;
let alreadyGuessed = false;
let secretNumber = generate();

const scoreDisplay = document.querySelector('.score');
console.log(secretNumber, typeof secretNumber);

document.querySelector('.check').addEventListener('click', () => {
  //if player already won the round, exit (player must click again)
  if (alreadyGuessed) return;

  //selectors
  let guess = document.querySelector('.guess').value;
  const message = document.querySelector('.message');

  console.log('Originally a String: ' + typeof guess, guess);

  //if no guess is entered (guess is null)
  if (!guess) {
    message.textContent = 'Not a valid guess';
    console.log('test');
  } else {
    guess = Number(guess);
    console.log('Now a Number: ' + typeof guess, guess);

    if (guess === secretNumber) {
      message.textContent = 'You got it, bitch. Click again to play again.';
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '30rem';
      WinRound(guess);
    } else {
      message.textContent = 'Wrong! Try again.';
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  alreadyGuessed = false;
  secretNumber = generate();

  //restore settings
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';

  console.log(secretNumber, typeof secretNumber);
});
