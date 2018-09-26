import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'components/common/button/Button.js';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Modal.css';

const modal = 'modal';
const bemClasses = getBEMClasses([modal]);

const ConfirmationModal = props => {
  const { isOpen, handleSubmit, handleClose, modalTitle } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={bemClasses()}
    >
      <DialogTitle id="form-dialog-title" className={bemClasses('title')}>
        {modalTitle}
      </DialogTitle>
      <DialogContent className={bemClasses('content')}>
        <div className={bemClasses('action-buttons')}>
          <Button as="button" buttonColor="primary" type="button" onClick={handleClose} data-cy="deny-btn">
            No
          </Button>
          <Button as="button" buttonColor="primary" type="button" onClick={handleSubmit} data-cy="confirm-btn">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
};

export default ConfirmationModal;
