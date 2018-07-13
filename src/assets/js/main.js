// Manejo del estilo del botón que esconde/muestra la barra de navegación
$(document).ready(function() {
  $('.animated-icon1,.animated-icon3,.animated-icon4').click(function() {
    $(this).toggleClass('open');
  });
});

// Cambiar foto de perfil
$(document).ready(function() {
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(event) {
        $('.profile-pic').attr('src', event.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };

  $('.file-upload').on('change', function() {
    readURL(this);
  });

  $('.upload-button').on('click', function() {
    $('.file-upload').click();
  });
});