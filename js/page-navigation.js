$(document).ready(() => {
$("#app").html(`
<header class="header">
  <div class="header__item">
    <div class="header__item--logo">
      <span class="logo-top">Match</span>
      <span class="logo-bottom">Match</span>
    </div>
  </div>
  <nav class="navbar">
    <div class="navbar__item active">
      <a href="/" id="page-home" data-value="home">
        <svg>
          <use xlink:href="/fonts/symbol-defs.svg#i-about"></use>
        </svg>
        <h4>About Game</h4>
      </a>
    </div>
    <div class="navbar__item">
      <a href="/" id="page-rank" data-value="rank">
        <svg>
          <use xlink:href="/fonts/symbol-defs.svg#i-star"></use>
        </svg>
        <h4>Best Score</h4>
      </a>
    </div>
    <div class="navbar__item">
      <a href="/" id="page-settings" data-value="settings">
        <svg>
          <use xlink:href="/fonts/symbol-defs.svg#i-settings"></use>
        </svg>
        <h4>Game Settings</h4>
      </a>
    </div>
  </nav>
  <div class="header__item">
    <a href="#" class="btn btn--ghost" id="register">Register New Player</a>
    <a href="#" class="btn btn--ghost" id="start">Start Game</a>
    <a href="#" class="btn btn--ghost" id="quit">Quit</a>
    <span class="profile-avatar">
      <img src="/img/profile.png" alt="User Avatar">
    </span>
  </div>
</header>
<main id="main">
  <main class="instr">
    <h1 class="h1">How to play?</h1>
    <section class="instr__item">
      <div class="instr__content">
        <span class="instr__number">1</span>
        <p class="instr__text">Register new player in game</p>
      </div>
      <img src="/img/instr-1.png" class="instr__img"></img>
    </section>
    <section class="instr__item">
      <div class="instr__content">
        <span class="instr__number">2</span>
        <p class="instr__text">Configure your game settings</p>
      </div>
      <img src="/img/instr-2.png" class="instr__img"></img>
    </section>
    <section class="instr__item">
      <div class="instr__content">
        <span class="instr__number">3</span>
        <p class="instr__text">Start your new game!</p>
      </div>
      <img src="/img/instr-3.png" class="instr__img"></img>
    </section>
  </main>
</main>
<section class="reg" id="reg">
  <!-- add "active" class-name to make it visible -->
  <div class="reg__window">
    <h1 class="h1">Register new Player</h1>
    <div class="reg__form">
      <div class="reg__form--main" action="#">
        <label for="first-name" class="reg__label">
          First Name
          <input type="text" id="first-name" name="first-name" class="reg__input">
          <svg class="visible">
            <use xlink:href="/fonts/symbol-defs.svg#i-tick"></use>
          </svg>
        </label>
        <label for="last-name" class="reg__label">
          Last Name
          <input type="text" id="last-name" name="last-name" class="reg__input">
          <svg class="visible">
            <use xlink:href="/fonts/symbol-defs.svg#i-tick"></use>
          </svg>
        </label>
        <label for="email" class="reg__label">
          E-mail
          <input type="email" id="email" name="email" class="reg__input">
          <svg class="visible">
            <use xlink:href="/fonts/symbol-defs.svg#i-tick"></use>
          </svg>
        </label>
      </div>
      <div class="reg__form--avatar">
        <label for="avatar">
          <input type="file" id="avatar" class="reg__input" accept="image/png, image/jpg, image/jpeg">
          <img src="/img/profile.png" id="avatar-image" alt="Profile Icon">
        </label>
      </div>
      <div class="reg__buttons">
        <a href="/" class="btn btn--dark disabled" id="add-user">Add User</a>
        <a href="/" class="btn btn--light" id="cancel-reg">Cancel</a>
      </div>
    </div>
  </div>
</section>`);

//Registering new user
let db = null;
const request = indexedDB.open("users", 1);

request.onupgradeneeded = (e) => {
db = e.target.result;
const users = db.createObjectStore("usersData", { keyPath: "id" });
};

request.onsuccess = (e) => {
db = e.target.result;
};

const addUser = (user) => {
const tx = db.transaction("usersData", "readwrite");
tx.onerror = (e) => alert("There was an error: " + e.target.errorCode);
const usersData = tx.objectStore("usersData");
usersData.add(user);
};

const getUsers = (success) => {
const tx = db.transaction("usersData", "readonly");
const usersData = tx.objectStore("usersData");
const request = usersData.openCursor();
request.onsuccess = (e) => {
const cursor = request.result || e.target.result;

if (cursor) {
success(cursor.value);
cursor.continue();
}
};
};

request.onerror = (e) => {
alert("There was an error: " + e.target.errorCode);
};

//Page relocation

const defaultFunction = (e) => {
e.preventDefault();
$(".navbar__item").removeClass("active");
$(e.currentTarget).parent().addClass("active");
};

$("#page-settings").click((event) => {
defaultFunction(event);

$("#main").html(`
<main class="settings">
  <div class="settings__container">
    <label class="h1" for="cards">Game Cards</label>
    <select name="cards" id="cards" class="settings__input">
      <option value="" selected>select game cards type</option>
      <option value="animals">Animals</option>
      <option value="cars">Cars</option>
      <option value="cities">Cities</option>
    </select>

    <label class="h1" for="difficulty">Difficulty</label>
    <select name="difficulty" id="difficulty" class="settings__input">
      <option value="" selected>select game type</option>
      <option value="4">4x4</option>
      <option value="6">6x6</option>
      <option value="8">8x8</option>
    </select>
  </div>
</main>
`);
});

$("#page-home").click((event) => {
defaultFunction(event);

$("#main").html(`
<main class="instr">
  <h1 class="h1">How to play?</h1>
  <section class="instr__item">
    <div class="instr__content">
      <span class="instr__number">1</span>
      <p class="instr__text">Register new player in game</p>
    </div>
    <img src="/img/instr-1.png" class="instr__img"></img>
  </section>
  <section class="instr__item">
    <div class="instr__content">
      <span class="instr__number">2</span>
      <p class="instr__text">Configure your game settings</p>
    </div>
    <img src="/img/instr-2.png" class="instr__img"></img>
  </section>
  <section class="instr__item">
    <div class="instr__content">
      <span class="instr__number">3</span>
      <p class="instr__text">Start your new game!</p>
    </div>
    <img src="/img/instr-3.png" class="instr__img"></img>
  </section>
</main>
`);
});

$("#page-rank").click((event) => {
defaultFunction(event);
let users = [];

getUsers((user) => {
users.push(user);
});

$("#main").html(`
<main class="rank">
  <div class="rank__container">
    <h1 class="h1">Best Players</h1>
    <ul class="rank__list"></ul>
    </ul>
  </div>
</main>
`);

setTimeout(() => {
users.sort((a, b) => {
return a.score + b.score;
});

users.forEach((user) => {
$(".rank__list").append(`<li class="rank__item">
  <div class="rank__item-container">
    <img src="${user.avatar ? user.avatar : " /img/profile.png"}" alt="User 1" />
    <div class="rank__item-details">
      <h3>${user.firstName} ${user.lastName}</h3>
      <p>${user.email}</p>
    </div>
  </div>
  <h3 class="rank__item-score">Score: <span>${user.score}</span></h3>
</li>`);
});
}, 100);
});

//Game start
$("#start").click((event) => {
defaultFunction(event);

$("#main").html(`
<main class="game">
  <div class="game__container">
    <div class="game__timer">00:01</div>
    <div class="game__cards">
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-2.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-6.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-3.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-2.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-1.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-3.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-2.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-5.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-5.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-1.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-6.jpg" alt="Mask">
        </div>
      </div>
      <div class="game__card">
        <div class="game__card--front">
          <img src="/img/mask.png" alt="Mask">
        </div>
        <div class="game__card--back">
          <img src="/img/animal-4.jpg" alt="Mask">
        </div>
      </div>
    </div>
  </div>
</main>
`);

$(".game__card").click((e) => {
console.log("turned");
$(e.currentTarget).addClass("turned");
setTimeout(() => {
$(e.currentTarget).removeClass("turned");
console.log("returned");
}, 2000);
});
});
});