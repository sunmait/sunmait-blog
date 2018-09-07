import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../../src/components/common/button/Button';

storiesOf('Button', module)
  .add('With custom content', () => (
    <Button
      onClick={action('clicked')}
    >
      <span role="img" aria-label="so cool">😀 😎 👍 💯</span>
    </Button>
  ))
  .add('Default button', () => (
    <Button
      onClick={action('clicked')}
      buttonColor="default"
    >
      Hello Text
    </Button>
  ))
  .add('Primary button', () => (
    <Button
      onClick={action('clicked')}
      buttonColor="primary"
    >
      Hello Text
    </Button>
  ))
  .add('Disabled', () => (
    <Button
      onClick={action('clicked')}
      disabled
    >
      Hello Text
    </Button>
  ))
  .add('As link', () => (
    <Button
      onClick={action('clicked')}
      as={props => <a href="#">link</a>}
    >
      Hello Text
    </Button>
  ));