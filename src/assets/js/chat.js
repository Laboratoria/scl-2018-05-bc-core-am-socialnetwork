window.onload = () => {
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
    const liMessage = document.createElement('li');
    let textMessage = document.createTextNode(newMessage.val().text)
    const textMessageContainer = document.createElement('div');
      textMessageContainer.appendChild(textMessage);
      liMessage.appendChild(textMessageContainer);
      messagesContainer.appendChild(liMessage);
    let avatarMessage = document.createTextNode(newMessage.val().creatorName);
    const avatarCont = document.createElement('div');
      avatarCont.appendChild(avatarMessage);
      liMessage.appendChild(avatarCont);
      messagesContainer.appendChild(liMessage);

    textMessage.className += 'text';
    liMessage.className+= "message";
    textMessageContainer .className+= 'text_wrapper';
    avatarCont.className += 'avatar';
  });
}


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