
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// muro de rrss 
const postbtn = document.getElementById("btn-post");

postbtn.addEventListener('click', postUser())

function postUser() {
  const currentUser = firebase.auth().currentUser;
  const postArea = document.getElementById("postArea");
  const postAreaText = postArea.value;
  currentUser.collection('post').add({
    usuario:  currentUser.uid,
    texto : postAreaText,
    fecha : new Date 
  })
  .then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
  }
