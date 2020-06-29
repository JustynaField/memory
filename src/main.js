var board = document.querySelector('.board');



var deck = new Deck;

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

function shuffleDeck (deck) {
    var j, x, i;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deck[i];
        deck[i] = deck[j];
        deck[j] = x;
    }
    return deck;
}
shuffleDeck(deck.cards);



function layOutCards () {
  var rowOne = document.querySelector('.row1');
  var rowTwo = document.querySelector('.row2');
  var rowThree = document.querySelector('.row3');


  deck.cards.forEach((card, i) => {

    var boardHtml = `
    <div class="col-sm-2 card">
    <img src="./assets/travel${card.matchInfo}.jpg" alt="Card Opened" class="card-front">
    <img src="./assets/back.jpg" alt="Card Closed" class="card-back hidden">
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
