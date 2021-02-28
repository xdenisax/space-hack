import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

  details:{
      marginTop: "5px",
      display:"flex",
      justifyContent:'space-around',
  }

}));

export default function CompoundCalculator(props) {
  const classes = useStyles();
  const [principal, setPrincipal] = useState("0");
  const [monthly, setMonthly] = useState(props.user.availableBalance/12);
  const [total, setTotal] = useState();
  const [yearsToRetire, setYearsToRetire] = useState();
  const [years, setYears] = useState("5");
  const [interest, setInterest] = useState(props.returned);
  const [result, setResult] = useState();
  const [chartData, setChartData] = useState([]);
  const investments = [
  ];
  const calculateResult = () => {
    // A=p(1+(r/n))^(nt)

    const division = (parseInt(interest)/100) / 12;
    const months = 12 * parseInt(years);
    investments[0] = {contribution: 0, value: 0, name:`Year 0`}
    investments[0].contribution = parseInt(principal);
    investments[0].value = parseInt(principal);
    let count =0;
    for(let i  = 1; i <= parseInt(years); i++ ){
            investments[i] = { contribution: 0, value: 0, name:`Year ${i}`}
            investments[i].contribution = investments[i-1].contribution + (12 * parseInt(monthly));
            investments[i].value = (parseInt(principal) * Math.pow(1 + division,12*i) + parseInt(monthly) *( (Math.pow(1+division, 12*i)-1) / division)).toFixed(2);
        }
    
    const result = parseInt(principal) * Math.pow(1 + division,months) + parseInt(monthly) *( (Math.pow(1+division, months)-1) / division);
  
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'RON',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    
    let total = 0;
    
    while ( total < props.user.expenses * 100 /60 * 12 * 100 / parseInt(interest)){
      total = (parseInt(principal) * Math.pow(1 + division,12*count) + parseInt(monthly) *( (Math.pow(1+division, 12*count)-1) / division))
      count ++;
    }
    //const sum = props.user.expenses * 100 /60 * 12 * 100 / parseInt(interest);
    console.log(total, count);
    setResult(formatter.format(result));
    setTotal(formatter.format(total));
    setYearsToRetire(count);
    setChartData(investments);

  };

  useEffect(()=> console.log(props), [])

  return (
    <div className={classes.root}>
        <div className={classes.details}>
            <TextField label="Investitie initiala" type="number" variant="outlined"  defaultValue="0" onChange={(e) => setPrincipal(e.target.value)}></TextField>
            <TextField label="Contributie lunara" type="number"  variant="outlined" defaultValue={props.user.availableBalance/12} onChange={(e) => setMonthly(e.target.value)}></TextField>
            <TextField label="Anii de investitie" type="number"  variant="outlined" defaultValue="5" onChange={(e) => setYears(e.target.value)}></TextField>
            <TextField label="Randament anual" type="number"  variant="outlined"    defaultValue={props.returned} onChange={(e) => setInterest(e.target.value)}></TextField>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    calculateResult();
                }}>
            Calculate
          </Button>
        </div>
        {chartData.length > 0 ? (
              <div style={{"width":"80%", "height":"400px", "marginTop":"30px"}}  className="chart">
                  <h3>In {years} ani vei avea {result}</h3>
                  <h3>Te pensionezi cu {total} in {yearsToRetire} ani.</h3>
                  <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                  width={500}
                  height={200}
                  data={chartData.map(d => ({...d , "value" : +d.value }))} 
                  margin={{
                      top: 0,
                      right: 15,
                      left: 20,
                      bottom: 5,
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8"/>
                  <Line type="monotone" dataKey="contribution" stroke="#82ca9d" />
                  </LineChart>
              </ResponsiveContainer>
              </div>
        ): (<h1> No data</h1>)}
      
    </div>
  );
}
