import {  Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import{
ComposedChart,
Line,
Area,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer,
Cell,
Rectangle,
} from 'recharts';
import './Dashboard.css';
import AccordionInfo from '../Accordion/Accordion';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height:'500px'
    },
    fill :{
        width:'100%',
        height:'100%'
    }
  }));


export default function Dashboard(props){
    const classes = useStyles();
    

    const data = [
        {
          name: 'Obligatiuni',
          uv: 1,
        
        },
        {
          name: 'Dobanda bancara',
          uv: 2,
       
        },
          {
            name: 'ETF',
            uv: 4,
           
          },
          {
            name: 'Imobiliare',
            uv: 5,
           
          },
          {
            name: 'Actiuni individuale',
            uv: 7,
           
          },
          {
            name: 'Cryptomonede',
            uv: 9,
           
          },
      ];
    
      const info =
      [
          {
              title :'Obligatiuni',
              details:'Valori mobiliare care dau dreptul detinatorului lor la primirea unei dobanzi regulate (cupon) precum si la rambursarea principalului la scadenta.',
              risk:'2/10',
              return:'2.5%'
          },
          {
            title :'Dobanda bancara',
            details:'Reprezinta un procent din suma pe care o depui in banca. Banca promite returnarea unui procent din suma respectiva.',
            risk:'3/10',
            return:'10%'
        },{
            title :'ETF',
            details:'Este ca un cos de titluri – actiuni, obligatiuni, produse de baza sau o combinatie a acestora – pe care le poti cumpara si vinde prin intermediul unui broker.',
            risk:'4/10',
            return:'10%'
        },
        {
            title :'Imobiliare',
            details:'Poti obtine venituri pasive din inchirierea acestora + trebuie luata in considerarea si aprecierea acetora in timp',
            risk:'5/10',
            return:'10%'
        },{
            title :'Actiuni individuale',
            details:'O unitate de proprietate a unei companii. Companiile vand actiuni pentru a obtine capital. Ca urmare, actionarii pot castiga dividende, alocari de profit, pentru actiunile acestora si o rentabilitate a investitiei acestora dacă pretul actiunilor creste.',
            risk:'7/10',
            return:'10%'
        },{
            title :'Cryptomonede',
            details:'Un activ digital cu o volatilitate ridicata. Cel mai cunoscut dintre acestea este bitcoin cu o crestere de la 1$-2$ la approx. 50.000$',
            risk:'9/10',
            return:'10%'
        }
      ]
        return (
           <div className="dashboard_container">
                <h1>Hi {props.user.displayName}!</h1>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                             <div className={classes.fill} style={{"marginLeft" :"-30px"}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart

                                        width={600}
                                        height={500}
                                        data={data}
                                        margin={{
                                        top: 20,
                                        right: 20,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                    >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis dataKey="name" scale="band" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" dataKey="uv" barSize={60}>
                                    {
                                        data.map((entry, index) => (
                                            <Cell key={index} fill={entry.name === "ETF" ? '#290a0a' : '#005599' }/>
                                        ))
                                    }
                                        </Bar>    
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
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
                                    return(<AccordionInfo key = {i} details ={entry.details} title={entry.title} risk={entry.risk} return={entry.return}/>)
                                })
                            }
                            </div>
                        </Paper>
                    </Grid>
              </Grid>
        </div>
        )
    
}