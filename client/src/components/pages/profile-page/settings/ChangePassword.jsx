import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { string, object } from 'yup';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  inputes: {
    fontSize: 10,
  },
}));

export const ChangePassword = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{ password: '', newPassword: '', repeatPassword: '' }}
      // validationSchema={accountSettingValidation}
      validate={({ password, newPassword, repeatPassword }) => {
        const errors = {};
        if (!password) {
          errors.password = 'Required';
        } else if (!newPassword) {
          errors.newPassword = 'Required';
        } else if (!repeatPassword) {
          errors.repeatPassword = 'Required';
        } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
          errors.password = 'Should contains only letters or digits';
        } else if (!/^[a-zA-Z0-9]+$/.test(newPassword)) {
          errors.newPassword = 'Should contains only letters or digits';
        } else if (!/^[a-zA-Z0-9]+$/.test(repeatPassword)) {
          errors.repeatPassword = 'Should contains only letters or digits';
        } 
        else if (password.length < 4) {
          errors.password = 'Password is too short';
        } else if (newPassword.length < 4) {
          errors.newPassword = 'Password is too short';
        } else if (repeatPassword.length < 4) {
          errors.repeatPassword = 'Password is too short';
        } else if (password.length > 18) {
          errors.password = 'Password is too long';
        } else if (newPassword.length > 18) {
          errors.newPassword = 'Password is too long';
        } else if (repeatPassword.length > 18) {
          errors.repeatPassword = 'Password is too long';
        } else if (newPassword !== repeatPassword) {
          errors.repeatPassword = 'Passwords should be equal';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Field component={TextField} type="password" name="password" placeholder="Enter your password" className={classes.inputes} />
          <ErrorMessage name="password" component="div" />
          <Field component={TextField} type="password" name="newPassword" placeholder="Enter new password" className={classes.inputes} />
          <ErrorMessage name="newPassword" component="div" />
          <Field component={TextField}
            type="password"
            name="repeatPassword"
            placeholder="Repeat new password"
            className={classes.inputes}
          />
          <ErrorMessage name="repeatPassword" component="div" />
          <Button type="submit" variant="outlined" color="primary" className={classes.button} disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
