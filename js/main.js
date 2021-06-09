$(document).ready(() => {
	//Registration form open-close
	$("#register").click(() => {
		$("#reg").addClass("active");
	});
	$("#cancel-reg").click(() => {
		$("#reg").removeClass("active");
	});

	//Registration form validation
	$("#first-name").keydown(() => {
		if (!$("#first-name").val()) {
			$("#first-name").parent().removeClass("active");
		} else {
			$("#first-name").parent().addClass("active");
		}
	});

	$("#last-name").keydown(() => {
		if (!$("#last-name").val()) {
			$("#last-name").parent().removeClass("active");
		} else {
			$("#last-name").parent().addClass("active");
		}
	});

	$(".game__card").click((e) => {
		$(e.currentTarget).addClass("turned");
		setTimeout(() => {
			$(e.currentTarget).removeClass("turned");
		}, 2000);
	});

	//Page relocation

	function defaultFunction(e) {
		e.preventDefault();
		$(".navbar__item").removeClass("active");
		console.log($(e.currentTarget).parent());
		$(e.currentTarget).parent().addClass("active");
	}

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
			<section class="reg" id="reg"> <!-- add "active" class-name to make it visible -->
				<div class="reg__window">
					<h1 class="h1">Register new Player</h1>
					<div class="reg__form">
						<form action="#">
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
						</form>
						<svg class="reg__form--avatar">
							<use xlink:href="/fonts/symbol-defs.svg#i-user"></use>
						</svg>
						<div class="reg__buttons">
							<a href="#" class="btn btn--dark" id="add-user">Add User</a>
							<a href="#" class="btn btn--light" id="cancel-reg">Cancel</a>
						</div>
					</div>
				</div>
			</section>
		`);
	});

	$("#page-rank").click((event) => {
		defaultFunction(event);

		$("#main").html(`
			<main class="rank">
			<div class="rank__container">
				<h1 class="h1">Best Players</h1>
				<ul class="rank__list">
					<li class="rank__item">
						<div class="rank__item-container">
							<img src="/img/animal-3.jpg" alt="User 1" />
							<div class="rank__item-details">
								<h3>Nicci Troiani</h3>
								<p>nicci@gmail.com</p>
							</div>
						</div>
						<h3 class="rank__item-score">Score: <span>456</span></h3>
					</li>
					<li class="rank__item">
						<div class="rank__item-container">
							<img src="/img/animal-2.jpg" alt="User 1" />
							<div class="rank__item-details">
								<h3>George Fields</h3>
								<p>jack@gmail.com</p>
							</div>
						</div>
						<h3 class="rank__item-score">Score: <span>358</span></h2>
					</li>
					<li class="rank__item">
						<div class="rank__item-container">
							<img src="/img/animal-4.jpg" alt="User 1" />
							<div class="rank__item-details">
								<h3>Jones Dermot</h3>
								<p>dermot@gmail.com</p>
							</div>
						</div>
						<h3 class="rank__item-score">Score: <span>211</span></h3>
					</li>
					<li class="rank__item">
						<div class="rank__item-container">
							<img src="/img/animal-1.jpg" alt="User 1" />
							<div class="rank__item-details">
								<h3>Jane Doe</h3>
								<p>jane.doe@gmail.com</p>
							</div>
						</div>
						<h3 class="rank__item-score">Score: <span>169</span></h2>
					</li>
				</ul>
			</div>
		</main>
		`);
	});

	$("#page-game").click((event) => {
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
	});
});
