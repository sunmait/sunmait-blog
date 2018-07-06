import React from 'react';
import LoginForm from './LoginForm.jsx';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import { getBEMClasses } from 'components/helpers/BEMHelper';
import 'assets/styles/Modal.css';
import store from '../../../redux/store';
const action = ({ type, payload }) => store.dispatch({type, payload});

const modal = 'modal';
const bemClasses = getBEMClasses([modal]);

class LoginModal extends React.Component {
  handleSubmit = (values) => {
    const {login, password} = values;
    
    action({type : 'LOGIN_SAGA', payload: {Login: login, Password: password}});
    this.props.handleClose();
  }

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
        <DialogTitle id="form-dialog-title" className={bemClasses('title')}>
          Welcome back
        </DialogTitle>
        <DialogContent className={bemClasses('content')}>
          <LoginForm onSubmit={this.handleSubmit}/>
        </DialogContent>
      </Dialog>   
    )
  }
}

export default LoginModal;
