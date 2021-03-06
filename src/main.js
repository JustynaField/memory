var playerOne = document.getElementById('player-one');
var playerTwo = document.getElementById('player-two');
var playGame = document.querySelector('.play-game');
var playerOneOutput = document.querySelector('.player-one-output');
var playerTwoOutput = document.querySelector('.player-two-output');
var startGame = document.querySelector('.start-game');
var firstPage = document.querySelector('.first-page');
var secondPage = document.querySelector('.second-page');
var boardPage = document.querySelector('.board-page');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');

var board = document.querySelector('.board');
var counter = 0;

var playerOneScore = 0;
var playerTwoScore = 0;
var playerOneMatches = document.getElementById('player-one-matches');
var playerTwoMatches = document.getElementById('player-two-matches');
var playerOneWin = document.querySelector('.player-one-win');
var playerTwoWin = document.querySelector('.player-two-win');

var deck = new Deck();

layOutCards();

playGame.addEventListener('click', fillOutForm);
startGame.addEventListener('click', showBoard);

board.addEventListener('click', playCards);

function fillOutForm (e) {
  e.preventDefault();

  firstPage.classList.add('hidden');
  secondPage.classList.remove('hidden');
  playerOneOutput.innerText = playerOne.value;
  playerTwoOutput.innerText = playerTwo.value;
}

function showBoard () {
  secondPage.classList.add('hidden');
  boardPage.classList.remove('hidden');
  player1.innerText = playerOne.value;
  player2.innerText = playerTwo.value;

  playerOneMatches.innerText = playerOneScore;
  playerTwoMatches.innerText = playerTwoScore;
}


// matchInfo - holds the same value as the card that matches it
function defineCard () {
  var matchInfo = 0;

  for (var i=1; i<13; i++) {
      matchInfo ++;

    if (matchInfo === 7) {
      matchInfo = 1;
    }

    var card = new Card (matchInfo, i)
    deck.cards.push(card);
  }
}

function layOutCards () {

  defineCard ();
  deck.shuffle(deck.cards);

  var rowOne = document.querySelector('.row1');
  var rowTwo = document.querySelector('.row2');
  var rowThree = document.querySelector('.row3');

  deck.cards.forEach((card, i) => {

    var boardHtml = `
      <div class="col-sm-3 card" id="${card.matchInfo}">
      <img src="./assets/travel${card.matchInfo}.jpg" alt="Card Opened" class="card-front hidden">
      <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
      </div>
    `

    if (i < 4) {
      rowOne.innerHTML += boardHtml;
    } else if (i < 8) {
      rowTwo.innerHTML += boardHtml;
    } else {
      rowThree.innerHTML += boardHtml;
    }
  });
  deck.defineTurns (playerOne.value, playerTwo.value);
  markPlayers ();
}


function playCards (e) {
  var selectedCardId = e.target.parentNode.id
  var selectedCard = e.target.closest('.card');
  var cardFront = selectedCard.querySelector('.card-front');
  var cardBack = selectedCard.querySelector('.card-back');

  selectCards(selectedCardId, selectedCard, cardFront, cardBack);
}

function selectCards (card, selected, front, back) {

  if (deck.selectedCards.length < 2) {
    openCard (selected, front, back);
  }

  if (deck.selectedCards.length === 2) {
    if (deck.selectedCards[0].id != deck.selectedCards[1].id) {
      setTimeout(() => { closeCards() }, 1000);
    }
    else {
      if (deck.turn == playerOne.value) {
        playerOneScore ++;
        playerOneMatches.innerText = playerOneScore;
      } else if (deck.turn == playerTwo.value) {
        playerTwoScore ++;
        playerTwoMatches.innerText = playerTwoScore;
      }
    }
    deck.compareSelectedCards(card);
    deck.defineTurns (playerOne.value, playerTwo.value);
    markPlayers ();
    defineWin();
  }
}

function openCard (selected, front, back) {
  if (front.classList.contains('hidden')) {
    front.classList.remove('hidden');
    back.classList.add('hidden');
    deck.selectedCards.push(selected);
    deck.turnCounter ++;
  }
}

function closeCards () {
  deck.selectedCards.forEach((card, i) => {
    if (card.querySelector('.card-back').classList.contains('hidden')) {
      card.querySelector('.card-back').classList.remove('hidden');
      card.querySelector('.card-front').classList.add('hidden');
    }
  });
  deck.selectedCards = [];
}

function markPlayers () {
  if (deck.turn == playerOne.value) {
    player1.classList.add('underline');
    player2.classList.remove('underline');
  } else {
    player1.classList.remove('underline');
    player2.classList.add('underline');
  }
}

function defineWin () {
  if (deck.matches == 6) {
    if (playerOneScore > playerTwoScore) {
      playerOneWin.classList.add('underline');
      alert(playerOne.value + ' wins!');
    } else if (playerTwoScore > playerOneScore) {
      playerTwoWin.classList.add('underline');
      alert(playerTwo.value + ' wins!');
    } else {
      alert("It's a tie!");
    }
  }
}
