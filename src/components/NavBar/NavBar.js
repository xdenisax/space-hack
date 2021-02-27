import React from 'react';
import './NavBar.css';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import db from './firebase/FirebaseConfig';

class NavBar extends React.Component {
  render() {
    return (
        <div className="nav-bar">
            <nav> 
                <div>Logo</div>
                <ul className="nav-elements">
                    <li>Planificare</li>
                    <li>Profil</li>
                    <IconButton 
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
