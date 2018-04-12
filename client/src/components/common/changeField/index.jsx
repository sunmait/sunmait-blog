import * as React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const ChangeField = (props) => {
  const {changeProp, changePropValue, changePropNewValue, changePropOnChange, changePropButtonOnClick, name} = props;
  const label = "New " + changeProp;
  return (
    <div>
      <h3 className="title-little">
        Your {changeProp}: {changePropValue}
      </h3>
      <div className="container">
        <TextField
          label={label}
          name={name}
          className="field"
          value={changePropNewValue}
          onChange={changePropOnChange}
          margin="normal"
        />
      </div>
    </div>
  );
};

export default ChangeField;