$(document).ready(() => {
  //Registration form validation
  $("#first-name").keydown(() => {
    setTimeout(() => {
      if (!$("#first-name").val()) {
        $("#first-name").parent().removeClass("active");
      } else {
        $("#first-name").parent().addClass("active");
      }
    }, 100);
  });

  const validateForm = (input) => {
    const chars = `~!@#$%^&*()[]{}_-+=|:;"'<>,.?/1234567890`;
    const emailChars = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (
      ($(input).attr("type") == "text" &&
        $(input).val().trim() &&
        !chars.split("").some((ch) => $(input).val().includes(ch)) &&
        $(input).val().split("").length <= 30) ||
      ($(input).attr("type") == "email" && emailChars.test($(input).val()))
    ) {
      //input is valid
      $(input).parent().removeClass("invalid");
      $(input).parent().addClass("valid");
      return true;
    } else {
      //input is not valid
      $(input).parent().removeClass("valid");
      $(input).parent().addClass("invalid");
      return false;
    }
  };

  $(".reg__input").keydown((event) => {
    setTimeout(() => {
      validateForm(event.target);
    }, 100);

    //enable/disable submitting button
    if ($("#first-name").parent().hasClass("valid") && $("#last-name").parent().hasClass("valid") && $("#email").parent().hasClass("valid")) {
      $("#add-user").removeClass("disabled");
    } else {
      $("#add-user").addClass("disabled");
    }
  });
});
