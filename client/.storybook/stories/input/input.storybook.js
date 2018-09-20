import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from '../../../src/components/common/input/Input';
import withReduxForm from 'redux-form-storybook';
import './Styles.css';

storiesOf('Input Fields/Input', module)
  .addDecorator(withReduxForm)
  .add('Default input', () => (
    <Input />
  ))
  .add('With placeholder', () => (
    <Input placeholder="Search query" onClick={action('clicked')}/>
  ))
  .add('With custom styles', () => (
    <Input customClass="input" onChange={action('changed')} />
  ))
