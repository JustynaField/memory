var board = document.querySelector('.board');
var flippedCard = false;


var deck = new Deck();

// matchInfo - holds the same value as the card that matches it
function instantiateDeck () {
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

instantiateDeck ();

function shuffleDeck (temp) {
    var j, x, i;
    for (i = temp.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = temp[i];
        temp[i] = temp[j];
        temp[j] = x;
    }
    return temp;
}

shuffleDeck(deck.cards);

function layOutCards () {
  var rowOne = document.querySelector('.row1');
  var rowTwo = document.querySelector('.row2');
  var rowThree = document.querySelector('.row3');


  deck.cards.forEach((card, i) => {

    var boardHtml = `
    <div class="col-sm-2 card">
    <img src="./assets/travel${card.matchInfo}.jpg" alt="Card Opened" class="card-front hidden">
    <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
    </div>
    `

    if (i < 4) {
      rowOne.innerHTML += boardHtml;
    }
    else if (i < 8) {
      rowTwo.innerHTML += boardHtml;
    } else {
      rowThree.innerHTML += boardHtml;
    }
  })
}

layOutCards();


board.addEventListener('click', playCards);

function playCards (e) {
  var selectedCard = e.target.closest('.card');
  var cardFront = selectedCard.querySelector('.card-front');
  var cardBack = selectedCard.querySelector('.card-back');

  selectCards(selectedCard, cardFront, cardBack);


}


function selectCards (selected, front, back) {
  deck.selectedCards.push(selected);
  openCard (front, back);

  if (deck.selectedCards.length === 2) {
    compareCards();
    setTimeout(() => { closeCards() }, 2000);
  }



}


console.log("Selected cards", deck.selectedCards);


function compareCards () {
  var cardOne = deck.selectedCards[0].querySelector('.card-front');
  var cardTwo = deck.selectedCards[1].querySelector('.card-front');


  if (cardOneImg.getAttribute('src') == cardTwoImg.getAttribute('src')) {

    console.log("Were having a match!!");

  }

}


function openCard (front, back) {
  if (front.classList.contains('hidden')) {
    front.classList.remove('hidden');
    back.classList.add('hidden');
    flippedCard = true;
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





//interpolation vs. concatination
