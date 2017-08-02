
firebase.createUser = (name, email, password, url) => {
     
      
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    // [END createwithemail]
    // callSomeFunction(); Optional
    // var user = firebase.auth().currentUser;
    if (email.indexOf("sdcoding") == -1) {
      Materialize.toast("Please use your sdcoding.com email", 2000)
      return
    }
    user.updateProfile({
        displayName: name,
        photoURL: url
    }).then(function() {
        // Update successful
            window.location.href = "main"

    }, function(error) {
        // An error happened.
    });        
}, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
        Materialize.toast('The password is too weak.', 4000);
    } else {
        console.error(error);
    }
    // [END_EXCLUDE]
});
    }
firebase.login = (email, password) => {
  // Sign in with email and pass.
  // [START authwithemail]
  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    window.location.href = "main"
  },function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      Materialize.toast('Wrong password.', 4000);
    } 
    else if (errorCode === 'auth/user-not-found') {
      Materialize.toast('User Not Found', 4000)
    }
        else {
              window.location.href = "main"

        }
    console.log(error);

    // [END_EXCLUDE]
  });
}

firebase.forgotPassword = (email) => {

      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        Materialize.toast('Password Reset Email Sent!', 4000);
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          Materialize.toast(errorMessage, 4000);
        } else if (errorCode == 'auth/user-not-found') {
          Materialize.toast(errorMessage, 4000);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }