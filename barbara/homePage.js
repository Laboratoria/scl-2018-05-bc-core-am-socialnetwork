window.onload = ()=>{

firebase.database().ref('posts')
.on('child_added',(newPost) => { // suscribiendo a la colección de posts
  postUserContainer.innerHTML +=
      <p>Nombre : ${newPost.val().createName}</p>
      <p>${newPost.val().text}</p>

})

function postUser() {
  const currentUser = firebase.auth().currentUser;
  const postAreaText = postArea.value;

  // Para obtener una nueva llave en la colección messages
  const newPostKey = firebase.database().ref().child('posts').push().key;

  firebase.database().ref(`posts/${newPostKey}`).set({ // ref(ruta donde guardamos el mensaje), se está creando un nuevo objeto
      creator : currentUser.uid,
      creatorName : currentUser.displayName,
      text : postAreaText
});
}

 