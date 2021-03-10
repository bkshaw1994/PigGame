'use strict';

// Data of Player one
const scorePlayer1 = document.querySelector('#score--0');
const currentPlayer1 = document.getElementById('current--0');
const playerSlecter1 = document.querySelector('.player--0');

// Data of Player two
const scorePlayer2 = document.querySelector('#score--1');
const currentPlayer2 = document.getElementById('current--1');
const playerSlecter2 = document.querySelector('.player--1');

// Dice and button
const diceDisplay = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
hideDice();

// Scoring
let playing, activePlayer, scores, sum, randomNumber;

// Function Expression for starting the game
const inIt = function () {
  scores = [0, 0];
  sum = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

inIt();

// Function Decelration for switching the player
function switchPlayer() {
  playerSlecter2.classList.toggle('player--active');
  playerSlecter1.classList.toggle('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = sum = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

// Function expression for hidding the dice from the screen
function hideDice() {
  diceDisplay.classList.add('hidden');
}

/*
btnRoll.addEventListener('click', function () {
  if (scores[0] < 100 && scores[1] < 100) {
    randomNumber = Math.trunc(Math.random() * 6) + 1;
    diceDisplay.classList.remove('hidden');
    diceDisplay.src = `dice-${randomNumber}.png`;
    if (
      randomNumber !== 1 &&
      playerSlecter1.classList.contains('player--active')
    ) {
      sum = sum + randomNumber;
      currentPlayer1.textContent = sum;
    } else if (
      randomNumber === 1 &&
      playerSlecter1.classList.contains('player--active')
    ) {
      currentPlayer1.textContent = sum = 0;
      playerSlecter2.classList.add('player--active');
      playerSlecter1.classList.remove('player--active');
    } else if (
      randomNumber !== 1 &&
      playerSlecter2.classList.contains('player--active')
    ) {
      sum = sum + randomNumber;
      currentPlayer2.textContent = sum;
    } else {
      currentPlayer2.textContent = sum = 0;
      playerSlecter1.classList.add('player--active');
      playerSlecter2.classList.remove('player--active');
    }
    console.log(randomNumber);
    btnHold.addEventListener('click', function () {
      if (playerSlecter1.classList.contains('player--active') && sum !== 0) {
        scores[0] = scores[0] + sum;
        scorePlayer1.textContent = scores[0];
        console.log('Hold1');
        sum = 0;
        currentPlayer1.textContent = 0;
        playerSlecter2.classList.add('player--active');
        playerSlecter1.classList.remove('player--active');
      } else if (sum !== 0) {
        scores[1] = scores[1] + sum;
        scorePlayer2.textContent = scores[1];
        console.log('Hold2');
        sum = 0;
        currentPlayer2.textContent = 0;
        playerSlecter1.classList.add('player--active');
        playerSlecter2.classList.remove('player--active');
      }
    });
  } else {
    if (scores[0] >= 100) {
      console.log(`Player 1 is the winner.`);
    } else if (scores[1] >= 100) {
      console.log(`Player 2 is the winner.`);
    }
  }
});
*/

btnRoll.addEventListener('click', function () {
  if (playing) {
    if (scores[0] < 100 && scores[1] < 100) {
      randomNumber = Math.trunc(Math.random() * 6) + 1;
      diceDisplay.classList.remove('hidden');
      diceDisplay.src = `dice-${randomNumber}.png`;
      if (randomNumber !== 1) {
        // Add dice rolled number to the current Score
        sum += randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = sum;
      } else {
        // Switching Player if dice rolls 1
        switchPlayer();
      }
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current Score in the Total Score
    scores[activePlayer] += sum;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Check the score for the players >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      hideDice();
    } else {
      // Switching Player if any player is not reached the goal and click Hold button
      switchPlayer();
    }
  }
});

/*
btnNew.addEventListener('click', function () {
  location.reload();
});*/

// Reload the game to starting if New Game Button is clicked
btnNew.addEventListener('click', inIt);
