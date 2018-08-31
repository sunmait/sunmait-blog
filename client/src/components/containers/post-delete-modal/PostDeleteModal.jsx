import React from 'react';
import PropTypes from 'prop-types';
import PostDeleteForm from './PostDeleteForm.jsx';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import { getBEMClasses } from 'helpers//BEMHelper';
import 'assets/styles/Modal.css';

const modal = 'modal';
const bemClasses = getBEMClasses([modal]);

class PostDeleteModal extends React.Component {
  handleSubmit = () => {
    this.props.deletePost(this.props.selectedPost.id);
    this.props.history.push('/home');
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
        <div data-cy="post-delete-modal">
          <DialogTitle id="form-dialog-title" className={bemClasses('title')}>
            You want to delete this post, are you sure?
          </DialogTitle>
          <DialogContent className={bemClasses('content')}>
            <PostDeleteForm onSubmit={this.handleSubmit} handleClose={handleClose} />
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

PostDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PostDeleteModal;
