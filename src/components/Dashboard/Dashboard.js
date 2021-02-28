import {  Grid, makeStyles, Paper } from '@material-ui/core';
import { db } from '../../firebase/FirebaseConfig'
import React, { useEffect } from 'react';
import{
ComposedChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer,
Cell,
} from 'recharts';
import './Dashboard.css';
import CompoundCalculator from '../Compound Interest/CompundCalculator'

import AccordionInfo from '../Accordion/Accordion';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'600px'
    },
    topPaper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'120px',
      padding:'20px'
    },
    fill :{
        width:'100%',
        height:'100%'
    }
  }));

 const getUser = async(uid) => {
  let user;
  await db.collection('users').doc(uid).get().then((doc) => {
    if (doc.exists) {
      user = doc.data();
    }
  });
  return user;
}

export default function Dashboard(props){
  const classes = useStyles();
  const [userStats, setUser] = React.useState({});
  
  // gradul de risc
  // suma ramasa 
    
  const info =
  [
      {
          title :'Obligatiuni',
          details:'Valori mobiliare care dau dreptul detinatorului lor la primirea unei dobanzi regulate (cupon) precum si la rambursarea principalului la scadenta.',
          risk:'2/10',
          returned:'2.5%',
          gradRisc: 1,
      },
      {
        title :'Dobanda bancara',
        details:'Reprezinta un procent din suma pe care o depui in banca. Banca promite returnedarea unui procent din suma respectiva.',
        risk:'3/10',
        returned:'10%',
        gradRisc: 1.5,

    },{
        title :'ETF',
        details:'Este ca un cos de titluri – actiuni, obligatiuni, produse de baza sau o combinatie a acestora – pe care le poti cumpara si vinde prin intermediul unui broker.',
        risk:'4/10',
        returned:'10%',
        gradRisc: 2.5,

    },
    {
        title :'Imobiliare',
        details:'Poti obtine venituri pasive din inchirierea acestora + trebuie luata in considerarea si aprecierea acetora in timp',
        risk:'5/10',
        returned:'10%',
        gradRisc: 3.5,

    },{
        title :'Actiuni',
        details:'O unitate de proprietate a unei companii. Companiile vand actiuni pentru a obtine capital. Ca urmare, actionarii pot castiga dividende, alocari de profit, pentru actiunile acestora si o rentabilitate a investitiei acestora dacă pretul actiunilor creste.',
        risk:'7/10',
        returned:'10%',
        gradRisc: 4.5,

    },{
        title :'Crypto',
        details:'Un activ digital cu o volatilitate ridicata. Cel mai cunoscut dintre acestea este bitcoin cu o crestere de la 1$-2$ la approx. 50.000$',
        risk:'9/10',
        returned:'10%',
        gradRisc: 5,
    }
  ]

  const getAgeRisk = (user) => { 
    var ageDifMs = Date.now() - new Date(user.birthday).getTime();
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
  
  const getReturn = (gradRisc) =>{
   return (info.filter((inv)=>inv.gradRisc === gradRisc)[0].returned.replace("%",""));
  }

  const getName = (gradRisc) => {
   return (info.filter((inv)=>inv.gradRisc === gradRisc)[0].title);

  }

  const setStats = () => {
    getUser(props.user.uid).then((user) => {
      let availableBalance = (user.income - user.expenses)*12 ;
      for (const goal in  user.goalsNeeds) {
        availableBalance -= user.goalsNeeds[goal];
      }
      setUser(prevUser => ({...prevUser, availableBalance}));
      let riskFactor = user.riskArray.reduce((total, currentValue) => total + currentValue) /  user.riskArray.length + getAgeRisk(user);
      let expenses = user.expenses;
      setUser(prevUser => ({...prevUser, riskFactor, expenses}));
     
    });
  }  

  const findInvestment = (riskFactor) => {
    return [1, 1.5, 2.5, 3.5, 4.5, 5].sort((a, b) => {
      return Math.abs(a - riskFactor) - Math.abs(b - riskFactor);
    })[0];
  }
  
  useEffect(() => setStats(), []);

  const fillRectangles = (entry) => {
    const risk = findInvestment(userStats.riskFactor);
    if((entry.gradRisc - 1) === risk  ){
      return "#00b7cc";
    } else if (entry.gradRisc === risk) {
      return '#00e5ff';
    } else if ((entry.gradRisc + 1) === risk   ) {
      return '#00b7cc';
    }
     return "#005599";
  }

  const getRiskRange = () =>{
    const risk = findInvestment(userStats.riskFactor);
    if(risk < 2.5){
      return "Conservativa"
    } else if(risk <= 3.5 ) {
      return "Moderata"
    } else {
      return "Agresiva"
    }
  }

  const getDescription = () =>{
    const risk = findInvestment(userStats.riskFactor);
    const name = getName(risk);
    if(risk < 2.5){
      return `Conform analizei noastre esti potrivit pentru a iti incepe investitiile tale in ${name}. Acestea sunt instrumente financiare cu un risc scazut dar si venituri pasive reduse. Totodata poti urmari in tabelul de mai jos si alte metode de investitii si gradul lor de risc`;
    } else if(risk <= 3.5 ) {
      return `Conform analizei noastre esti potrivit pentru a iti incepe investitiile tale in ${name}. Acestea sunt instrumente financiare cu un risc moderat ce iti asigura un venit pasiv si o apreciere in timp moderate. Totodata poti urmari in tabelul de mai jos si alte metode de investitii si gradul lor de risc.`
    } else {
      return `Conform analizei noastre esti potrivit pentru a iti incepe investitiile tale in ${name}. Acestea sunt instrumente financiare cu un risc ridicat ce iti pot aduce o apreciere in timp ridicata si chiar si venituri pasive ridicate. Totodata, acestea au o volatilitate mult mai crescuta, astfel banii tai pot fi pierduti mai rapid. Totodata poti urmari in tabelul de mai jos si alte metode de investitii si gradul lor de risc.`
     
    }
  }

  return (
      <div className="dashboard_container">

          <h1>Hi {props.user.displayName}!</h1>
{userStats.riskFactor ? (<Grid container spacing={3}>
              <Grid xs={12}>
                <Paper className={classes.topPaper}
                >
                  <div>
                    <h4 style={{"textAlign" : "start"}}>
                      Toleranta la risc: <strong>{getRiskRange()}</strong>
                    </h4>
                    <p style={{"textAlign" : "start"}}>
                      {getDescription()}
                    </p>
                  </div>

                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                        <div className={classes.fill} style={{"marginLeft" :"-30px"}}>
                          <ResponsiveContainer width="100%" height="100%">
                              <ComposedChart

                                  width={600}
                                  height={500}
                                  data={info}
                                  margin={{
                                  top: 20,
                                  right: 20,
                                  bottom: 20,
                                  left: 20,
                              }}
                              >
                              <CartesianGrid stroke="#f5f5f5" />
                              <XAxis dataKey="title" scale="band" />
                              <YAxis label="Risc" orientation="left" padding={{ right: 20, bottom: 20 }} />
                              <Tooltip />
                           
                              <Bar dataKey="gradRisc" barSize={80}>
                              {
                                  info.map((entry, index) => (
                                      <Cell key={index} fill={fillRectangles(entry) }/>
                                  ))
                              }
                              </Bar>    
                              </ComposedChart>
                              </ResponsiveContainer>
                              </div>
                  </Paper>
                </Grid>
  
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper}>
                      <div className={classes.fill}>

                            <h3>Ce inseamna toate?</h3>
                            {
                                info.map((entry, i) =>{
                                    return(<AccordionInfo key = {i} details ={entry.details} title={entry.title} risk={entry.risk} return={entry.returned}/>)
                                })
                            }
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <CompoundCalculator returned={getReturn(findInvestment(userStats.riskFactor))} user = {userStats}/>
                      </Paper>
                    </Grid>
              </Grid>
                    ) : (<h1>Loading</h1>)}

          
  </div>
  )
    
}