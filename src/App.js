import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Authentication from './components/Authentication';
import ProfileForm from './components/ProfileForm/ProfileForm'
import db from './firebase/FirebaseConfig';
import { auth } from './firebase/FirebaseConfig'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user:null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({user})
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user 
        ? (<> 
            <NavBar user={this.state.user} />
            <ProfileForm/> 
          </>) 
        : <Authentication userLoggedIn = {this.userLoggedIn}/>}
     </div>
    );
  }
}

export default App;
