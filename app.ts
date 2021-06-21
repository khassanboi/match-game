//importing
import { generateUserID, imgToBase64Converter, imgToBlobConverter, formValidator } from "./src/utils.js";
import { setTemplate, renderPage } from "./src/pages.js";
import UsersStore, { User } from "./src/UsersStore.js";

//interfaces
declare global {
  interface Window {
    timer: number;
  }
}

interface Turns {
  correct: number;
  incorrect: number;
  score: () => number;
}

interface Cards {
  turnedNumber: number;
  turnedList: NodeListOf<Element> | [];
  pairsNumber: number;
}

//when application has started it renders about page
setTemplate();
renderPage("about");

let gridSize: number;

//other page navigations
document.querySelectorAll(".page-render").forEach((btn) => {
  initUI();
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const page = (btn as HTMLElement).dataset.value;
    if (page === "about" || page === "ranking" || page === "settings" || page === "game" || page === "reg")
      if (page !== "game") {
        renderPage(page);
        if (window.timer) clearInterval(window.timer);
      } else if (page === "game") {
        gridSize =
          document.getElementById("difficulty") && (<HTMLInputElement>document.getElementById("difficulty")).value
            ? parseInt((<HTMLInputElement>document.getElementById("difficulty")).value)
            : 4;

        renderPage("game", {
          gridSize: gridSize,
          cardType:
            document.getElementById("card-type") && (<HTMLInputElement>document.getElementById("card-type")).value
              ? (<HTMLInputElement>document.getElementById("card-type")).value
              : "animal",
        });

        startGame();
      }

    document.querySelectorAll(".navbar__item").forEach((nav) => {
      nav.classList.remove("active");
    });
    btn.closest("div").classList.add("active");
    // window.clearInterval(window.timer);
  });
});

//registration
document.getElementById("register").addEventListener("click", () => {
  renderPage("reg");

  document.querySelectorAll(".reg__input").forEach((input) => {
    if (input.getAttribute("type") == "file") {
      input.addEventListener("change", () => {
        document
          .getElementById("avatar-image")
          .setAttribute("src", URL.createObjectURL(imgToBlobConverter((document.getElementById("avatar") as HTMLInputElement).files[0])));
      });
    } else {
      ["change", "keydown"].forEach((evt) => {
        input.addEventListener(evt, () => {
          formValidator(input);
          let formIsValid: boolean = true;
          document.querySelectorAll(".reg__input:not(#avatar)").forEach((inp) => {
            formIsValid = inp.parentElement.classList.contains("valid");
          });
          if (formIsValid) {
            document.getElementById("add-user").classList.remove("disabled");
          } else {
            document.getElementById("add-user").classList.add("disabled");
          }
        });
      });
    }
  });

  document.getElementById("cancel-reg").addEventListener("click", () => {
    document.getElementById("app").removeChild(document.getElementById("reg-window"));
  });

  document.getElementById("add-user").addEventListener("click", () => {
    const usersStore = new UsersStore();
    let users: User[] = usersStore._getAllUsers();
    let avatar: string | null;

    if ((document.getElementById("avatar") as HTMLInputElement).files.length != 0) {
      imgToBase64Converter(imgToBlobConverter((document.getElementById("avatar") as HTMLInputElement).files[0]), (base64) => {
        avatar = base64.toString();
      });
    } else {
      avatar = null;
    }

    setTimeout(() => {
      let newUser: User = {
        id: generateUserID(),
        firstName: (document.getElementById("first-name") as HTMLInputElement).value,
        lastName: (document.getElementById("last-name") as HTMLInputElement).value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        score: 0,
        avatar: avatar,
      };

      let emailExists: boolean = false;
      //Adding to IndexedDb if email doesn't exist
      if (users) {
        //looping through the data to check if there's any user with the same email
        users.forEach((user) => {
          if (user.email == newUser.email) {
            newUser = user;
            emailExists = true;
          }
        });
      }
      if (!emailExists) {
        usersStore._addUser(newUser);
      } else {
      }

      //Setting the current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      document.getElementById("app").removeChild(document.getElementById("reg-window"));
      initUI();
    }, 1000);
  });
});

