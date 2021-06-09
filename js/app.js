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
});
