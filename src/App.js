import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Authentication from './components/Authentication/Authentication';
import ProfileForm from './components/ProfileForm/ProfileForm'
import { auth, db } from './firebase/FirebaseConfig'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isFirstLogin: false
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user !== null){
        const usersRef = db.collection('users').doc(user.uid);
        usersRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
              usersRef.onSnapshot((doc) => {
                this.setState({user: user, isFirstLogin: false})
              });
            } else {
              usersRef.set({
                displayName: user.displayName,
                email: user.email,
              })
              this.setState({user: user, isFirstLogin: true})
            }
        });
      } else {
        this.setState({user: null, isFirstLogin: false})
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user 
        ? (<> 
            <NavBar user={this.state.user} />
            <ProfileForm isFirstLogin={this.state.isFirstLogin}/> 
          </>) 
        : <Authentication userLoggedIn = {this.userLoggedIn}/> }
     </div>
    );
  }
}

export default App;
