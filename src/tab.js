//config de firebase
var config = {
  apiKey: "AIzaSyDDPfdzZ-OL-5U1ZFgYEJd40Di3WdR36Wc",
  authDomain: "social-network-d7373.firebaseapp.com",
  databaseURL: "https://social-network-d7373.firebaseio.com",
  projectId: "social-network-d7373",
  storageBucket: "social-network-d7373.appspot.com",
  messagingSenderId: "188592192471"
};
firebase.initializeApp(config);
//mensajes
firebase.database().ref('messages')
        .limitToLast(20) // Filtro para no obtener todos los mensajes
        .once('value')
        .then((messages)=>{
            console.log("Mensajes > "+JSON.stringify(messages));
        })
        .catch(()=>{

        });

//Acá comenzamos a escuchar por nuevos mensajes usando el evento
//on child_added
firebase.database().ref('messages')
    .limitToLast(1)
    .on('child_added', (newMessage)=>{
        messageContainer.innerHTML += `
            <p>Nombre : ${newMessage.val().creatorName}</p>
            <p>${newMessage.val().text}</p>
        `;
    });
// Usaremos una colección para guardar los mensajes, llamada messages
function sendMessage(){
        const currentUser = firebase.auth().currentUser;
        const messageAreaText = messageArea.value;
    
        //Para tener una nueva llave en la colección messages
        const newMessageKey = firebase.database().ref().child('messages').push().key;
    
        firebase.database().ref(`messages/${newMessageKey}`).set({
            creator : currentUser.uid,
            creatorName : currentUser.displayName,
            text : messageAreaText
        });
    }
