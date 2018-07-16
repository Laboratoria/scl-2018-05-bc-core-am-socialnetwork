
  firebase.database().ref('chat')
  .limitToLast(20)
  .once('value')
  .then((messages)=>{
    console.log("mensajes" +JSON.stringidy(messages));
})
.catch(()=>{
});

firebase.database().ref('chat')
  .limitToLast(20)
  .on('child_added', (newMessage) => {
    messagesContainer.innerHTML += `
    <div class="message-data">
    <span class="message-data-name">${newMessage.val().creatorName}</span>
    <span class="message-data-time">${newMessage.val().time}</span>
    </div>
    <div class="message my-message">${newMessage.val().text}</div>
  `;
  });

function sendMessage() {
  const currentUser = firebase.auth().currentUser; 
  const messageAreaText = messageInput.value;
  const newMessageKey = firebase.database().ref().child('chat').push().key;

  firebase.database().ref(`chat/${newMessageKey}`).set({
    creator : currentUser.uid,
    creatorName : currentUser.displayName,
    text : messageAreaText,
    time : Date.now()
  });
  messageInput.value = "";
};

