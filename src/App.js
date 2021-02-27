import React from 'react';
import NavBar from './components/NavBar';
import Authentication from './components/Authentication';
import db from './firebase/FirebaseConfig';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        {/* <NavBar/> */}
        <Authentication/>      
      </div>
    );
  }
}

export default App;
