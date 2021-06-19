export function renderPage(page: "about" | "ranking" | "settings" | "game", gameSettings?: { gridSize: 4; cardType: "animal" }): void {
  function getPage(page: "about" | "ranking" | "settings" | "game", gameSettings?: { gridSize: 4; cardType: "animal" }): string {
    let content: string = ``;

    if (page === "about") {
      content = `
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
      `;
    } else if (page === "ranking") {
      const sortedUsers: User[] = new UsersStore()._getAllUsers().sort(function (x, y) {
        return y.score - x.score;
      });
      let i: number = 0;

      content =
        `
        <main class="rank">
          <div class="rank__container">
            <h1 class="h1">Best Players</h1>
            <ul class="rank__list">
            ` +
        sortedUsers.every((user) => {
          if (i < 0) {
            return `
                <li class="rank__item">
                  <div class="rank__item-container">
                    <img src="${user.avatar ? user.avatar : " /img/profile.png"}" alt="User 1" />
                      <div class="rank__item-details">
                        <h3>${user.firstName} ${user.lastName}</h3>
                        <p>${user.email}</p>
                      </div>
                    </div>
                  <h3 class="rank__item-score">Score: <span>${user.score}</span></h3>
                </li>`;
          }
        }) +
        `
            </ul>
          </div>
        </main>
      `;
    } else if (page === "settings") {
      content = `
        <main class="settings">
          <div class="settings__container">
            <label class="h1" for="card-type">Game Cards</label>
            <select name="card-type" id="card-type" class="settings__input">
              <option value="" selected>select game cards type</option>
              <option value="animal">Animals</option>
              <option value="flag">Flags</option>
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
      `;
    } else if (page === "game") {
      const pairs: number = (gameSettings.gridSize * gameSettings.gridSize) / 2;
      const gameModeSetup = () => {
        let cardIndexes: number[] = [];

        if (gameSettings.gridSize == 4) {
          for (let i = 0; i < 8; i++) {
            cardIndexes.push(i + 1, i + 1);
          }
        } else if (gameSettings.gridSize == 6) {
          for (let i = 0; i < 9; i++) {
            cardIndexes.push(i + 1, i + 1, i + 1, i + 1);
          }
        } else if (gameSettings.gridSize == 8) {
          for (let i = 0; i < 8; i++) {
            cardIndexes.push(i + 1, i + 1, i + 1, i + 1, i + 1, i + 1, i + 1, i + 1);
          }
        }

        return cardIndexes.sort((a, b) => 0.5 - Math.random());
      };

      content =
        `
        <main class="game">
          <div class="game__container">
            <div class="game__timer">00:00</div>
            <div class="game__cards">
              ` +
        gameModeSetup().forEach((i) => {
          return `
              <div class="game__card" data-id="photo${i}">
                <div class="game__card--front">
                  <img src="/img/mask.png" alt="Mask">
                </div>
                <div class="game__card--back">
                  <img src="/img/card-images/${gameSettings.cardType}-${i}.jpg" alt="Mask">
                </div>
              </div>
            `;
        }) +
        `
            </div>
          </div>
        </main>
      `;
    }

    return content;
  }

  const html: string = `
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
      ${getPage(page, gameSettings)}
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
    </section>
  `;
  console.log("worked");
  document.getElementById("app").innerHTML = html;
}