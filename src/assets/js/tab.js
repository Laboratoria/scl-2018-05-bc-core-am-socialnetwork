// mensajes
firebase.database().ref('messages')
  .limitToLast(20) // Filtro para no obtener todos los mensajes
  .once('value')
  .then((messages) => {
    console.log('Mensajes > ' + JSON.stringify(messages));
  })
  .catch(() => {

  });

// Acá comenzamos a escuchar por nuevos mensajes usando el evento
// on child_added
firebase.database().ref('messages')
  .limitToLast(100)
  .on('child_added', (newMessage) => {
    messageContainer.innerHTML = `
        <div class="card w-75">
            <div class="card-body">
                <div class="col-1 avatar">
                    <img class="img-fluid img-rounded" src=${firebase.auth().currentUser.photoURL}/>
                </div>
                <h6 class="card-title">Nombre : ${newMessage.val().creatorName}</h6>
                <p class="card-text">${newMessage.val().text}</p>
            </div>
            <div class="card-footer text-muted">
            <i class="fab fa-earlybirds"></i><i class="fas fa-comment"></i><i class="fas fa-edit"></i><i class="fas fa-trash"></i>
            </div>
        </div>
        ` + messageContainer.innerHTML;
  });
// Usaremos una colección para guardar los mensajes, llamada messages
function sendMessage() {
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value;

  // Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  firebase.database().ref(`messages/${newMessageKey}`).set({
    creator: currentUser.uid,
    creatorName: currentUser.displayName,
    text: messageAreaText
  });
}
