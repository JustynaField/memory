var board = document.querySelector('.board');


var boardHtml = `
  <div class="row row1">
    <div class="col-sm-2 card">
      <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
    </div>
    <div class="col-sm-2 card">
      <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
    </div>
    <div class="col-sm-2 card">
      <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
    </div>
    <div class="col-sm-2 card">
      <img src="./assets/back.jpg" alt="Card Closed" class="card-back">
    </div>
  </div>
`

board.innerHTML = boardHtml;
