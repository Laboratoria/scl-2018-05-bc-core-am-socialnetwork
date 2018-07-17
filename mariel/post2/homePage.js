// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  db.settings(settings);
// Daniela (Login)
window.onload = () => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //Si estamos logueados
      loggedOut.style.display = "none";
      loggedIn.style.display = "block";
      homePage.style.display = "block";
      const postbtn = document.getElementById("btn-post");
      const postArea = document.getElementById("postArea");
      postbtn.addEventListener('click', () =>{ 
        const currentUser = firebase.auth().currentUser;
        const postAreaText = postArea.value;
        db.collection('usersPost').add({
          usuario:  currentUser.uid,
          texto : postAreaText, 
        })
        let showPostArea = document.getElementById("postUserContainer");
        db.collection('usersPost').get()
        .then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().texto);
                showPostArea += `<p> ${doc.id} + ${doc.data().usuario} + ${doc.data().texto} </p>`;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
          })
       
      //console.log("User > " + JSON.stringify(user));
    } else {
      //No estamos logueados
      loggedOut.style.display = "block";
      loggedIn.style.display = "none";
    
    }})
    
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
      console.log("Error de firebase > " + error.code);
      console.log("Error de firebase, mensaje > " + error.message);
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

/*
$('#loginGoogleBtn').click(function(){
  firebase.auth()
  .signInWhitPopup(provider)
  .then(function(result) {
    console.log(result.user);
    $('#logInPage').hide();
    $('#root').append("<img src'"+result.user.photoURL+"' />") //agregando etiqueta imagen al div root en el muro
});
m
*/

// Mariel (Registro)
//tomar valores del DOM
const userName = document.getElementById("name_input" );
const errorNombre = document.getElementById("error_nombre");
const userAge = document.getElementById("edad_input");
const email = document.getElementById("email2");
const password = document.getElementById("password2"); 
const password2 = document.getElementById("password2");
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


}