document.getElementById("quit").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  document.getElementById("page-about").click();
  initUI();
});

//game operation and logic
function startGame() {
  let cards: Cards = {
    turnedNumber: 0,
    turnedList: [],
    pairsNumber: (gridSize * gridSize) / 2,
  };

  let turns: Turns = {
    correct: 0,
    incorrect: 0,
    score() {
      return (this.correct + this.incorrect - this.incorrect) * 100 - secondsSpent * 10 > 0
        ? (this.correct + this.incorrect - this.incorrect) * 100 - secondsSpent * 10
        : 0;
    },
  };

  const userStore = new UsersStore();
  let currentUser: User = JSON.parse(localStorage.getItem("currentUser"));
  let secondsSpent: number = 0;

  function checkIfComplete() {
    console.log("worked");

    if (cards.pairsNumber > turns.correct) {
      return;
    } else if (cards.pairsNumber == turns.correct) {
      clearInterval(window.timer);
      currentUser.score += turns.score();
      userStore._updateScore(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      if (confirm(`You have completed the game. Your score is: ${turns.score()} Would you like to play once more?`)) {
        document.getElementById("start").click();
      } else {
        document.getElementById("page-rank").click();
      }
    }
  }

  document.querySelectorAll(".game__card").forEach((card) => {
    card.addEventListener("click", () => {
      if (cards.turnedNumber < 2) {
        (cards.turnedList as Array<Node>).push(card);
        card.classList.add("turned");
        cards.turnedNumber++;

        if (cards.turnedNumber == 2 && (cards.turnedList[0] as HTMLElement).dataset.id != (cards.turnedList[1] as HTMLElement).dataset.id) {
          cards.turnedList.forEach((card) => {
            card.classList.add("incorrect");
          });

          setTimeout(() => {
            document.querySelectorAll(".game__card:not(.correct)").forEach((card) => {
              card.classList.remove("turned");
            });

            cards.turnedList.forEach((card) => {
              card.classList.remove("incorrect");
            });

            cards.turnedNumber = 0;
            cards.turnedList = [];
          }, 1000);
          turns.incorrect++;
        } else if (cards.turnedNumber == 2 && (cards.turnedList[0] as HTMLElement).dataset.id == (cards.turnedList[1] as HTMLElement).dataset.id) {
          cards.turnedList.forEach((card) => {
            card.classList.add("correct");
          });

          cards.turnedNumber = 0;
          cards.turnedList = [];

          turns.correct++;
          setTimeout(() => {
            checkIfComplete();
          }, 100);
        }
      }
    });
  });

  let startTime = Date.now();
  window.timer = window.setInterval(function () {
    let delta = Date.now() - startTime; // milliseconds elapsed since start
    secondsSpent = Math.floor(delta / 1000);
    // alternatively just show wall clock time:
    (document.querySelector(".game__timer") as HTMLElement).innerText = `${new Date(delta).getMinutes() < 10 ? "0" : ""}${new Date(
      delta
    ).getMinutes()}:${new Date(delta).getSeconds() < 10 ? "0" : ""}${new Date(delta).getSeconds()}`;
  }, 100);
}

function initUI() {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser == null) {
    document.querySelectorAll(".signed-in").forEach((item) => {
      (item as HTMLElement).style.display = "none";
    });
    (document.querySelector(".not-signed-in") as HTMLElement).style.display = "inline-block";
  } else {
    document.querySelectorAll(".signed-in").forEach((item) => {
      (item as HTMLElement).style.display = "inline-block";
    });
    (document.querySelector(".not-signed-in") as HTMLElement).style.display = "none";
    JSON.parse(currentUser).avatar
      ? document.getElementById("profile-avatar").setAttribute("src", JSON.parse(currentUser).avatar)
      : document.getElementById("profile-avatar").setAttribute("src", "/img/profile.png");
  }
}
