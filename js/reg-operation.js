$(document).ready(() => {
  //Registering new user
  $("#add-user").click((e) => {
    e.preventDefault();

    let users = [];
    if (localStorage.getItem("users")) {
      JSON.parse(localStorage.getItem("users")).forEach((user) => users.push(user));
    }

    let newUser = {
      id: idGenerator(),
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      email: $("#email").val(),
      score: 0,
    };
    let emailExists = false;
    if (users != null) {
      //looping through the data to check if there's any user with the same email
      users.forEach((user) => {
        if (user.email == newUser.email) {
          newUser = user;
          emailExists = true;
        }
      });
    }
    if (!emailExists) {
      users.push(newUser);
    }

    //Updating local storage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    //Closing the form and initializing the inputs
    $("#reg").removeClass("active");
    $(".reg__input").val("");
    $(".reg__input").parent().removeClass("valid");

    //Updating UI
    $("#register").remove();
    $("#start").show();
  });

  //ID generator
  const idGenerator = () => {
    return "u" + Math.random().toString(36).substr(2, 9);
  };

  //Img to Base64 converter
  const imgConverter = (img) => {
    var reader = new FileReader();
    var imgBase64;
    reader.readAsDataURL(img);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      alert("Error: ", error);
    };
  };
});
