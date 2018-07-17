window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Si estamos logueados esconder "registro"
      firstSection.style.display = 'none';
      wall.classList.remove('d-none');
      loggedIn.classList.remove('d-none');
      console.log('User > ' + JSON.stringify(user));
      if (firebase.database().ref(`users/${user.uid}`)) {
        showInfo(user);  
      } else {
        firebase.database().ref(`users/${user.uid}`).set({
          mail: user.email,
          role: 'student'
        });
        showInfo(user);
      }
    } else {
      // No estamos logueados esconder 'Cerrar Sesión'
      loggedIn.classList.add('d-none');
      firstSection.style.display = 'block';
    }
  });
};

// Función de registro
function register() {
  const emailValue = loginUser.value;
  const passwordValue = loginPass.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(function() {
      console.log('Usuario registrado');
      loginUser.value = '';
      loginPass.value = '';
    })
    .catch((error) => {
      console.log('Error de firebase > ' + error.code);
      console.log('Error de firebase, mensaje > ' + error.message);
    });
}

// Funcion de ingreso
function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      loggedIn.classList.remove('d-none');
      console.log('Usuario con login exitoso');
    })
    .catch((error) => {
      console.log('Error de firebase > ' + error.code);
      console.log('Error de firebase, mensaje > ' + error.message);
    });
}

// Funcion para cerrar sesión
function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('chao');
      profile.classList.add('d-none');
      wall.classList.add('d-none');
      loggedIn.classList.add('d-none');
      location.reload();
    })
    .catch();
};

// Funcion ingresar con Facebook
function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope("user_birthday"); tienen que pedirle permiso a facebook
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log('Login con facebook');
      cameraIcon.classList.add('d-none');
    })
    .catch((error) => {
      console.log('Error de firebase > ' + error.code);
      console.log('Error de firebase, mensaje > ' + error.message);
    });
};

// Funcion ingresar con Google
function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      cameraIcon.classList.add('d-none');
    }).catch((error) => {
      // Handle Errors here.
      console.log('Error de Firebase ' + error.code);
      console.log('Error de Firebase, Message ' + error.message);
      // The email of the user's account used.
      const emailError = error.email;
      console.log('Error email esta en uso ' + emailError);
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      console.log('Error ' + credential);
    });
}