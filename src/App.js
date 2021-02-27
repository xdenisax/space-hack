import React from 'react';
import NavBar from './components/NavBar/NavBar';
import Authentication from './components/Authentication';
import ProfileForm from './components/ProfileForm/ProfileForm'
import db from './firebase/FirebaseConfig';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <NavBar/>
        {/* <Authentication/>      */}
        <ProfileForm/> 
      </div>
    );
  }
}

export default App;
