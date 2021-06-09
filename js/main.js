$(document).ready(() => {
  //Registration form open-close
  $("#register").click(() => {
    $("#reg").addClass("active");
  });
  $("#cancel-reg").click(() => {
    $("#reg").removeClass("active");
  });

  

  $(".game__card").click((e) => {
    $(e.currentTarget).addClass("turned");
    setTimeout(() => {
      $(e.currentTarget).removeClass("turned");
    }, 2000);
  });
});
