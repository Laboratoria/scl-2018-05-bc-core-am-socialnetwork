//tomar valores del DOM
const userName = document.getElementById("name_input" );
const userAge = document.getElementById("edad_input");
const email = document.getElementById("email_input");
const password = document.getElementById("password_input");
const errorMsg = document.getElementById("error_password")
const confirmPassword = document.getElementById("confirm_password");
const errorConfirmPassword = document.getElementById("error_confirm_password");
const rememberMe = document.getElementById("rememeber_check");
const agree = document.getElementById("terms_check");
const createAcountBtn = document.getElementById("create_acount_button");
//validar que el email sea valido 


//validar que la contraseña tenga minimo 8 caracteres

function validarPassword() {
  if(password.length >= 8) {
    return true;
  } else {
    errorMsg.innerHTML("La contraseña debe tener minimo 8 caracteres");
  }
}

//validar que sea la misma contraseña 

function  validarConfirmPass() {
  if(password.value === confirmPassword.value){
    return true;
  } else {
    errorConfirmPassword.innerHTML("Porfavor revisa la contraseña debe coincidir");
  }
}

//guardar estos valores en un usuario con local storage (con el boton recordar)
rememberMe.addEventListener('click', () =>{
  window.localStorage.setItem('password', JSON.stringify(password));
  window.localStorage.setItem('email', JSON.stringify(email));
  window.localStorage.setItem('nombre', JSON.stringify(userName));
  window.localStorage.setItem('edad', JSON.stringify(userAge));
})

//crear esta cuenta en firebase (con el boton crear cuenta)
function createUser(){ 
  firebase.auth().createUserWithEmailAndPassword(email, password);
}
			
//llevarme a la siguiente ventana con el boton 
createAcountBtn.addEventListener('click', () => {
    //cambiar de seccion
    const hideSection = document.getElementById('register_section');
    hideSection.style.display = "none"; 
})