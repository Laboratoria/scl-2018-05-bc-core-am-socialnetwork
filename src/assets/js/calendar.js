var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

// This function will trigger when there is a login event
firebase.auth().onAuthStateChanged(function(user) {
  console.log(user)
  // Make sure there is a valid user object
  if (user) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/api.js";
    // Once the Google API Client is loaded, you can run your code
    script.onload = function(e) {
      // Initialize the Google API Client with the config object
      gapi.client
        .init({
          apiKey: config.apiKey,
          clientId: config.clientID,
          discoveryDocs: config.discoveryDocs,
          scope: config.scopes.join(" ")
        })
        // Loading is finished, so start the app
        .then(function() {
          // Make sure the Google API Client is properly signed in
          if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            startApp(user);
          } else {
            firebase.auth().signOut(); // Something went wrong, sign out
          }
        });
    };
    // Add to the document
    document.getElementsByTagName("head")[0].appendChild(script);
  }
});

function startApp(user) {
  console.log(user);
  
  // Make sure to refresh the Auth Token in case it expires!
  firebase.auth().currentUser.getToken()
  .then(function(){
   return gapi.client.calendar.events
    .list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime"
    })
  })
  .then(function(response) {
    console.log(response);
  });
}