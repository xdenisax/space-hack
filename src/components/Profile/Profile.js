import React from 'react';
import { db } from '../../firebase/FirebaseConfig';
import TextField from '@material-ui/core/TextField';
import './Profile.css';

export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}
        }
    }

    componentDidMount() {
        db.collection('users').doc(this.props.user.uid).get().then((doc) => {
            if (doc.exists) {
              this.setState({userInfo: {...doc.data()}});
            }
        });
    }

    getAgeRisk = () => { 
        var ageDifMs = Date.now() - new Date(this.state.userInfo.birthday).getTime();
        var ageDate = new Date(ageDifMs); 
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
        if(age<30) {
          return 0.5;
        }
        if(age>=30 && age<45) {
          return 0.25;
        }
        if(age>45) {
          return 0.1;
        }
      }

    getRiskFactor =()=> {
        console.log(this.state.userInfo);
      return this.state.userInfo.riskArray.reduce((total, currentValue) => total + currentValue) / this.state.userInfo.riskArray.length + this.getAgeRisk();
    }
    
    handleIncomeChange= (event) => {
        let income = event.target.value;
        this.setState({income});
    }

    handleExpensesChange= (event) => {
        let expenses = event.target.value;
        this.setState({expenses});
    }

    render() {
        const { user } = this.props;

        return(
            this.state.userInfo.riskArray ? (
            <div className="profile">
                <div className="personal-info">
                    <img src={`https://robohash.org/${this.props.user.displayName}?200x200`} alt="robots" width="200"/>
                    <div>
                        <h1>{user.displayName}</h1>
                        <p> <b>Data nasterii:  </b>{this.state.userInfo.birthday}</p>
                        <p> <b>Venituri:  </b>{this.state.userInfo.income}</p>
                        <p> <b>Cheltuieli:  </b>{this.state.userInfo.expenses}</p>

                    </div>
                </div>
                <h4>Pentru mine mine sunt importante urmatoarele categorii: </h4>
                {Object.keys(this.state.userInfo.goalsNeeds).map( (goal) => <p>{goal}</p>)}
                <h4>Ma expun la un risc: </h4>
                {this.getRiskFactor() < 2.5 
                    ? "Mic"
                    : this.getRiskFactor() >= 2.5 && this.getRiskFactor() < 3.5 
                        ? "Mediu"
                        : "Mare"}

                

            </div>
            ) : <h2>loading</h2>
            // : "Loading..."
        );
    }
}