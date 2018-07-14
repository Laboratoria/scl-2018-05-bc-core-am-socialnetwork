/* 
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
*/
// Cambiar foto de perfil
function updatePhoto() {
  let user = firebase.auth().currentUser;
  user.updateProfile({
    photoURL: updatePic.value
  }).then(function() {
    console.log('Cambios guardados');
    saveChanges.innerHTML = 'Cambios guardados';
    profilePic.src = user.photoURL;
  }).catch(function(error) {
    console.log('Ha ocurrido un error');
  });
};

// Mostrar información del usuario
function showInfo() {
  let currentUser;
  let profilePicture;
  let mail = firebase.auth().currentUser.email;
  if (firebase.auth().currentUser.displayName !== 'null') {
    currentUser = firebase.auth().currentUser.displayName;
    console.log(currentUser);
    profilePic.src = firebase.auth().currentUser.photoURL;
    console.log(profilePicture);
  } else {
    profilePicture = profilePic.src;
    console.log(profilePicture);
  }
  userName.value = currentUser;
  userEmail.value = mail;
}

