$(document).ready(() => {
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
                         <img src="${user.avatar ? user.avatar : "/img/profile.png"}" alt="User 1" />
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
