window.onload = () => {
  firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
      toShowScreen3(user);
      // Usuario está logeado
      var displayName = user.displayName;
      var email = user.email;
      console.log('>>>>>>>>>>>>>>>>');
      console.log(displayName);
      document.getElementById('userName').innerHTML = displayName;

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
  let providerData = user.providerData;
  let userGoogle = user.providerData;
  let nameFacebook = providerData[0].displayName;
  if (user.emailVerified) {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
    document.getElementById('menuNav').style.visibility = 'visible';
    closeMenu();
    let displayName = email;
  } else if (providerData[0].providerId === 'facebook.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
    document.getElementById('menuNav').style.visibility = 'visible';
    closeMenu();
  } else if (userGoogle[0].providerId === 'google.com') {
    document.getElementById('screen1').style.display = 'none';
    document.getElementById('screen2').style.display = 'none';
    document.getElementById('screen3').style.display = 'block';
    document.getElementById('menuNav').style.visibility = 'visible';
    closeMenu();
  }
}

function toShowScreenAlimentacion() {
  document.getElementById('screen3').style.display = 'none';
  document.getElementById('screenCuidados').style.display = 'none';
  document.getElementById('screenDirectorio').style.display = 'none';
  document.getElementById('screenAlimentacion').style.display = 'block';
  closeMenu();
}

function toShowScreenCuidados() {
  document.getElementById('screen3').style.display = 'none';
  document.getElementById('screenDirectorio').style.display = 'none';
  document.getElementById('screenAlimentacion').style.display = 'none';
  document.getElementById('screenCuidados').style.display = 'block';
  closeMenu();
}

function toShowScreenDirectorio() {
  document.getElementById('screen3').style.display = 'none';
  document.getElementById('screenAlimentacion').style.display = 'none';
  document.getElementById('screenCuidados').style.display = 'none';
  document.getElementById('screenDirectorio').style.display = 'block';
  closeMenu();
}

function toShowScreenAdopciones() {
  document.getElementById('screen3').style.display = 'none';
  document.getElementById('screenAlimentacion').style.display = 'none';
  document.getElementById('screenCuidados').style.display = 'none';
  document.getElementById('screenDirectorio').style.display = 'none';
  document.getElementById('screenAdopciones').style.display = 'block';
  closeMenu();
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
      document.getElementById('menuNav').style.visibility = 'hidden';
      document.getElementById('screen3').style.display = 'none';
      document.getElementById('screenDirectorio').style.display = 'none';
      document.getElementById('screenAlimentacion').style.display = 'none';
      document.getElementById('screenCuidados').style.display = 'none';
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
  if (message === '') {
    alert('Por favor ingrese un mensaje válido');
  } else {
    db.collection('users').add({
      textMessage: message
   
    })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }
}

// Leer documentos (read)
let container = document.getElementById('messageContainer');
db.collection('users').onSnapshot((querySnapshot) => {
  container.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().textMessage}`);
    container.innerHTML += `
      <div class="col-12" id="divContainer">
      <p>${doc.data().textMessage}</p>
      <i type="button" class="far fa-edit 2x" onclick="edit('${doc.id}','${doc.data().textMessage}')"> </i>
      <i type="button" class="fas fa-trash-alt 2x" onclick="deletePost('${doc.id}')"></i>
      </div>
      <i class="fas fa-paw" id='pawIcon' onclick ='likeCounter()'></i>
      `;
  });
});

// Borrar documentos (delete)
function deletePost(id)
{
  let removeMessage = confirm('¿Quiere eliminar la publicación?');
  if (removeMessage ==true) {
    db.collection('users').doc(id).delete().then(function()
    {
      console.log('Document successfully deleted!');
    }).catch(function(error)
    {
      console.error('Error removing document: ', error);
    });
    }
}

// Editar documentos (update)
function edit(id, message) {
  document.getElementById('messageArea').value = message;
  let btnPost = document.getElementById('btnPost');
  btnPost.innerHTML = 'Guardar cambios';

  btnPost.onclick = function() {
    let editPost = db.collection('users').doc(id);

    let message = document.getElementById('messageArea').value;

    return editPost.update(
      {
        textMessage: message
      })
      .then(function() {
        console.log('Document successfully updated!');
        btnPost.innerHTML = 'Publicar';
        btnPost.onclick = userPost;
        document.getElementById('messageArea').value = '';
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
} 
