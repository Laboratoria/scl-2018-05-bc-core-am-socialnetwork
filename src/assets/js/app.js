window.onload = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      // Usuario está logeado
      screen1.style.display = 'none';
      screen2.style.display = 'none';
      screen3.style.display = 'block';
      console.log('User > ' + JSON.stringify(user));
    } else {
      // Usuario no está logeado
      screen1.style.display = 'block';
      screen2.style.display = 'none';
      screen3.style.display = 'none';
      console.log('Usuario no logeado');
    }
  });
};

// Sección registrar
function register() {
  const emailValue = document.getElementById('email_signUp').value;
  const passwordValue = document.getElementById('password_signUp').value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(()=> {
      console.log('Usuario registrado');
    })
    .catch((error)=> {
      console.log('Error de Firebase: ' + error.code);
      console.log('Error de Firebase, mensaje: ' + error.message);
    });
}

function login() {
  const emailValue = document.getElementById('email_login').value;
  const passwordValue = document.getElementById('password_login').value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(()=> {
      console.log('Usuario con login exitoso');
      screen3.style.display = 'block';
      screen1.style.display = 'none';
      screen2.style.display = 'none';
    })
    .catch((error)=> {
      console.log('Error de Firebase: ' + error.code);
      console.log('Error de Firebase, mensaje: ' + error.mensaje);
      screen1.style.display = 'block';
      screen2.style.display = 'none';
      screen3.style.display = 'none';
    });
}

function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(()=> {
      console.log('Login con facebook');
    })
    .catch((error) => {
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase, mensaje > ' + error.message);
    });
}

function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(()=> {
      console.log('Login con Google');
    })
    .catch((error) => {
      console.log('Error de Firebase > ' + error.code);
      console.log('Error de Firebase, mensaje > ' + error.message);
    });
}

function logout() {
  firebase.auth().signOut()
    .then(()=> {
      console.log('Cerraste sesión');
    })
    .catch();
}

//Función del menú lateral
function toggleMenu() { 
  if (sideMenu.className.indexOf("menu_closed") >= 0) { 
    openMenu();  
  } else {
    closeMenu(); 
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed')
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed');
  sideMenu.classList.remove('menu_open');
}

/*  
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    // ...
  });
});

// Sección ingreso de usuarios registrados
ingresar.addEventListener('click', () => {
  const email2 = document.getElementById('email2').value;
  const password2 = document.getElementById('password2').value;

  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessaje);
    // ...
  });
});

const observador = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Existe usuario activo');
      aparece();
      // User is signed in.
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      console.log('No existe usuario activo');
      // ...
    }
  });
};

observador();

const aparece = () => {
  let contenido = document.getElementById('contenido');
  contenido.innerHTML = ` 
  <p>Bienvenido</p>
  <button onclick="cerrar()">Cerrar Sesión</button>
  `;
};

function cerrar() {
  firebase.auth().signOut()
    .then(function() {
      console.log('Cerrando sesión');
    })
    .catch(function(error) {
      console.log(error);
    });
}*/