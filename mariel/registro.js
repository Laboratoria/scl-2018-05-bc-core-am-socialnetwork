//tomar valores del DOM
const userName = document.getElementById("name_input" );
const errorNombre = document.getElementById("error_nombre");
const userAge = document.getElementById("edad_input");
const email = document.getElementById("email_input").value;
const password = document.getElementById("password_input").value;
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
password.addEventListener('keyup', () =>{
  if(password.value.length < 6) {
    errorMsg.innerHTML = "La contraseña debe tener minimo 6 caracteres";
  } else if(password.value.length >= 6) {
    errorMsg.innerHTML = " ";
  }
})

//validar que sea la misma contraseña 
confirmPassword.addEventListener('keyup', () => {
  if(password.value === confirmPassword.value){
    errorConfirmPassword.innerHTML = " ";
  } else {
    errorConfirmPassword.innerHTML = "Porfavor revisa la contraseña debe coincidir";
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
      window.localStorage.setItem('password', JSON.stringify(password));
      window.localStorage.setItem('email', JSON.stringify(email));
      window.localStorage.setItem('nombre', JSON.stringify(userName));
      window.localStorage.setItem('edad', JSON.stringify(userAge));
    }
  }


			
//llevarme a la siguiente ventana con el boton 
createAcountBtn.addEventListener('click', () => { 
    
    //crear esta cuenta en firebase (con el boton crear cuenta)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      //cambiar de seccion
    const hideSection = document.getElementById('register_section');
    hideSection.style.display = "none";
    }) 
    .catch(() => {
      console.log(getReason());
    })
})