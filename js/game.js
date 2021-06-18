$(document).ready(() => {
  //Game start
  $("#start").click((e) => {
    e.preventDefault();

    //Current User
    let user = JSON.parse(localStorage.getItem("currentUser"));

    // IndexedDb Request to update score
    let db = null;
    const request = indexedDB.open("khassanboi", 1);

    request.onupgradeneeded = (e) => {
      db = e.target.result;
    };

    request.onsuccess = (e) => {
      db = e.target.result;
    };

    request.onerror = (e) => {
      alert("There was an error: " + e.target.errorCode);
    };

    const updateScore = (user) => {
      const tx = db.transaction("usersData", "readwrite");
      tx.onerror = (e) => alert("There was an error: " + e.target.errorCode);
      const usersData = tx.objectStore("usersData");
      usersData.put(user);
    };

    $(".navbar__item").removeClass("active");
    $(e.currentTarget).parent().addClass("active");

    let gridSize = $("#difficulty").val() ? $("#difficulty").val() : 4;
    let cardType = $("#card-type").val() ? $("#card-type").val() : "animal";

    let pairs = (gridSize * gridSize) / 2;

    const gameModeSetup = () => {
      let cardIndexes = [];

      if (gridSize == 4) {
        for (let i = 0; i < 8; i++) {
          cardIndexes.push(i + 1, i + 1);
        }
      } else if (gridSize == 6) {
        for (let i = 0; i < 9; i++) {
          cardIndexes.push(i + 1, i + 1, i + 1, i + 1);
        }
      } else if (gridSize == 8) {
        for (let i = 0; i < 8; i++) {
          cardIndexes.push(i + 1, i + 1, i + 1, i + 1, i + 1, i + 1, i + 1, i + 1);
        }
      }

      return cardIndexes.sort((a, b) => 0.5 - Math.random());
    };

    $("#main").html(`
      <main class="game">
        <div class="game__container">
          <div class="game__timer">00:00</div>
          <div class="game__cards">
           
          </div>
        </div>
      </main>
    `);

    setTimeout(() => {
      gameModeSetup().forEach((i) => {
        $(".game__cards").append(`
                <div class="game__card" data-id="photo${i}">
                  <div class="game__card--front">
                    <img src="/img/mask.png" alt="Mask">
                  </div>
                  <div class="game__card--back">
                    <img src="/img/card-images/${cardType}-${i}.jpg" alt="Mask">
                  </div>
                </div>
              `);
      });

      $(".game__cards").css({
        "grid-template-columns": "repeat(" + gridSize + ", 15%)",
        "grid-template-rows": "repeat(" + gridSize + ", 15%)",
      });

      let cardsTurned = 0;
      let cards = [];
      let secondsSpent = 0;
      let turns = {
        correct: 0,
        incorrect: 0,
        score() {
          return (this.correct + this.incorrect - this.incorrect) * 100 - secondsSpent * 10 > 0
            ? (this.correct + this.incorrect - this.incorrect) * 100 - secondsSpent * 10
            : 0;
        },
      };

      const checkIfComplete = () => {
        if (pairs > turns.correct) {
          return;
        } else if (pairs == turns.correct) {
          clearInterval(timer);
          user.score += turns.score();
          updateScore(user);
          if (confirm(`You have completed the game. Your score is: ${turns.score()} Would you like to play once more?`)) {
            $("#start").trigger("click");
          } else {
            $("#page-rank").trigger("click");
          }
        }
      };

      $(".game__card").click((e) => {
        if (cardsTurned < 2) {
          cards.push($(e.currentTarget));
          $(e.currentTarget).addClass("turned");
          cardsTurned++;

          if (cardsTurned == 2 && cards[0].attr("data-id") != cards[1].attr("data-id")) {
            cards[0].addClass("incorrect");
            cards[1].addClass("incorrect");
            setTimeout(() => {
              $(".game__card").not(".correct").removeClass("turned");
              cards[0].removeClass("incorrect");
              cards[1].removeClass("incorrect");
              cardsTurned = 0;
              cards = [];
            }, 1000);
            turns.incorrect++;
          } else if (cardsTurned == 2 && cards[0].attr("data-id") == cards[1].attr("data-id")) {
            cards[0].addClass("correct");
            cards[1].addClass("correct");

            cardsTurned = 0;
            cards = [];
            turns.correct++;
            setTimeout(() => {
              checkIfComplete();
            }, 100);
          }
        }
        console.log(turns.score());
      });

      let startTime = Date.now();
      window.timer = window.setInterval(function () {
        let delta = Date.now() - startTime; // milliseconds elapsed since start
        secondsSpent = Math.floor(delta / 1000);
        // alternatively just show wall clock time:
        $(".game__timer").text(
          `${new Date(delta).getMinutes() < 10 ? "0" : ""}${new Date(delta).getMinutes()}:${new Date(delta).getSeconds() < 10 ? "0" : ""}${new Date(
            delta
          ).getSeconds()}`
        );
      }, 100);

      $("#quit").click((e) => {
        $("#page-home").trigger("click");
      });
    }, 100);
  });
});
