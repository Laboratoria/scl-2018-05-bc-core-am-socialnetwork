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
      firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
        profilePicture: firebase.auth().currentUser.photoURL
      });
      profilePic.src = url;
      saveChanges.classList.add('d-none');
      updatePic.classList.add('d-none');
    }).catch(function(error) {
      console.log('Ha ocurrido un error' + error);
    });
  });
};

// Mostrar información del usuario
function showInfo(user) {
  if (user.displayName !== null) {
    userName.value = user.displayName;
    userEmail.value = user.email;
    profilePic.src = user.photoURL;
  } else {
    userEmail.value = 'Indefinido';
    userEmail.value = user.email;
    profilePic.src = user.photoURL;
  };
}

// Cambiar nombre de usuario
saveBtn.addEventListener('click', () => {
  firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
    name: userName.value
  });
  firebase.auth().currentUser.updateProfile({
    displayName: userName.value
  }).then(function() {
    console.log('Cambios guardados');
    $('#userName').attr('readonly', true);
    saveBtn.classList.add('d-none');
  });
});