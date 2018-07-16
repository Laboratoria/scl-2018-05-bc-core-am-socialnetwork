window.onload = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      toShowScreen3(user);
      // Usuario está logeado
      var displayName = user.displayName;
      var email = user.email;

      console.log('>>>>>>>>>>>>>>>');
      console.log(user.emailVerified);
      console.log('>>>>>>>>>>>>>>>');

      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log(user);
    } else {
      // Usuario no está logeado
      screen1.style.display = 'block';
      screen2.style.display = 'none';
      screen3.style.display = 'none';
      console.log('Usuario no logeado');
    }
  });
};

function toShowScreen3(user) {
  let userFacebook = user.providerData;
  let userGoogle = user.providerData;
  if (user.emailVerified) {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  } else if (userFacebook[0].providerId === 'facebook.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  } else if (userGoogle[0].providerId === 'google.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
  }
}

// Sección registrar
function register() {
  const emailValue = document.getElementById('email_signUp').value;
  const passwordValue = document.getElementById('password_signUp').value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
    .then(function() {
      check();
      console.log('Usuario registrado');
    })
    .catch(function(error) {
      console.log('Error de Firebase: ' + error.code);
      console.log('Error de Firebase, mensaje: ' + error.message);
    });
}

function login() {
  const emailValue = document.getElementById('email_login').value;
  const passwordValue = document.getElementById('password_login').value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    /* .then(function() {
      console.log('Usuario con login exitoso');
      toShowScreen3(user);
    })*/
    .catch(function(error) {
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
      return true;
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

function check() {
  var user = firebase.auth().currentUser;
  user.sendEmailVerification()
    .then(function() {
    // Email sent.
      console.log('Enviando correo....');
    })
    .catch(function(error) {
    // An error happened.
      console.log(error);
    });
}

// Función del menú lateral
function toggleMenu() { 
  if (sideMenu.className.indexOf('menu_closed') >= 0) { 
    openMenu();  
  } else {
    closeMenu(); 
  }
}

function openMenu() {
  sideMenu.classList.remove('menu_closed');
  sideMenu.classList.add('menu_open');
}

function closeMenu() {
  sideMenu.classList.add('menu_closed');
  sideMenu.classList.remove('menu_open');
}

// Publicar, eliminar, editar y guardar cambios (CRUD)
// Agregar documentos (create)
let db = firebase.firestore();

function userPost() {
  let message = document.getElementById('messageArea').value;

  db.collection('users').add({
    textMessage: message
   
  })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      document.getElementById('messageArea').value = '';

  });
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
}

//Leer documentos (read)
let container = document.getElementById('messageContainer');
db.collection("users").onSnapshot((querySnapshot) => {
  container.innerHTML = '';
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().textMessage}`);
      container.innerHTML += `
      <p>${doc.data().textMessage}</p>
      <button onclick="edit('${doc.id}','${doc.data().textMessage}')"> Editar </button>
      <button onclick="deletePost('${doc.id}')"> Eliminar </button> 
      `
    });
});

//Borrar documentos (delete)
function deletePost(id) {
  db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
}

//Editar documentos (update)
function edit(id, message) {
        document.getElementById('messageArea').value = message;
      let btnPost = document.getElementById('btnPost');
      btnPost.innerHTML = 'Guardar cambios';

      btnPost.onclick = function() {
        let editPost = db.collection("users").doc(id);

        let message = document.getElementById('messageArea').value; 

      return editPost.update({
        textMessage: message
      })
      .then(function() {
          console.log("Document successfully updated!");
          btnPost.innerHTML = 'Publicar';
          btnPost.onclick = userPost;
          document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
});
}
}