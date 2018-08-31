import React from 'react';
import { reduxForm } from 'redux-form';
import Button from 'components/common/button/Button.js';

import { getBEMClasses } from 'helpers//BEMHelper';

const modalForm = 'modal-form';
const bemClasses = getBEMClasses([modalForm]);

const PostDeleteForm = props => {
  const { handleSubmit } = props;

  return (
    <form className={bemClasses()} onSubmit={handleSubmit}>
      <div className={bemClasses('action-button')}>
        <Button as="button" buttonColor="primary" type="button" onClick={props.handleClose}>
          No
        </Button>
        <Button as="button" buttonColor="primary" type="submit">
          Yes
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({ form: 'post-delete' })(PostDeleteForm);
