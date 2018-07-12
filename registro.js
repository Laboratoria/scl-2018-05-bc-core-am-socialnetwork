//tomar valores de los inputs
const userName = document.getElementById("name_input" );
const userAge = document.getElementById("edad_input");
const email = document.getElementById("email_input");
const password = document.getElementById("password_input");
const errorMsg = document.getElementById("error_password")
const confirmPassword = document.getElementById("confirm_password");
const errorConfirmPassword = document.getElementById("error_confirm_password");
//validar que el email sea valido 


//validar que la contraseña tenga minimo 8 caracteres

validarPassword((password) => {
  if(password.length >= 8) {
    return true;
  } else {
    errorMsg.innerHTML("La contraseña debe tener minimo 8 caracteres")
  }
});

//validar que sea la misma contraseña 

validarConfirmPass(() => {
  if(password.value === confirmPassword.value){
    return true;
  } else {
    errorConfirmPassword.innerHTML("Porfavor revisa la contraseña debe coincidir");
  }
})

//guardar estos valores en un usuario con local storage (con el boton recordar)

//crear esta cuenta en firebase (con el boton crear cuenta)

//llevarme a la siguiente ventana con el boton 