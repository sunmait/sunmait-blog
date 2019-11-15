import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { string, object, ref } from 'yup';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { changePassword } from 'redux/modules/auth/actions';


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

const validationSchema = object({
  password: string("")
  .matches(/^[A-Za-z0-9]+$/, "Password must contain only numbers or digits")
  .min(4, "Password must contain at least 4 characters")
  .max(16, "Password must contain max 16 characters")
  .required("Enter your password"),
  newPassword: string("")
  .matches(/^[A-Za-z0-9]+$/, "Password must contain only numbers or digits")
  .min(4, "Password must contain at least 4 characters")
  .max(16, "Password must contain less than 16 characters")
  .required("Enter your password"),
  repeatPassword: string("")
  .required("Repeat your password")
  .oneOf([ref("newPassword")], "Passwords does not match")
});

export const ChangePassword = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(changePassword({password: values.password, newPassword: values.newPassword}));
    setSubmitting(false);
}

  return (
    <Formik
      initialValues={{ password: '', newPassword: '', repeatPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={classes.form}>
          <Field component={TextField} type="password" name="password" placeholder="Enter your password" className={classes.inputes} />
          <Field component={TextField} type="password" name="newPassword" placeholder="Enter new password" className={classes.inputes} />
          <Field component={TextField}
            type="password"
            name="repeatPassword"
            placeholder="Repeat new password"
            className={classes.inputes}
          />
          <Button type="submit" variant="outlined" color="primary" className={classes.button} disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
