var board = document.querySelector('.board');

var deck = new Deck();


layOutCards();

board.addEventListener('click', playCards);


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
    <div class="col-sm-2 card" id="${card.matchInfo}">
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
  })
}



function playCards (e) {
  var selectedCard = e.target.closest('.card');
  var cardFront = selectedCard.querySelector('.card-front');
  var cardBack = selectedCard.querySelector('.card-back');

  selectCards(selectedCard, cardFront, cardBack);
}


function selectCards (selected, front, back) {


  if (deck.selectedCards.length < 2) {
    openCard (selected, front, back);
  }


  if (deck.selectedCards.length === 2) {
    deck.compareSelectedCards();
    setTimeout(() => { closeCards() }, 2000);

  }

}




function openCard (selected, front, back) {
  if (front.classList.contains('hidden')) {
    front.classList.remove('hidden');
    back.classList.add('hidden');
    deck.selectedCards.push(selected);
  }
console.log("Selected 1:", deck.selectedCards);
}


function closeCards () {
  deck.selectedCards.forEach((card, i) => {
    if (card.querySelector('.card-back').classList.contains('hidden')) {
      card.querySelector('.card-back').classList.remove('hidden');
      card.querySelector('.card-front').classList.add('hidden');
    }
  });
  deck.selectedCards = [];
      console.log('Selected 2: ', deck.selectedCards);
}







//interpolation vs. concatination
