import React from 'react';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.js';
import InputWithLabel from 'components/common/input/InputWithLabel.jsx';
import { getBEMClasses } from 'helpers//BEMHelper';

const userProfile = 'user-profile-form';
const bemClasses = getBEMClasses([userProfile]);

const UserInfoForm = props => {
  const { valid, handleSubmit } = props;

  return (
    <form className={bemClasses()} onSubmit={handleSubmit}>
      <InputWithLabel name="FirstName" placeholder="Name" />
      <InputWithLabel name="LastName" placeholder="Second name" />
      <InputWithLabel name="Login" placeholder="Login" />
      <div className={bemClasses('save-button')}>
        <Button as="button" buttonColor="primary" type="submit" disabled={!valid}>
          Save changes
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

  return errors;
};

export default reduxForm({ form: 'userProfile', validate })(UserInfoForm);
