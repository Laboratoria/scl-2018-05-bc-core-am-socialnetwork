const signUp = document.getElementById('btn_signUp'); // botón o enlace "Regístrate"
const createAccount = document.getElementById('btn_registrar'); // botón "Registrar" en pantalla de registro
const ingresar = document.getElementById('btn_login'); // botón para ingresar en pantalla de login

ingresar.addEventListener('click', () => {
  console.log('botón para login funciona');
  //document.getElementById('screen1').style.display = 'none';
});
  
signUp.addEventListener('click', () => {
  document.getElementById('screen1').style.display = 'none';
  document.getElementById('screen2').style.display = 'block';
});

createAccount.addEventListener('click', () => {
  //document.getElementById('screen2').style.display = 'none';
  console.log('evento click de botón registrar funcionando');
});