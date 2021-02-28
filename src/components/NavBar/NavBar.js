import React from 'react';
import './NavBar.css';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { firebase }from '../../firebase/FirebaseConfig';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
    }

  handleLogOut() {
    firebase.auth().signOut().then((response) => {
       console.log(response)
      }).catch((error) => {
        // An error happened.
      });
  }  

  render() {
    return (
        <div className="nav-bar">
            <nav> 
                <div>
                    <h2 className="nav-logo">Quity.</h2>
                </div>
                <ul className="nav-elements">
                    <li onClick={() => this.props.handleNavChange(false)}>Planificare</li>
                    <li onClick={() => this.props.handleNavChange(true)}>Profil</li>
                    <IconButton 
                        onClick ={()=> this.handleLogOut()}
                        style={{"padding":"0", "color":"white"}}>
                            <ExitToAppIcon/>
                    </IconButton>
                </ul>
            </nav>
        </div>
    );
  }
}

export default NavBar;
