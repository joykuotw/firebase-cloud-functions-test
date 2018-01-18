# firebase-cloud-functions-test
An experiment to interact firebase with cloud functions.

First install the Firebase CLI via npm:

```
$ npm install -g firebase-tools
```

Log in to Firebase via the browser and authenticate the Firebase tool:

```
$ firebase login
```

Run this command to initialize cloud functions for Firebase:

```
$ firebase init functions
```

Note that the chosen project is set as default in `.firebaserc` file, which is the project id.

Install dependencies to the project:

```
$ cd functions
$ npm install
```

Now you can deploy the functions:

```
$ firebase deploy --only functions
```

Then you can type this in a browser to see the results on Firebase database:

```
https://us-central1-gcp-training-144309.cloudfunctions.net/ping?text=Hello
```

This will send a Hello text request to Firebase and push to database under the defined path `/pingpong/<unique-push-id>/ping`. After the ping function is executed, it will redirect the browser to Firebase console's database location where the stored string is, and you will see an identical sibling under the defined path `/pingpong/<unique-push-id>/pong`.

![Firebase realtime database](/assets/firebase-realtime-database.png)

You can also test it by sending request using cURL in terminal:

```
curl -X GET --header 'Accept: text/html' https://us-central1-gcp-training-144309.cloudfunctions.net/ping?text=Hello
```

#### Reference
- [firebase-functions-ping-pong](https://github.com/sebastianovide/pocs/tree/master/firebase-functions-ping-pong)
- [Get Started: Write and Deploy Your First Functions](https://firebase.google.com/docs/functions/get-started)