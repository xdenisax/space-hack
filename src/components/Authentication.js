import React from 'react';
import Button from '@material-ui/core/Button';
import { firebase } from '../firebase/FirebaseConfig'

class Authentication extends React.Component {

    constructor(props){
        super(props);
    }

    logInUser(){
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {x.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    };

    render() {
      return (
        <div className="Authentication">
            <Button variant="contained" color="primary" onClick={this.logInUser}>Press me</Button>
        </div>
      );
    }
  }
  
  export default Authentication;