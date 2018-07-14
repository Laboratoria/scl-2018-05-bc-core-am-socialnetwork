// Manejo del estilo del botón que esconde/muestra la barra de navegación
$(document).ready(function() {
  $('.animated-icon1,.animated-icon3,.animated-icon4').click(function(event) {
    $(this).toggleClass('open');
  });
});

/*
// Funcionalidad del side Menú
function toggleMenu() { 
  if (sideMenu.className.indexOf('closedMenu') >= 0) { 
    openMenu(); 
  } else {
    closeMenu(); 
  }
}

function openMenu() {
  sidebar.classList.remove('closedMenu'); 
  sidebar.classList.add('openMenu');
}

function closeMenu() {
  sidebar.classList.add('closedMenu');
  sidebar.classList.remove('openMenu');
}
*/

// Cambio de páginas
function toProfilePage() {
  wall.classList.add('d-none');
  profile.classList.remove('d-none');
  pageTitle.innerHTML = 'PERFIL';
}

function toWallPage() {
  profile.classList.add('d-none');
  wall.classList.remove('d-none');
  pageTitle.innerHTML = 'TABLERO';
}

// Foto de perfil 
function changePhoto() {
  photoChange.classList.remove('d-none');
  saveChanges.classList.remove('d-none');
}