var board = document.querySelector('.board');

// 
// var deck = new Deck;
//
// console.log(deck.cards);

function layOutCards () {
  var rowOne = document.querySelector('.row1');
  var rowTwo = document.querySelector('.row2');
  var rowThree = document.querySelector('.row3');

  var cards = [1, 2, 3, 4, 5, 6];

  cards.forEach((item, i) => {

    var boardHtml = `
    <div class="col-sm-2 card">
    <img src="./assets/travel${item}.jpg" alt="Card Opened" class="card-front">
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
