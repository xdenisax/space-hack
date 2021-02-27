import React, { useEffect } from 'react';
import './ProfileForm.css';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import ErrorIcon from '@material-ui/icons/Error';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import RadioQuestion from '../Question/RadioQuestion';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg, #007bb2 0%, #651fff 50%, #4615b2 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
      'linear-gradient( 95deg, #007bb2 0%, #651fff 50%, #4615b2 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, #33bfff 0%,  #007bb2 50%, #2a3eb1 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
    'linear-gradient( 136deg, #33bfff 0%,  #007bb2 50%, #2a3eb1 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CalendarTodayIcon />,
    2: <AttachMoneyIcon />,
    3: <TrendingUpIcon />,
    4: <ErrorIcon />,
    5: <MoneyOffIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Data nasterii', 'Venituri', 'Obiective', 'Grad de risc', 'Cheltuieli'];
}

export default function ProfileForm(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [user, setUserInfo] = React.useState({
    birthday: "1998-12-14",
    income: 0,
    expenses: 0, 
    riskArray: [],
    goals: {
      travel: false,
      longTerm: false,
      credits: false,
      house: false, 
      car: false
    }
  });
  const [error, setError] = React.useState(true);
  const steps = getSteps();
  useEffect(()=> {
    switch(activeStep) {
      case 0:
        setError(!user.birthday ? true : false);
        break;
      case 1:
        setError(user.income ? false : true);
        break;
      case 2:
        setError(Object.keys(user.goals).filter((v) => user.goals[v]).length > 2);
        break;
      case 3:
        setError(false);
        break;
      case 4:
        setError(user.expenses ? false : true);
        break;
      default:
        setError(false);
    }
  }, [user, activeStep]);

  const handleNext = () => {
    console.log(user);
    setError(true);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleDateChange = (birthday) => {
    setUserInfo((prevUser) => ({...prevUser, birthday}));
  }

  const handleIncomeChange= (event) => {
    let income = event.target.value;
    setUserInfo(prevUser => {
      return {
        ...prevUser,
        income
      }
    });
  }

  const handleExpensesChange= (event) => {
    let expenses = event.target.value;
    setUserInfo(prevUser => {
      return {
        ...prevUser,
        expenses
      }
    });
  }

  const handleRiskChange = (event, questionNo) => {
    let riskArray = user.riskArray;
    riskArray[questionNo] = Math.abs(event.target.value - 4 );

    setUserInfo(prevUser => {
      return {
        ...prevUser,
        riskArray
      }
    });

    console.log(user.riskArray);
  }

  const hangleSingleGoalChange = (event) => {
    setUserInfo(prevUser => {
      return {
        ...prevUser,
        goals: {
          ...prevUser.goals,
          [event.target.name]: event.target.checked
        }
      }
    });
  }

  const birthDateCompoenent = 
  <div className="question">
    <TextField
      id="date"
      label="Data nasterii"
      type="date"
      defaultValue={user.birthday}
      className={classes.textField}
      onChange={handleDateChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  </div>

  const incomeComponent = 
  <div className="question">
    <TextField className="outlined-basic" defaultValue={user.income} label="Venituri lunare" type="number" variant="outlined" onChange={handleIncomeChange}/>
    <p className="description">Prin venituri lunare, intelegem: </p>
    <em> Salariu, prime, bonusuri, burse, dividende, chirii, dobanzi sau orice alta sursa de venit.</em>
  </div>

  const expensesComponent = 
  <div className="question">
    <TextField className="outlined-basic" defaultValue={user.expenses}  label="Cheltuieli lunare" type="number" variant="outlined" onChange={handleExpensesChange}/>
    <p className="description">Prin cheltuieli lunare <b>necesare</b>, intelegem cheltuieli cu: </p>
    <em> Locuinta, autoturismul, alimentatia, intretinerea personala si a familiei, imprumuturi, sanatate sau alte cheltuieli de necesitate absoluta.</em>
  </div>

  const goalsComponnet = 
  <div className="question">
      <FormControl required error={error} component="fieldset">
      <FormLabel component="legend">Pentru mine este important sa: </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultValue={user.goals.travel} onChange={hangleSingleGoalChange} name="travel" />}
          label="Merg in vacanta cel putin o data pe an."
        />
        <FormControlLabel
          control={<Checkbox defaultValue={user.goals.longTerm} onChange={hangleSingleGoalChange} name="longTerm" />}
          label="Sa am bani pusi de-o parte pentru educatia copiiilor/pensionare/evenimente indepartate."
        />
        <FormControlLabel
          control={<Checkbox  defaultValue={user.goals.credits}  onChange={hangleSingleGoalChange} name="credits" />}
          label="Sa rambursez creditul."
        />
        <FormControlLabel
          control={<Checkbox  defaultValue={user.goals.house}  onChange={hangleSingleGoalChange} name="house" />}
          label="Sa imi cumpar o casa."
        />
        <FormControlLabel
          control={<Checkbox  defaultValue={user.goals.car}  onChange={hangleSingleGoalChange} name="car" />}
          label="Sa imi cumpar o masina."
        />
      </FormGroup>
      <FormHelperText>Alegeti maxim doua aspecte care sunt importante pentru dumneavoastra</FormHelperText>
    </FormControl>
      <div>
        <TextField className="outlined-basic" defaultValue={user.income} label="Venituri lunare" type="number" variant="outlined" onChange={handleIncomeChange}/>
        <TextField className="outlined-basic" defaultValue={user.income} label="Venituri lunare" type="number" variant="outlined" onChange={handleIncomeChange}/>
      </div>
  </div>

  const riskComponent = 
  <div className="risk">
    <div>
      <RadioQuestion 
        question="In general, cum te-ar descrie prietenul tau cel mai bun?"
        questionNo={0} 
        optionsArray={["O persona ce pariaza mult", "Dispusa la risc doar daca faci research", "Precaut","Eviti cu totul riscul"]} 
        handleChange={handleRiskChange}/>
      <RadioQuestion 
        question="Daca ai fi la un show TV, ce ai alege?"
        questionNo={1} 
        optionsArray={["5% sanse sa castigi 100 000$", "25% sanse sa castigi 10 000", " 50% sanse sa castigi 5000$", "1000$" ]} 
        handleChange={handleRiskChange}/>
      <RadioQuestion 
        question="Cand auzi cuvantul risc la ce te gandesti?"
        questionNo={2} 
        optionsArray={["Entuziasm", "Oportunitate", "Incertitudine", "Pierdere "]} 
        handleChange={handleRiskChange}/>,
    </div> 
    <div> 
      <RadioQuestion 
        question="Vecinul tau, un geologist cu experienta, vrea sa exploreze o mina de aur. Expeditia poate sa aduca intre 50x si 100x investitia initiala. El estimeaza ca va avea o rata de succes de 20%. Cu ce suma de bani l-ai sustine pe vecinul tau?"
        questionNo={3} 
        optionsArray={["Salariul pe 6 luni.", "Salariul pe 3 luni.", "Salariul pe o luna.", "0 lei."]} 
        handleChange={handleRiskChange}/>
      <RadioQuestion 
        question="Avand situatia favorabila si situatia nefavorabila a patru tipuri de investitie, ce ai prefera?"
        questionNo={4} 
        optionsArray={[ "+4800$ in cel mai bun caz, -2400$ in cel mai rau", "+2600$ in cel mai bun caz, -800$ in cel mai rau","+800$ in cel mai bun caz, -200$ in cel mai rau", "+200$ in cel mai bun caz, 0 in cel mai rau"]} 
        handleChange={handleRiskChange}/>
    </div>
  </div>

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return birthDateCompoenent;
      case 1:
        return incomeComponent;
      case 2:
        return goalsComponnet ;
      case 3:
        return riskComponent ;
      case 4:
        return expensesComponent;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={`${classes.root} profile-questionnaire`}  >
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className="form">
            <div className={classes.instructions}>
              Felicitari! Tocmai ti-ai completat profilul de investitor! 
            </div>
            <Button onClick={handleReset} className={classes.button}>
              Planificare
            </Button>
          </div>
        ) : (
          <div className="form">
            <div className={classes.instructions}> {getStepContent(activeStep)}</div>
            <div className="action-buttons">
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
                disabled={error}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <span className="disclaimer">Datele personale oferite vor fi stocate doar in scopul realizarii analizei si nu vor fi furnizate catre niciun alt serviciu.</span>
    </div>
  );
}