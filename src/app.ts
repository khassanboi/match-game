// importing
import {
  generateUserID,
  imgToBase64Converter,
  imgToBlobConverter,
  formValidator,
  initUI,
} from "./ts/utils";
import { setTemplate, renderPage } from "./ts/pages";
import UsersStore, { User } from "./ts/UsersStore";
import "./scss/style.scss";

// interfacess
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

// when application has started it renders about page
setTemplate();
renderPage("about");

let gridSize: number;

// game operation and logic
function startGame() {
  const userStore = new UsersStore();
  const currentUser: User = JSON.parse(localStorage.getItem("currentUser"));
  let secondsSpent: number = 0;
  const cards: Cards = {
    turnedNumber: 0,
    turnedList: [],
    pairsNumber: (gridSize * gridSize) / 2,
  };

  const turns: Turns = {
    correct: 0,
    incorrect: 0,
    score() {
      return (this.correct + this.incorrect - this.incorrect) * 100 -
        secondsSpent * 10 >
        0
        ? (this.correct + this.incorrect - this.incorrect) * 100 -
            secondsSpent * 10
        : 0;
    },
  };

  function checkIfComplete() {
    if (cards.pairsNumber === turns.correct) {
      clearInterval(window.timer);
      currentUser.score += turns.score();
      userStore.updateScore(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      alert(
        `You have completed the game. Your score is: ${turns.score()} Would you like to go to ranking page?`
      );
      document.getElementById("page-rank").click();
    }
  }

  document.querySelectorAll(".game__card").forEach((card) => {
    card.addEventListener("click", () => {
      if (cards.turnedNumber < 2) {
        (cards.turnedList as Array<Node>).push(card);
        card.classList.add("turned");
        cards.turnedNumber += 1;

        if (
          cards.turnedNumber === 2 &&
          (cards.turnedList[0] as HTMLElement).dataset.id !==
            (cards.turnedList[1] as HTMLElement).dataset.id
        ) {
          cards.turnedList.forEach((turnedCard) => {
            turnedCard.classList.add("incorrect");
          });

          setTimeout(() => {
            document
              .querySelectorAll(".game__card:not(.correct)")
              .forEach((incorrectCard) => {
                incorrectCard.classList.remove("turned");
              });

            cards.turnedList.forEach((everyCard) => {
              everyCard.classList.remove("incorrect");
            });

            cards.turnedNumber = 0;
            cards.turnedList = [];
          }, 1000);
          turns.incorrect += 1;
        } else if (
          cards.turnedNumber === 2 &&
          (cards.turnedList[0] as HTMLElement).dataset.id ===
            (cards.turnedList[1] as HTMLElement).dataset.id
        ) {
          cards.turnedList.forEach((correctCard) => {
            correctCard.classList.add("correct");
          });

          cards.turnedNumber = 0;
          cards.turnedList = [];

          turns.correct += 1;
          setTimeout(() => {
            checkIfComplete();
          }, 100);
        }
      }
    });
  });

  const startTime = Date.now();
  window.timer = window.setInterval(() => {
    const delta = Date.now() - startTime; // milliseconds elapsed since start
    secondsSpent = Math.floor(delta / 1000);
    // alternatively just show wall clock time:
    (document.querySelector(".game__timer") as HTMLElement).innerText = `${
      new Date(delta).getMinutes() < 10 ? "0" : ""
    }${new Date(delta).getMinutes()}:${
      new Date(delta).getSeconds() < 10 ? "0" : ""
    }${new Date(delta).getSeconds()}`;
  }, 100);
}

// other page navigations
document.querySelectorAll(".page-render").forEach((btn) => {
  initUI();
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const page = (btn as HTMLElement).dataset.value;
    if (
      page === "about" ||
      page === "ranking" ||
      page === "settings" ||
      page === "game" ||
      page === "reg"
    ) {
      if (page !== "game") {
        renderPage(page);
        if (window.timer) clearInterval(window.timer);
      } else if (page === "game") {
        gridSize =
          document.getElementById("difficulty") &&
          (<HTMLInputElement>document.getElementById("difficulty")).value
            ? parseInt(
                (<HTMLInputElement>document.getElementById("difficulty")).value,
                10
              )
            : 4;

        renderPage("game", {
          gridSize,
          cardType:
            document.getElementById("card-type") &&
            (<HTMLInputElement>document.getElementById("card-type")).value
              ? (<HTMLInputElement>document.getElementById("card-type")).value
              : "animal",
        });

        startGame();
      }
    }

    document.querySelectorAll(".navbar__item").forEach((nav) => {
      nav.classList.remove("active");
    });
    btn.closest("div").classList.add("active");
    // window.clearInterval(window.timer);
  });
});

// registration
document.getElementById("register").addEventListener("click", () => {
  renderPage("reg");

  document.querySelectorAll(".reg__input").forEach((input) => {
    if (input.getAttribute("type") === "file") {
      input.addEventListener("change", () => {
        document
          .getElementById("avatar-image")
          .setAttribute(
            "src",
            URL.createObjectURL(
              imgToBlobConverter(
                (document.getElementById("avatar") as HTMLInputElement).files[0]
              )
            )
          );
      });
    } else {
      ["change", "keydown"].forEach((evt) => {
        input.addEventListener(evt, () => {
          formValidator(input);
          let formIsValid = true;
          document
            .querySelectorAll(".reg__input:not(#avatar)")
            .forEach((inp) => {
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
    document
      .getElementById("app")
      .removeChild(document.getElementById("reg-window"));
  });

  document.getElementById("add-user").addEventListener("click", () => {
    const usersStore = new UsersStore();
    const users: User[] = usersStore.getAllUsers();
    let avatar: string | null;

    if (
      (document.getElementById("avatar") as HTMLInputElement).files.length !== 0
    ) {
      imgToBase64Converter(
        imgToBlobConverter(
          (document.getElementById("avatar") as HTMLInputElement).files[0]
        ),
        (base64) => {
          avatar = base64.toString();
        }
      );
    } else {
      avatar = null;
    }

    setTimeout(() => {
      let newUser: User = {
        id: generateUserID(),
        firstName: (document.getElementById("first-name") as HTMLInputElement)
          .value,
        lastName: (document.getElementById("last-name") as HTMLInputElement)
          .value,
        email: (document.getElementById("email") as HTMLInputElement).value,
        score: 0,
        avatar,
      };

      let emailExists: boolean = false;
      // Adding to IndexedDb if email doesn't exist
      if (users) {
        // looping through the data to check if there's any user with the same email
        users.forEach((user) => {
          if (user.email === newUser.email) {
            newUser = user;
            emailExists = true;
          }
        });
      }
      if (!emailExists) {
        usersStore.addUser(newUser);
      }

      // Setting the current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      document
        .getElementById("app")
        .removeChild(document.getElementById("reg-window"));
      initUI();
    }, 1000);
  });
});

document.getElementById("quit").addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  document.getElementById("page-about").click();
  initUI();
});
