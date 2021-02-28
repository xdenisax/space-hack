import React, { useState } from 'react';
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
  const [principal, setPrincipal] = useState();
  const [monthly, setMonthly] = useState();

  const [years, setYears] = useState();
  const [interest, setInterest] = useState();
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

    for(let i  = 1; i <= parseInt(years); i++ ){
            investments[i] = { contribution: 0, value: 0, name:`Year ${i}`}
            investments[i].contribution = investments[i-1].contribution + (12 * parseInt(monthly));
            investments[i].value = (parseInt(principal) * Math.pow(1 + division,12*i) + parseInt(monthly) *( (Math.pow(1+division, 12*i)-1) / division)).toFixed(2);
        }
    
    const result = parseInt(principal) * Math.pow(1 + division,months) + parseInt(monthly) *( (Math.pow(1+division, months)-1) / division);
    console.log(investments)
    setResult(result.toFixed(2));
    setChartData(investments);

  };

  return (
    <div className={classes.root}>
        <div className={classes.details}>
            <TextField label="Investitie initiala" type="number" variant="outlined"  onChange={(e) => setPrincipal(e.target.value)}></TextField>
            <TextField label="Contributie lunara" type="number"  variant="outlined"  onChange={(e) => setMonthly(e.target.value)}></TextField>
            <TextField label="Anii de investitie" type="number"  variant="outlined"  onChange={(e) => setYears(e.target.value)}></TextField>
            <TextField label="Randament anual" type="number"  variant="outlined"     onChange={(e) => setInterest(e.target.value)}></TextField>
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
                  <h3>In {years} ani vei avea {result} RON</h3>
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
