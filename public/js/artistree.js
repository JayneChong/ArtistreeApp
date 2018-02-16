


//-------------- LOGIN: currently incomplete -----------------

function login() {
 var email = $('#email').val();
    var password = $('#password').val();
    $.post('/login', {email: email, password: password}, function(data, err) {
      console.log(data);
      window.location.href = "/home";
    })
    .fail(function(err) {
      showFormError(
        {
          title: "Error",
          text: err.responseText
        }

      );
      console.log(err.responseText);
    });
  }

  $("#login-btn").click(function(e) {
    login();
  });

  $('#password').keypress(function (e) {
    var key = e.which;
    if(key == 13 &&  okPressed) 
    {
      okPressed = false;
      login();
      return false;
    }
  });

    $("#register-btn").click(function(e) {
    var name = $('#reg-name').val();
    var email = $('#reg-email').val();
    var password = $('#reg-password').val();
    if (name == "") {
      showFormError({title: "Error", text: "Please enter a name"});
      return;
    } else if (email == "") {
      showFormError({title: "Error", text: "Please enter an email."});
      return;
    } else if (password == "") {
      showFormError({title: "Error", text: "Please enter a password."});
      return;
    }
    $.post('/register', {
      name: name,
      email: email
      password: password,
      
    }, function(data) {
      console.log("Successfully created an account!");
      showSuccess({title: "Success!", text: "Sign up success!"});

    }).fail(function(err) {
      showFormError({title: "Error", text: "Email already exists!"});
      console.log("Email already exists!");
    });


  });

  $('#email').keypress(function (e) {
    var key = e.which;
    if(key == 13 & okPressed)  // the enter key code
    {
      okPressed = false;
      login();
      return false;
    }
  });

});