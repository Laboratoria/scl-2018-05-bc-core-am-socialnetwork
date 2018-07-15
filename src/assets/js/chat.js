
  firebase.database().ref('chat')
  .limitToLast(20)
  .once('value')
  .then((messages)=>{
    console.log("mensajes" +JSON.stringidy(messages));
})
.catch(()=>{
});

firebase.database().ref('chat')
  .limitToLast(2)
  .on('child_added', (newMessage) => {
    messagesContainer.innerHTML += `
    <p class="messageUser">${newMessage.val().creatorName}</p>
    <p class="textMessage">Dice: ${newMessage.val().text}</p>
  `;
  });

function sendMessage() {
  const currentUser = firebase.auth().currentUser; 
  const messageAreaText = messageInput.value;
  const newMessageKey = firebase.database().ref().child('chat').push().key;

  firebase.database().ref(`chat/${newMessageKey}`).set({
    creator : currentUser.uid,
    creatorName : currentUser.displayName,
    text : messageAreaText
  });
};

