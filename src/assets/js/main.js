const signUp = document.getElementById('btn_signUp'); // botón o enlace "Regístrate"
const createAccount = document.getElementById('btn_registrar'); // botón "Registrar" en pantalla de registro
const ingresar = document.getElementById('btn_login'); // botón para ingresar en pantalla de login
  
signUp.addEventListener('click', () => {
  document.getElementById('screen1').style.display = 'none';
  document.getElementById('screen2').style.display = 'block';
});
