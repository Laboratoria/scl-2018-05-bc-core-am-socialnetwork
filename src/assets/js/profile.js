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

updatePic.addEventListener('change', function(event) {
  let storageRef = firebase.storage().ref().child(firebase.auth().currentUser.Nb.email + '/profilePic.jpeg');
  let firstFile = event.target.files[0]; // upload the first file only
  let uploadTask = storageRef.put(firstFile);
  console.log(uploadTask);
  saveChanges.classList.remove('d-none');
});

function updatePhoto() {
  firebase.storage().ref().child(firebase.auth().currentUser.Nb.email + '/profilePic.jpeg').getDownloadURL().then(function(url) {
    firebase.auth().currentUser.updateProfile({
      photoURL: url
    }).then(function() {
      console.log('Cambios guardados');
      profilePic.src = url;
      saveChanges.classList.add('d-none');
      updatePic.classList.add('d-none');
    }).catch(function(error) {
      console.log('Ha ocurrido un error' + error);
    });
  });
};

// Mostrar información del usuario
function showInfo() {
  if (firebase.auth().currentUser.displayName !== 'null') {
    userName.value = firebase.auth().currentUser.displayName;
    userEmail.value = firebase.auth().currentUser.email;
    profilePic.src = firebase.auth().currentUser.photoURL;
  } else {
    userName.value = 'Indefinido';
    userEmail.value = firebase.auth().currentUser.email;
    profilePic.src = firebase.auth().currentUser.photoURL;
  }
};

