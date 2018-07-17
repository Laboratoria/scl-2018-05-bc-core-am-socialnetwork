// Daniela (Login)
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //Si estamos logueados
      loggedOut.style.display = "none";
      loggedIn.style.display = "block";
      console.log("User > " + JSON.stringify(user));
    } else {
      //No estamos logueados
      loggedOut.style.display = "block";
      loggedIn.style.display = "none";
    }
  });

  firebase.database().ref('messages')
    .limitToLast(2) // Filtro para no obtener todos los mensajes
    .once('value')
    .then((messages) => {
      console.log("Posts" + JSON.stringify(messages));
    })
    .catch(() => {

    });

    const entrar = document.getElementById('btn-entrar');

    entrar.addEventListener('click', () => {
      landingPage.style.display= "none";
      loginPage.style.display= "block";
    }


    
//===============================LOGIN========================================
//Aquí va la función de iniciar sesión con email
function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      console.log("Usuario con login exitoso");
    })
    .catch((error) => {
      console.log("Error de firebase" + error.code);
      console.log("Error de firebase, mensaje" + error.message);
    });
}
//Aquí va la función de cerrar sesión
function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log("Vuelve pronto, te extrañaremos");
    })
    .catch();
}
//Aquí va la función de iniciar sesión con Facebook
function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope("user_birthday"); tienen que pedirle permiso a facebook
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      console.log("Login con facebook");
    })
    .catch((error) => {
      console.log("Error de firebase" + error.code);
      console.log("Error de firebase, mensaje" + error.message);
    });
}
//funcion login google
function loginGoogle() {

  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
  firebase.auth().getRedirectResult().then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    //let token = result.credential.accessToken;
    // The signed-in user info.
    //let user = result.user;
  }).catch(function (error) {
    console.log('entrar' + error);
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;

  });
}
//========================================HOME========================================
// Homepage
const btnPost = document.getElementById('btnSendPost');
btnPost.addEventListener('click', () => {
  //Limpiar textarea
  document.getElementById('postArea').value = ' ';
  //Acá se guarda el post ingresado
  let post = document.getElementById('postArea').value;
  //validación de textarea con contenido
  if (post.length === 0 || post === null) {
    return alert('Ingrese un comentario');
  };

  //Acá se imprimirán los post ingresados 
  const postsContainer = document.getElementById('addPostUser');
  //Se crea un div contenedor para nuevos elementos
  const newPosts = document.createElement('div');
  //crear ícono de comentario
  const commentIcon = document.createElement('i');
  commentIcon.classList.add('far', 'fa-comment-alt');
  //crear ícono de me gusta
  const likeIcon = document.createElement('i');
  likeIcon.classList.add('fas', 'fa-heart', 'heart');
  //crear ícono de agregar a amigos
  const addUserIcon = document.createElement('i');
  addUserIcon.classList.add('fas', 'fa-user-plus');

  //Parentesco de los nodos creados
  let textNewPosts = document.createTextNode(post);
  const containerElements = document.createElement('div');
  containerElements.appendChild(textNewPosts);
  newPosts.appendChild(commentIcon);
  newPosts.appendChild(likeIcon);
  newPosts.appendChild(addUserIcon);
  newPosts.appendChild(containerElements);
  postsContainer.appendChild(newPosts);

  //Función para eliminar post
  //function removePost() { 
  //  .parentNode.removeChild();
  //}

  //al ingresar post aparecerán estos elementos
});
//funcion de enviar post
function sendMessage() {
  const currentUser = firebase.auth().currentUser;
  const PostAreaText = postArea.value;

  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    text: PostAreaText
  });
}

/*

$('#loginGoogleBtn').click(function(){
  firebase.auth()
  .signInWhitPopup(provider)
  .then(function(result) {
    console.log(result.user);
    guardaDatos(result.user);
    $('#logInPage').hide();
    $('#root').append("<img src'"+result.user.photoURL+"' />") //agregando etiqueta imagen al div root en el muro
  });

// Guardando datos automáticamente

function guardaDatos(user) {
  const usuario = {
    uid: user.uid,
    nombre: user.displayName,
    email: user.email,
    foto: user.photoURL
  }
  firebase.datebase().ref("perfil")
  .push(usuario)
}
*/


// Mariel (Registro)
//tomar valores del DOM
const userName = document.getElementById("name_input" );
const errorNombre = document.getElementById("error_nombre");
const userAge = document.getElementById("edad_input");
const email = document.getElementById("email");
const password = document.getElementById("password"); 
const password2 = document.getElementById("password");
const errorMsg = document.getElementById("error_password")
const confirmPassword = document.getElementById("confirm_password");
const errorConfirmPassword = document.getElementById("error_confirm_password");
const rememberMe = document.getElementById("rememeber_check");
const agree = document.getElementById("terms_check");
const createAcountBtn = document.getElementById("create_acount_button");

//validar que el nombre sean solo letras 
userName.addEventListener('keyup', () =>{
  var letras=/^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
  if(letras.test(userName.value)) {
    errorNombre.innerHTML = " ";
  } else {
    errorNombre.innerHTML = "El nombre debe contener solo letras";
  }
})

//validar que la contraseña tenga minimo 6 caracteres
password2.addEventListener('keyup', () =>{
  if(password2.value.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener minimo 6 caracteres";
  } else if(password2.value.length >= 6) {
    errorMsg.innerHTML = " ";
  }
})

//validar que sea la misma contraseña 
confirmPassword.addEventListener('keyup', () => {
  if(password.value === confirmPassword.value){
    errorConfirmPassword.innerHTML = " ";
  } else {
    errorConfirmPassword.innerHTML = "Por favor revisa, la contraseña debe coincidir";
  }
})

//validar que acepte los terminos y condiciones 
agree.addEventListener('change', validateAgree, false); 
function validateAgree(){
  let checked = agree.checked;
  if(checked){
    createAcountBtn.disabled = false;
  } else {
    createAcountBtn.disabled = true;
  }
}

//guardar estos valores en un usuario con local storage (con el boton recordar)
rememberMe.addEventListener('change', saveLocalUser, false);  

  function saveLocalUser(){
    let checked = rememberMe.checked; 
    if(checked){
      window.localStorage.setItem('password', JSON.stringify(password.value));
      window.localStorage.setItem('email', JSON.stringify(email.value));
      window.localStorage.setItem('nombre', JSON.stringify(userName.value));
      window.localStorage.setItem('edad', JSON.stringify(userAge.value));
    }
  }
			
//llevarme a la siguiente ventana con el boton 
createAcountBtn.addEventListener('click', () => { 
    const emailVal = email.value; 
    const passwordVal = password.value; 
    //crear esta cuenta en firebase (con el boton crear cuenta)
    firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal)
    .then(() => {
      //cambiar de seccion
    const hideSection = document.getElementById('registerPage');
    hideSection.style.display = "none";
    
    const showSection = document.getElementById('homePage');
    showSectio.style.display = "block";

    }) 
    .catch((error) => {
      console.log('fallo el registro', error);
    })
})

// Homepage (barbara)

function postUser() {
  const currentUser = firebase.auth().currentUser;
  const postAreaText = postArea.value;

  // Para obtener una nueva llave en la colección posts
  const newPostKey = firebase.database().ref().child('posts').push().key;

  firebase.database().ref(`posts/${newPostKey}`).set({ // ref(ruta donde guardamos el mensaje), se está creando un nuevo objeto
      creator : currentUser.uid,
      creatorName : currentUser.displayName,
      text : postAreaText
});
}

 