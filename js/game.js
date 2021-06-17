$(document).ready(() => {
  //Game start
  $("#start").click((e) => {
    e.preventDefault();
    $(".navbar__item").removeClass("active");
    $(e.currentTarget).parent().addClass("active");

    const gameModeSetup = (grid) => {
      let cardIndexes = [];

      for (let i = 0; i < (grid * grid) / 2; i++) {
        cardIndexes.push(i + 1, i + 1);
      }

      return cardIndexes.sort((a, b) => 0.5 - Math.random());
    };

    let gridSize = 4;

    $("#main").html(`
      <main class="game">
        <div class="game__container">
          <div class="game__timer">00:01</div>
          <div class="game__cards">
           
          </div>
        </div>
      </main>
    `);

    setTimeout(() => {
      gameModeSetup(gridSize).forEach((i) => {
        $(".game__cards").append(`
                <div class="game__card" data-id="photo${i}">
                  <div class="game__card--front">
                    <img src="/img/mask.png" alt="Mask">
                  </div>
                  <div class="game__card--back">
                    <img src="/img/animal-${i}.jpg" alt="Mask">
                  </div>
                </div>
              `);
      });

      let cardsTurned = 0;
      let cards = [];

      $(".game__card").click((e) => {
        if (cardsTurned < 2) {
          cards.push($(e.currentTarget));
          $(e.currentTarget).addClass("turned");
          cardsTurned++;

          if (cardsTurned == 2 && cards[0].attr("data-id") != cards[1].attr("data-id")) {
            setTimeout(() => {
              $(".game__card").not(".correct").removeClass("turned");
              cardsTurned = 0;
              cards = [];
            }, 800);
          } else if (cardsTurned == 2 && cards[0].attr("data-id") == cards[1].attr("data-id")) {
            cardsTurned = 0;
            cards[0].addClass("correct");
            cards[1].addClass("correct");
            cards = [];
          }
        }
      });
    }, 100);
  });
});
