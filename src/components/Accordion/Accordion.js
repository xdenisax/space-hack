import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      justifyContent:'space-between',
  }
}));

export default function AccordionInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div style={{"display":"flex", "flexDirection":"column" ,"width":"100%"}}>
          <p style={{"marginTop":"0px", "textAlign":"start" }} >
           {props.details}
           </p>

          
          <div className={classes.details} style={{"marginTop":"9px"}}>
              <span><strong>Risc de investitie:</strong> {props.risk}</span>
              <span><strong>Randament mediu anual:</strong> {props.return}</span>
          </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
