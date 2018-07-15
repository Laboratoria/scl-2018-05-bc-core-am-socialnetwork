/*
// Manejo del estilo del botón que esconde/muestra la barra de navegación
$(document).ready(function() {
  $('.animated-icon3').click(function(event) {
    $(this).toggleClass('open');
  });
});

*/

// Cambio de páginas
function toWallPage() {
  navbarSupportedContent1.classList.remove('show');
  activities.classList.add('d-none');
  calendar.classList.add('d-none');
  council.classList.add('d-none');
  chat.classList.add('d-none');
  profile.classList.add('d-none');
  wall.classList.remove('d-none');
  pageTitle.innerHTML = 'TABLERO';
}

function toActivitiesPage() {
  navbarSupportedContent1.classList.remove('show');
  wall.classList.add('d-none');
  calendar.classList.add('d-none');
  council.classList.add('d-none');
  chat.classList.add('d-none');
  profile.classList.add('d-none');
  activities.classList.remove('d-none');
  pageTitle.innerHTML = 'ACTIVIDADES';
}

function toCalendarPage() {
  navbarSupportedContent1.classList.remove('show');
  wall.classList.add('d-none');
  activities.classList.add('d-none');
  council.classList.add('d-none');
  chat.classList.add('d-none');
  profile.classList.add('d-none');
  calendar.classList.remove('d-none');
  pageTitle.innerHTML = 'CALENDARIO';
}

function toCouncilPage() {
  navbarSupportedContent1.classList.remove('show');
  wall.classList.add('d-none');
  activities.classList.add('d-none');
  calendar.classList.add('d-none');
  chat.classList.add('d-none');
  profile.classList.add('d-none');
  council.classList.remove('d-none');
  pageTitle.innerHTML = 'CONSEJO DE CURSO';
}

function toChatPage() {
  navbarSupportedContent1.classList.remove('show');
  wall.classList.add('d-none');
  activities.classList.add('d-none');
  calendar.classList.add('d-none');
  council.classList.add('d-none');
  profile.classList.add('d-none');
  chat.classList.remove('d-none');
  pageTitle.innerHTML = 'CHAT';
}

function toProfilePage() {
  navbarSupportedContent1.classList.remove('show');
  wall.classList.add('d-none');
  activities.classList.add('d-none');
  calendar.classList.add('d-none');
  council.classList.add('d-none');
  chat.classList.add('d-none');
  profile.classList.remove('d-none');
  pageTitle.innerHTML = 'PERFIL';
}

// Foto de perfil 
cam.addEventListener('click', () => {
  photoChange.classList.remove('d-none');
});