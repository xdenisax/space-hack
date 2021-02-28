import React from 'react';
import Button from '@material-ui/core/Button';
import { firebase } from '../../firebase/FirebaseConfig'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import './Authentication.css'
import { Snackbar } from '@material-ui/core';

class Authentication extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            snack:{
                message: "",
                open:false
            }
        }
    }

    centeredStyle = {
        "position":"absolute",
        "top":"50%",
        "left":"50%",
        "transform":"translate(-50%,-50%)"
    };

    logInUser() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            this.setState({
                snack:{
                    message: "Success",
                    open: true,
                }
            })
        }).catch((error) => {
            this.setState({
                snack:{
                    message: error.message,
                    open: true,
                }
            })
        });
    };

    handleClose = () =>{
        this.setState({
            snack:{
                message: "error.message",
                open: false,
            }
        })
    }

    render() {
      return (
        <div>   
            <h1 className = "logo">Quity.</h1>
            <div style={this.centeredStyle} className="Authentication">
                <h1>Nu trebuie sa fii batran ca sa iesi la pensie! </h1>
                    <Button variant="contained" 
                        style={{"textAlign":"center"}} 
                        color="primary" 
                        onClick={()=>this.logInUser()}
                        endIcon={<ArrowForwardIcon/>}
                        >Autentificare</Button>
            </div>
            <Snackbar anchorOrigin={ {vertical: "bottom", horizontal: "center" }}
                open={this.state.open}
                message={this.state.message}
                onClose={this.handleClose}>
            </Snackbar>
        </div>
      );
    }
  }
  
  export default Authentication;