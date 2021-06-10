$(document).ready(() => {
  $(".game__card").click((e) => {
    $(e.currentTarget).addClass("turned");
    setTimeout(() => {
      $(e.currentTarget).removeClass("turned");
    }, 2000);
  });
});
