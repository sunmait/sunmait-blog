import React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from '../../src/components/common/loader/';

storiesOf('Loader', module)
  .add('Default loader', () => (
    <Loader />
  ))
