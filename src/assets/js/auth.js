window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // Si estamos logueados esconder "registro"
      firstSection.style.display = 'none';
      loggedIn.style.display = 'block';
      console.log('User > ' + JSON.stringify(user));
    } else {
      // No estamos logueados esconder 'Cerrar Sesión'
      firstSection.style.display = 'block';
      loggedIn.style.display = 'none';
    }
  });
};

// Función de registro
function register() {
  const emailValue = loginUser.value;
  const passwordValue = loginPass.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log('Usuario registrado');
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
