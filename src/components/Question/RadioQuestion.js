import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function RadioQuestion(props) {
  const {question, questionNo, optionsArray, handleChange} = props;

  return (
    <div>
      <p>{`${questionNo+1}. ${question}`}</p>
      <FormControl component="fieldset">
        <RadioGroup onChange={(event) => handleChange(event, questionNo)}>
          {
            optionsArray.map(
              (option, index) => <FormControlLabel key={index} value={`${index}`} control={<Radio/>} label={option} />)
          }
        </RadioGroup>
      </FormControl>
    </div>
  );
}