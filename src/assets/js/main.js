const signUp = document.getElementById('btn_signUp');
const createAccount = document.getElementById('btn_registrar');
  
signUp.addEventListener('click', () => {
  document.getElementById('screen1').style.display = 'none';
  document.getElementById('screen2').style.display = 'block';
});

createAccount.addEventListener('click', () => {
  document.getElementById('screen2').style.display = 'none';
  console.log('Aquí se abrirá pantalla 3, para publicaciones de usuarios');
});