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

  //Acá comenzamos a escuchar por nuevos mensajes usando el evento
  //on child_added
  firebase.database().ref('messages')
    .limitToLast(1)//cuántos post aparecerán antes de ser borrados
    .on('child_added', (newMessage) => {
      addPostUser.innerHTML += `
            <div>${newMessage.val().creatorName}</div>
            <div>${newMessage.val().text}</div>
        `;
    });
};
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