import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm.jsx';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Modal.css';

const modal = 'modal';
const bemClasses = getBEMClasses([modal]);

class LoginModal extends React.Component {
  handleSubmit = values => {
    const { login, password } = values;

    this.props.login({ Login: login, Password: password });
    this.props.handleClose();
  };

  render() {
    const { isOpen, handleClose } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={bemClasses()}
      >
        <div data-cy="login-modal">
          <DialogTitle id="form-dialog-title" className={bemClasses('title')}>
            Welcome back
          </DialogTitle>
          <DialogContent className={bemClasses('content')}>
            <LoginForm onSubmit={this.handleSubmit} />
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default LoginModal;
