import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../NavBar/NavBar'
import ProfileForm from '../ProfileForm/ProfileForm';
import Profile from '../Profile/Profile';

export default class MainScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isProfile: false,
        }
    }

    handleNavChange = (isProfile) => {
        this.setState({isProfile});
    }

    render() {
        return (
           <div>
               <NavBar handleNavChange={this.handleNavChange}/>
               {this.props.isFirstLogin 
               ? (<ProfileForm user ={this.props.user} setFirstLogin={this.props.setFirstLogin}/>) 
               : this.state.isProfile 
                    ? <Profile user ={this.props.user}/>
                    : (<Dashboard user ={this.props.user}/>)}
           </div>
        )
    }
}