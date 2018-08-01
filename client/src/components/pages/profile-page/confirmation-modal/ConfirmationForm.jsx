import React from 'react';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.js'
import InputWithLabel from 'components/common/input/InputWithLabel.jsx';

import { getBEMClasses } from 'helpers//BEMHelper';

const modalForm = 'modal-form';
const bemClasses = getBEMClasses([modalForm]);

const ConfirmationForm = props => {
  const { valid, handleSubmit } = props;

  return (
    <form className={bemClasses()} onSubmit={handleSubmit}>
      <InputWithLabel type="password" name="password" placeholder="Enter password" />
      <div className={bemClasses('action-button')}>
        <Button
          as="button"
          buttonColor="primary"
          type="submit"
          disabled={!valid}
        >
          Change
        </Button>
      </div>  
    </form>  
  );
};

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required'
  } 

  return errors;
};

export default reduxForm({ form: 'userPasswordConfirm', validate })(ConfirmationForm);
