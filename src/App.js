import React from 'react';
import db from './firebase/FirebaseConfig';

class App extends React.Component {

  render() {
    db.collection("cities").doc("LA").set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
