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

// Mostrar información del usuario
function showInfo() {
  let currentUser;
  let profilePicture;
  let userMail = firebase.auth().currentUser.email;
  if (firebase.auth().currentUser.displayName !== 'null') {
    currentUser = firebase.auth().currentUser.displayName;
    console.log(currentUser);
    profilePicture = firebase.auth().currentUser.photoURL;
    console.log(profilePicture);
  } else {
    profilePicture = profilePicture.src;
    console.log(profilePicture);
  }
  userEmail.innerHTML = `<p>${userMail}</p>`;
}

function updateProfile() {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: 'Jane Q. User',
    photoURL: profilePicture.src
  }).then(function() {
    console.log('Cambio guardados');
    saveChanges.innerHTML = 'Cambios guardados';
  }).catch(function(error) {
    console.log('Ha ocurrido un error');
  });
};