$(document).ready(() => {
  //Registering new user
  $("#add-user").click((e) => {
    e.preventDefault();

    let users = [];
    if (localStorage.getItem("users")) {
      JSON.parse(localStorage.getItem("users")).forEach((user) => users.push(user));
    }

    console.log(users);

    let newUser = {
      id: idGenerator(),
      firstName: $("#first-name").val(),
      lastName: $("#last-name").val(),
      email: $("#email").val(),
    };

    let youCanGo = true;
    if (users != null) {
      //looping through the data to check if there's no user with this email
      users.forEach((user) => {
        if (user.email == newUser.email) {
          youCanGo = false;
        }
      });
      if (youCanGo) {
        users.push(newUser);
      } else {
        alert("This email is already in use!");
        return;
      }
    } else {
      users.push(newUser);
    }

    //Updating local storage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("status", JSON.stringify({ isSigned: true, currentUser: newUser }));

    //Closing the form and initializing the inputs
    $("#reg").removeClass("active");
    $(".reg__input").val("");
    $(".reg__input").parent().removeClass("valid");

    //Updating UI
    $("#register").remove();
    $("#start").show();
  });

  //ID genratot function
  const idGenerator = () => {
    return "u" + Math.random().toString(36).substr(2, 9);
  };
});
