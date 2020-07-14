class Deck {
  constructor () {
    this.cards = [];
    this.selectedCards = [];
    this.matchedCards = [];
    this.matches = [];
  }

  shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
  }

  compareSelectedCards () {
    if (this.selectedCards[0].id === this.selectedCards[1].id) {

      this.selectedCards.forEach((card, i) => {
        this.matchedCards.push(card);
      })
    }
  }

}
