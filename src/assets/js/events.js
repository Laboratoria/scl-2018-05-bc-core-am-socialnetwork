// Manejo del estilo del botón que esconde/muestra la barra de navegación
$(document).ready(function() {
  $('.animated-icon1,.animated-icon3,.animated-icon4').click(function() {
    $(this).toggleClass('open');
  });
});

// Cambio de páginas
function toProfilePage() {
  profile.classList.remove('d-none');
}
