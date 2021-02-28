import React from 'react';

import Authentication from './components/Authentication/Authentication';

import { auth, db } from './firebase/FirebaseConfig'
import './App.css';
import MainScreen from './components/MainScreen/MainScreen';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isFirstLogin: false
    };
  }

  setFirstLogin = (bool) => {
    this.setState({isFirstLogin: bool});
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
        {this.state.user === null ? (<Authentication  />) : (<MainScreen isFirstLogin ={this.state.isFirstLogin} user ={this.state.user} setFirstLogin={this.setFirstLogin}/>)}
     </div>
    );
  }
}

export default App;
