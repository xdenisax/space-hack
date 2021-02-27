import React from 'react';
import Dashboard from '../Dashboard/Dashboard';
import NavBar from '../NavBar/NavBar'
import ProfileForm from '../ProfileForm/ProfileForm'

export default class MainScreen extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
           <div>
               <NavBar/>
               {this.props.isFirstLogin ? (<ProfileForm/>) : (<Dashboard user ={this.props.user}/>)}
           </div>
        )
    }
}