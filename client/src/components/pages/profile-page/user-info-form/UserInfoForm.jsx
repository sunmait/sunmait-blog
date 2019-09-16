import React from 'react';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.js';
import InputWithLabel from 'components/common/input/InputWithLabel.jsx';
import { getBEMClasses } from 'helpers//BEMHelper';

import { parse, differenceInYears } from 'date-fns';

const userProfile = 'user-profile-form';
const bemClasses = getBEMClasses([userProfile]);

const UserInfoForm = props => {
  const { invalid, pristine, handleSubmit, reset } = props;
  const isDisabled = pristine || invalid;

  return (
    <form className={bemClasses()} onSubmit={handleSubmit} data-cy={bemClasses()}>
      <InputWithLabel name="FirstName" placeholder="Name" />
      <InputWithLabel name="LastName" placeholder="Second name" />
      <InputWithLabel type="date" name="BornDate" placeholder="Born date" />
      <div className={bemClasses('buttons-wrapper')} disabled={isDisabled}>
        <Button as="button" buttonColor="primary" type="submit" disabled={isDisabled} data-cy={bemClasses('save-btn')}>
          Save
        </Button>
        <Button
          as="button"
          buttonColor="primary"
          type="button"
          onClick={reset}
          disabled={pristine}
          data-cy={bemClasses('reset-btn')}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};
  if (!values.FirstName) {
    errors.FirstName = 'Required';
  } else if (values.FirstName.length < 3) {
    errors.FirstName = 'Must be at least 3 characters';
  }
  if (!values.LastName) {
    errors.LastName = 'Required';
  } else if (values.LastName.length < 3) {
    errors.LastName = 'Must be at least 3 characters';
  }
  if (!values.Login) {
    errors.Login = 'Required';
  } else if (values.Login.length < 6) {
    errors.Login = 'Must be at least 6 characters';
  }
  if (!values.BornDate) {
    errors.BornDate = 'Required';
  } else {
    const today = new Date();
    const userDate = parse(values.BornDate, 'yyyy-MM-dd', new Date());
    if (differenceInYears(today, userDate) < 12) {
      errors.BornDate = 'You must be over 12';
    }
    if (differenceInYears(today, userDate) > 60) {
      errors.BornDate = 'Enter a real age';
    }
  }

  return errors;
};

export default reduxForm({ form: 'userProfile', validate })(UserInfoForm);
