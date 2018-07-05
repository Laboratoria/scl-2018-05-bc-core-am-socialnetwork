const registrar = document.getElementById('registrar');
const ingresar = document.getElementById('ingresar');
let config = {
  apiKey: 'AIzaSyBqGOoPiGov2tepu9YuCb7KJ423HcTTUVE',
  authDomain: 'usuarios-1e3b0.firebaseapp.com',
  databaseURL: 'https://usuarios-1e3b0.firebaseio.com',
  projectId: 'usuarios-1e3b0',
  storageBucket: 'usuarios-1e3b0.appspot.com',
  messagingSenderId: '6033069535'
};
firebase.initializeApp(config);

// Sección registrar
registrar.addEventListener('click', ()=> {  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
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
}