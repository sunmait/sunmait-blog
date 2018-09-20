import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Textarea from '../../../src/components/common/input/Textarea';
import withReduxForm from 'redux-form-storybook';
import './Styles.css';

storiesOf('Input Fields/Textarea', module)
  .addDecorator(withReduxForm)
  .add('Default textarea', () => (
    <Textarea onChange={action('changed')} />
  ))
  .add('With placeholder', () => (
    <Textarea placeholder="Message text" onChange={action('changed')}/>
  ))
  .add('With custom styles', () => (
    <Textarea customClass="textarea" onChange={action('changed')} />
  ))
