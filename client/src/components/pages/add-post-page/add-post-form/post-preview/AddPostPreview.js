import 'assets/styles/Article.css';

import React from 'react';
import { getBEMClasses } from 'helpers//BEMHelper';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { PostPreview } from 'components/common/PostPreview';

const editPost = 'add-post-form';
const bemClasses = getBEMClasses([editPost]);

class AddPostPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <Dialog
        open={this.props.isOpen}
        onClose={this.props.close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div data-cy="login-modal">
          <DialogTitle id="form-dialog-title">
            <div className={bemClasses('title-prewiew_window')}>Preview Window</div>
          </DialogTitle>
          <DialogContent>
            <React.Fragment>
              <PostPreview postData={this.props.postData} />
            </React.Fragment>
          </DialogContent>
        </div>
      </Dialog>
    );
  }
}

export default AddPostPreview;
