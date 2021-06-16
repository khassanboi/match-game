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

  $("#add-user").click((e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");

    let users = [];
    var avatar = "nothing";

    getUsers((user) => {
      users.push(user);
    });

    avatar = imgConverter(imgToBlob($("#avatar").prop("files")[0]), (base64) => {
      avatar = base64.toString();
    });

    setTimeout(() => {
      let newUser = {
        id: idGenerator(),
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        email: $("#email").val(),
        score: 0,
        avatar: avatar,
      };

      let emailExists = false;
      //Adding to IndexedDb if email doesn't exist
      if (users) {
        //looping through the data to check if there's any user with the same email
        users.forEach((user) => {
          if (user.email == newUser.email) {
            newUser = user;
            emailExists = true;
          }
        });
      }
      if (!emailExists) {
        addUser(newUser);
      }

      //Setting the current user
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      //Closing the form and initializing the inputs
      $("#reg").removeClass("active");
      $(".reg__input").val("");
      $(".reg__input").parent().removeClass("valid");

      //Updating UI
      $("#register").remove();
      $("#start").show();
    }, 200);
  });

  $("#avatar").change((e) => {
    const avatar = $("#avatar").prop("files")[0];
    if (avatar) {
      $("#avatar-image").attr("src", URL.createObjectURL(imgToBlob(avatar)));
    }
  });

  //ID generator
  const idGenerator = () => {
    return "u" + Math.random().toString(36).substr(2, 9);
  };

  //Img to Blob
  const imgToBlob = (img) => {
    var binaryData = [];
    binaryData.push(img);
    return new Blob(binaryData, { type: "image" });
  };

  //Img to Base64 converter
  const imgConverter = (img, success) => {
    var reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = function () {
      success(reader.result);
    };
    reader.onerror = function (error) {
      alert("Error: ", error);
    };
  };
});
