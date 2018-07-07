import React from 'react';
import ConfirmationForm from './ConfirmationForm.jsx';
import Dialog, {
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog';
import 'assets/styles/Modal.css';

import { getBEMClasses } from 'components/helpers/BEMHelper';

const modal = 'modal';
const bemClasses = getBEMClasses([modal]);

const ConfirmationModal = props => {
  return (
    <Dialog
      open={props.openDialog}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={bemClasses()}
    >
      <DialogTitle id="form-dialog-title" className={bemClasses('title')}>
        Confirm changes
      </DialogTitle>
      <DialogContent className={bemClasses('content')}>
        <ConfirmationForm onSubmit={props.handleSubmit}/>
      </DialogContent>
    </Dialog>   
  )
};

export default ConfirmationModal;
