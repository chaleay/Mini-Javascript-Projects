'use strict';

//Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const ResetGame = () => {
  //reset all scores
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  scores[0] = 0;
  scores[1] = 0;

  //if player 2 is currently active, remove it
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  //restet active player
  activePlayer = 0;

  //display resetted scores
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  //hide the die
  diceEl.classList.add('hidden');
  document.querySelector('.btn--hold').classList.remove('hidden');
  document.querySelector('.btn--roll').classList.remove('hidden');

  //make player 0 active again
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

const AddToTotalScore = () => {
  if (scores[activePlayer] < currentScore) {
    scores[activePlayer] = currentScore;
    document.querySelector(
      `#score--${activePlayer}`
    ).textContent = currentScore;
  }
};
const SwitchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //adds if not there, removes otherwise
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Roll Dice Button
document.querySelector('.btn--roll').addEventListener('click', () => {
  //1. Gen Random Dice Roll
  const dice = Number(Math.trunc(Math.random() * 6) + 1);
  console.log(dice);

  //2. Display Dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${String(dice)}.png`;

  //3. Check for roll 1, if true switch to next player
  if (dice === 1) {
    AddToTotalScore();
    SwitchActivePlayer();
  } else {
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 100) {
    document.querySelector('.btn--hold').classList.add('hidden');
    document.querySelector('.btn--roll').classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle('player--winner');
  } else SwitchActivePlayer();
});

document.querySelector('.btn--new').addEventListener('click', () => {
  ResetGame();
});
