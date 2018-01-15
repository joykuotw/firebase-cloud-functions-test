// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /pings/:pushId/ping
exports.ping = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const ping = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/pingpong').push({ping: ping}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

// Listens for new pings added to /pings/:pushId/ping and return the value of ping to /pongs/pong
exports.pong = functions.database.ref('/pingpong/{pushId}/ping')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const ping = event.data.val();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return event.data.ref.parent.child('pong').set(ping);
    });