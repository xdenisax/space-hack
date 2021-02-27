import React from 'react';
import NavBar from './components/NavBar';
import db from './firebase/FirebaseConfig';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <NavBar/>
      </div>
    );
  }
}

export default App;
