import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../../src/components/common/button/Button';

storiesOf('Button', module)
  .add('with custom content', () => (
    <Button
      onClick={action('clicked')}
    >
      <span role="img" aria-label="so cool">😀 😎 👍 💯</span>
    </Button>
  ))
  .add('default button', () => (
    <Button
      onClick={action('clicked')}
      buttonColor="default"
    >
      Hello Text
    </Button>
  ))
  .add('primary button', () => (
    <Button
      onClick={action('clicked')}
      buttonColor="primary"
    >
      Hello Text
    </Button>
  ))
  .add('disabled', () => (
    <Button
      onClick={action('clicked')}
      disabled
    >
      Hello Text
    </Button>
  ))
  .add('as link', () => (
    <Button
      onClick={action('clicked')}
      as={props => <a href="#">link</a>}
    >
      Hello Text
    </Button>
  ));